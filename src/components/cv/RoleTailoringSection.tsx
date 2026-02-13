import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

const TAILOR_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tailor-role`;

const RoleTailoringSection = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || isLoading) return;

    setIsLoading(true);
    setResult("");
    setError("");

    try {
      const resp = await fetch(TAILOR_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ jobDescription: jobDescription.trim() }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Analysis failed. Please try again.");
      }

      if (!resp.body) throw new Error("No response stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let accumulated = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              accumulated += content;
              setResult(accumulated);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              accumulated += content;
              setResult(accumulated);
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6" id="tailoring">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          label="AI Role Fit"
          title="See How I Fit Your Role"
          subtitle="Paste a job description and let AI analyse how my experience matches what you're looking for."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl border border-border/50 p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div className="flex flex-col">
              <label
                htmlFor="job-description"
                className="font-body text-sm font-medium text-foreground mb-2"
              >
                Job Description
              </label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => {
                  if (e.target.value.length <= 10000) {
                    setJobDescription(e.target.value);
                  }
                }}
                maxLength={10000}
                placeholder="Paste the job description here..."
                className="flex-1 min-h-[200px] md:min-h-[280px] w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
              />
            </div>

            {/* Output */}
            <div className="flex flex-col">
              <p className="font-body text-sm font-medium text-foreground mb-2">
                Analysis
              </p>
              <div
                ref={resultRef}
                className="flex-1 min-h-[200px] md:min-h-[280px] w-full rounded-xl border border-border bg-muted/50 px-4 py-3 overflow-y-auto"
              >
                {error ? (
                  <p className="font-body text-sm text-destructive">{error}</p>
                ) : result ? (
                  <div className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                ) : (
                  <p className="font-body text-sm text-muted-foreground flex items-center justify-center h-full">
                    {isLoading ? "Analysing..." : "Results will appear here after analysis."}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 flex justify-center md:justify-start">
            <motion.button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isLoading ? "Analysing..." : "Tailor My Profile"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoleTailoringSection;
