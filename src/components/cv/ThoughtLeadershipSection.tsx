import { motion } from "framer-motion";
import { ExternalLink, Play, Mic } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Talk {
  title: string;
  event: string;
  year: string;
  url: string;
  videoEmbed?: string;
  description: string;
}

const talks: Talk[] = [
  {
    title: "Exploring AI Agents: From Fundamentals to Implementation",
    event: "MSCC Conference 2024",
    year: "2024",
    url: "https://conference.mscc.mu/agenda/875424",
    description:
      "Broke down the architecture behind autonomous AI agents, covering reasoning loops, tool use, and real-world implementation patterns for teams looking to move beyond chatbots.",
  },
  {
    title: "Navigating the AI Landscape",
    event: "MSCC Conference 2023",
    year: "2023",
    url: "https://2023.mscc.mu/agenda/455578",
    description:
      "A strategic overview for product leaders and developers on where AI creates real value versus hype. Frameworks for evaluating AI opportunities in existing products.",
  },
  {
    title: "Build and Program an Interactive Robot",
    event: "MSCC Conference",
    year: "2019",
    url: "https://www.youtube.com/watch?v=QHnxsfYhUtk",
    videoEmbed: "https://www.youtube.com/embed/QHnxsfYhUtk",
    description:
      "A hands-on live demo building and programming a robot from scratch, bridging hardware and software to inspire the next generation of technologists.",
  },
  {
    title: "How to Program a Robot Arm",
    event: "MSCC Conference 2019",
    year: "2019",
    url: "https://2019.mscc.mu/session/98226",
    description:
      "Deep dive into robotics programming: control systems, sensor integration, and the intersection of physical and digital engineering.",
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
              {talk.videoEmbed && (
                <div className="aspect-video w-full bg-foreground/5">
                  <iframe
                    src={talk.videoEmbed}
                    title={talk.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
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
                      <span className="text-xs font-body text-muted-foreground">{talk.event}</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThoughtLeadershipSection;
