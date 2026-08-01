import { motion } from "framer-motion";
import { ExternalLink, Play, Mic } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Talk {
  title: string;
  year: string;
  url: string;
  videoEmbed?: string;
  description: string;
}

const talks: Talk[] = [
  {
    title: "Exploring AI Agents: From Fundamentals to Implementation",
    year: "2025",
    url: "https://lnkd.in/p/d62f-XZk",
    description:
      "Introducing the fundamentals of AI agents using N8N, showing how they operate and demoing a production use case.",
  },
  {
    title: "Navigating the AI Landscape",
    year: "2023",
    url: "https://2023.mscc.mu/agenda/455578",
    description:
      "Shared practical experience with the OpenAI API and running large language models locally.",
  },
  {
    title: "Build and Program an Interactive Robot",
    year: "2021",
    url: "https://www.youtube.com/watch?v=QHnxsfYhUtk",
    videoEmbed: "https://www.youtube.com/embed/QHnxsfYhUtk",
    description:
      "Demonstrated building a robot from scratch with live programming.",
  },
  {
    title: "How to Program a Robot Arm",
    year: "2019",
    url: "https://2019.mscc.mu/session/98226",
    description:
      "Built and programmed a 3D-printed robotic arm with a screen interface, explaining servo control (swivel, lower, mid, upper, and gripper) for coordinated movement.",
  },

];

const ThoughtLeadershipSection = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-warm-glow" id="thought-leadership">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          label="AI & Thought Leadership"
          title="Sharing What I Know"
          subtitle="Conference speaker on AI agents, robotics, and practical technology strategy."
        />

        <div className="space-y-6">
          {talks.map((talk, i) => (
            <motion.div
              key={talk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-xl border border-border/50 overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    {talk.videoEmbed ? (
                      <Play className="w-4 h-4 text-primary" />
                    ) : (
                      <Mic className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-body font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {talk.year}
                      </span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                      {talk.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                      {talk.description}
                    </p>
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-body text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View session details
                    </a>
                  </div>
                </div>
              </div>
              {talk.videoEmbed && (
                <div className="aspect-video w-full md:max-w-lg mx-auto px-5 pb-5">
                  <iframe
                    src={talk.videoEmbed}
                    title={talk.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThoughtLeadershipSection;
