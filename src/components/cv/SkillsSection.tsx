import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Layers, Users, Globe, Award, Sparkles, Cpu, Code2, Wrench, Kanban } from "lucide-react";

const capabilities = [
  {
    icon: Layers,
    label: "Product Leadership",
    items: [
      "Roadmap ownership from vision through execution",
      "Platform migrations without revenue disruption",
      "Marketplace growth across multiple markets",
    ],
  },
  {
    icon: Users,
    label: "Team & Stakeholder Leadership",
    items: [
      "Scaling cross-functional teams (7→17) through growth phases",
      "C-suite partnership on strategy & investment decisions",
      "Cross-market coordination across 5+ countries",
    ],
  },
  {
    icon: Globe,
    label: "Technical Foundations",
    items: [
      "Full-stack software development",
      "Multi-market deployment & internationalisation",
      "Data-driven decision making & experimentation",
    ],
  },
];

const technicalSkills = [
  {
    icon: Cpu,
    label: "AI & Automation",
    items:
      "OpenAI (ChatGPT, API), Claude, Gemini, Hugging Face, AI Studio, Lovable, Jules, Replit, n8n, Vercel, AI agents and prompt engineering",
  },
  {
    icon: Code2,
    label: "Programming & Frameworks",
    items:
      "C#, .NET Framework, ASP.NET, MVC, LINQ, WCF, XML, XSLT, HTML, CSS, VBA, Kendo UI, Telerik UI, Telerik Open Access",
  },
  {
    icon: Wrench,
    label: "Development Tools",
    items: "Visual Studio, Git, SVN, IIS, VMware, AWS, Jira, Trello, SQL Server, MySQL",
  },
  {
    icon: Kanban,
    label: "Methodologies & Practices",
    items:
      "Agile/Scrum, sprint planning, backlog management, daily stand-ups, retrospectives",
  },
];

const certifications = [
  { name: "Google AI Professional", meta: "Google · 2026" },
  { name: "AI Agents Fundamentals", meta: "Hugging Face · 2025" },
  { name: "Advanced Product Management: Vision, Strategy & Metrics", meta: "Udemy · 2023" },
  { name: "Vibe Coding", meta: "" },
  { name: "miniCON Agentic AI", meta: "" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
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

        {/* Technical skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-16"
        >
          <h3 className="font-display text-xl font-semibold text-foreground text-center mb-6">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {technicalSkills.map((group) => (
              <div
                key={group.label}
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <group.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    {group.label}
                  </h4>
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">{group.items}</p>
              </div>
            ))}
          </div>
        </motion.div>

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
                key={cert.name}
                className="flex items-center gap-1.5 text-sm font-body px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-foreground"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                {cert.name}
                {cert.meta && (
                  <span className="text-xs text-muted-foreground">({cert.meta})</span>
                )}
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
