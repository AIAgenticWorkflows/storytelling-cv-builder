import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Layers, Users, Globe, Award, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Sparkles,
    label: "AI & Product",
    items: [
      "AI strategy",
      "Agent design",
      "LLM integration",
      "Product discovery",
    ],
  },
  {
    icon: Users,
    label: "Leadership",
    items: [
      "Cross-functional teams",
      "Executive comms",
      "Roadmap ownership",
    ],
  },
  {
    icon: Layers,
    label: "Engineering",
    items: [
      "Platform migrations",
      "System architecture",
      "Web platforms",
    ],
  },
  {
    icon: Globe,
    label: "Tools",
    items: [
      "React, TypeScript, Python, .NET",
      "SQL, Supabase, Gemini, GPT",
    ],
  },
];

const certifications = [
  "AI Agents Fundamentals",
  "Advanced Product Management: Vision, Strategy & Metrics",
  "Vibe Coding",
  "miniCON Agentic AI",
];

const SkillsSection = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6" id="skills">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          label="Strategic Capabilities"
          title="What I Bring to the Table"
          subtitle="Not just skills, the strategic capabilities that drive outcomes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-5 md:p-6 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cap.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {cap.label}
                </h3>
              </div>
              <ul className="space-y-2">
                {cap.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm font-body text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">Certifications</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="flex items-center gap-1.5 text-sm font-body px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-foreground"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                {cert}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="font-body text-muted-foreground">
            <span className="font-semibold text-foreground">Languages:</span>{" "}
            English · French · Mauritian Creole
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
