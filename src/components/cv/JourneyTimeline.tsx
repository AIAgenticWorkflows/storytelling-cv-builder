import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  narrative: string;
  highlights?: string[];
  accent?: boolean;
}

const timeline: TimelineEntry[] = [
  {
    company: "Aplica Ltd",
    role: "Founder",
    period: "Nov 2024 — Present",
    narrative:
      "Returning full circle. After two decades of building for others, I launched my own venture — helping businesses unlock growth through practical AI solutions. Every lesson, every migration, every late-night debug session led here.",
    accent: true,
  },
  {
    company: "Ringier South Africa",
    role: "Product Manager — AI Team",
    period: "Jun 2024 — Oct 2024",
    narrative:
      "Pitched Ally Agent, an AI-powered solution matching property seekers to listings. Took it from concept to the next approval stage — blending product instinct with cutting-edge generative AI.",
    accent: true,
  },
  {
    company: "Ringier South Africa",
    role: "Product Manager — Property Marketplace",
    period: "Jul 2019 — Oct 2024",
    narrative:
      "Five years steering a 17-member cross-functional team through the most ambitious transformation the marketplace had seen. I partnered with CEOs, owned the roadmap, led two major platform migrations — all while keeping the lights on and revenue growing.",
    highlights: [
      "Led 2 major platform migrations with zero business disruption",
      "Collaborated across multiple international markets",
      "Partnered directly with CEOs on strategy & execution",
    ],
  },
  {
    company: "Ringier South Africa",
    role: "Senior Software Developer",
    period: "Feb 2017 — Jun 2019",
    narrative:
      "This is where my product instincts sharpened. I architected the end-to-end property listing flow, built features deployed across 5 African countries, and created a dynamic form builder that powered high-converting landing pages.",
    highlights: [
      "Scalable features deployed in 5 African countries",
      "Dynamic form builder powering high-converting pages",
    ],
  },
  {
    company: "Aplica Ltd",
    role: "Managing Director",
    period: "Mar 2015 — Jan 2017",
    location: "Mauritius",
    narrative:
      "Built and maintained live housing systems for the University of Copenhagen and the Technical University of Denmark. Optimized algorithms and databases, designed features from customer feedback, and delivered training to partners across borders.",
  },
  {
    company: "Expand Technology",
    role: "Project Manager",
    period: "Feb 2013 — Feb 2015",
    location: "Mauritius",
    narrative:
      "Managed sprints and a team of 7, driving development of a smartcard payment solution. Built the business logic layer that made the whole thing tick.",
  },
  {
    company: "KnowGo Ltd",
    role: "CEO & Project Manager",
    period: "Feb 2012 — Jan 2012",
    location: "Ebene, Mauritius",
    narrative:
      "Co-directed the company and led development of a unique workflow product. Built software that generates web solutions from workflow rules — and engaged with clients across Denmark.",
  },
  {
    company: "SWTEAMS Ltd",
    role: "Software Developer",
    period: "Dec 2006 — Jul 2010",
    location: "Quatre Bornes",
    narrative:
      "Where it all started in industry. Built university applications, electronic business document systems for the EU-funded PEPPOL project, and rule engine modules for internal search. The foundation years.",
  },
  {
    company: "University of Mauritius",
    role: "Programmer & Part-time Tutor",
    period: "Nov 2005 — Nov 2006",
    narrative:
      "My career's opening chapter. Programmed the I-Learn platform, taught IT to university students, supervised nationwide computer proficiency testing, and trained IC3 trainers for 400,000 Mauritians.",
  },
];

const JourneyTimeline = () => {
  return (
    <section className="py-24 px-6" id="journey">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          label="The Journey"
          title="20 Years of Building"
          subtitle="From coding in Mauritius to leading AI teams across continents — every chapter shaped who I am."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-timeline-line md:-translate-x-px" />

          {timeline.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex flex-col md:flex-row items-start mb-12"
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-[3px] border-timeline-dot z-10 top-2" />

                {/* Content — always left-aligned text for readability */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-12" : "md:pl-12 md:ml-auto"
                  }`}
                >
                  <div
                    className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                      entry.accent
                        ? "bg-primary/5 border border-primary/15"
                        : "bg-card border border-border/50"
                    }`}
                  >
                    <p className="text-primary font-body text-sm font-semibold uppercase tracking-wider mb-1">
                      {entry.company}
                    </p>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {entry.role}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm mb-3">
                      {entry.period}
                      {entry.location && ` · ${entry.location}`}
                    </p>
                    <p className="font-body text-foreground leading-relaxed text-[0.95rem]">
                      {entry.narrative}
                    </p>
                    {entry.highlights && (
                      <ul className="mt-3 space-y-1">
                        {entry.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground font-body flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
