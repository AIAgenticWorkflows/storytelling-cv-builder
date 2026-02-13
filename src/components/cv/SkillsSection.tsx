import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Brain, Layers, Users, Globe, Award, Sparkles } from "lucide-react";

const skillCategories = [
  {
    icon: Brain,
    label: "AI & Innovation",
    skills: ["AI Agents", "Generative AI", "Vibe Coding", "Agentic AI", "AI Strategy"],
  },
  {
    icon: Layers,
    label: "Product & Strategy",
    skills: ["Product Roadmap", "Platform Migration", "Online Marketplace", "Product Development", "Vision & Metrics"],
  },
  {
    icon: Users,
    label: "Leadership",
    skills: ["Cross-functional Teams", "CEO Partnership", "Sprint Planning", "Scrum", "Stakeholder Management"],
  },
  {
    icon: Globe,
    label: "Global Reach",
    skills: ["Multi-market Deployment", "5 African Countries", "Denmark", "Mauritius", "International Ecosystems"],
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
    <section className="py-24 px-6 bg-warm-glow" id="skills">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          label="Expertise"
          title="What I Bring"
          subtitle="A rare blend of deep technical roots, product leadership, and AI-forward thinking."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {cat.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-body px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
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
