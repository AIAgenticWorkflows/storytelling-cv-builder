import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface PortfolioLink {
  label: string;
  url: string;
}

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  impact: string;
  outcomes?: string[];
  accent?: boolean;
  portfolio?: PortfolioLink[];
}

const timeline: TimelineEntry[] = [
  {
    company: "Aplica Ltd",
    role: "Founder",
    period: "Nov 2024 – Present",
    impact: "Launched an AI consultancy to cut through hype and deliver real business results.",
    outcomes: [
      "Advise businesses on practical AI adoption and product strategy.",
      "Build AI-powered tools that solve live operational problems.",
    ],
    accent: true,
  },
  {
    company: "Ringier South Africa",
    role: "Product Manager, AI Team & Property Marketplace",
    period: "Jul 2019 – Oct 2024",
    impact: "Owned the product roadmap for the company's largest property marketplace and its first AI initiative.",
    outcomes: [
      "Led 2 platform migrations across 4 countries with zero business disruption.",
      "Grew the team from 7 to 17 while delivering an aggressive roadmap.",
      "Pitched Ally Agent to the C-suite and secured approval to advance.",
      "Validated AI demand through user interviews and early sign-ups across Romania, Kenya, and Slovakia.",
    ],
    portfolio: [
      { label: "BuyRentKenya", url: "https://www.buyrentkenya.com/" },
      { label: "Imobiliare Romania", url: "https://www.imobiliare.ro/" },
      { label: "Mamaison Senegal", url: "https://www.mamaison.sn/" },
    ],
  },
  {
    company: "Ringier South Africa",
    role: "Senior Software Developer",
    period: "Feb 2017 – Jun 2019",
    impact: "Architected the end-to-end property listing flow deployed across 5 African countries.",
    outcomes: [
      "Built a scalable listing architecture deployed in 5 countries simultaneously.",
      "Created a dynamic form builder that lifted landing-page conversion rates.",
    ],
    portfolio: [
      { label: "PropertyCloud Mauritius", url: "https://www.propertycloud.mu/" },
      { label: "BuyRentKenya", url: "https://www.buyrentkenya.com/" },
      { label: "Property Zimbabwe", url: "https://www.property.co.zw/" },
      { label: "Mamaison Senegal", url: "https://www.mamaison.sn/" },
      { label: "Private Property Nigeria", url: "https://www.privateproperty.com.ng/" },
    ],
  },

  {
    company: "Aplica Ltd",
    role: "Managing Director",
    period: "Mar 2015 – Jan 2017",
    location: "Mauritius",
    impact: "Built and ran live housing allocation systems for the University of Copenhagen and DTU.",
    outcomes: [
      "Served thousands of students across Denmark.",
      "Optimized algorithms and databases directly from customer feedback.",
    ],
  },
  {
    company: "Expand Technology",
    role: "Project Manager",
    period: "Feb 2013 – Feb 2015",
    location: "Mauritius",
    impact: "Led a team of 7 to deliver a smartcard payment solution.",
    outcomes: [
      "Built the core business logic layer for the payment system.",
      "Owned the full sprint cycle from planning to release demos.",
    ],
  },
  {
    company: "KnowGo Ltd",
    role: "CEO & Project Manager",
    period: "Feb 2012 – Jan 2013",
    location: "Ebene, Mauritius",
    impact: "Co-directed the company and shipped a workflow product that generated web solutions from business rules.",
    outcomes: [
      "Turned business rules into live web solutions for enterprise clients.",
      "Closed and delivered directly with Danish enterprise customers.",
    ],
  },
  {
    company: "SWTEAMS Ltd",
    role: "Software Developer",
    period: "Dec 2006 – Jul 2010",
    location: "Quatre Bornes",
    impact: "Built university applications and electronic business-document systems for the EU-funded PEPPOL project.",
    outcomes: [
      "Developed university applications and rule-engine modules.",
      "Built e-document systems for the EU-funded PEPPOL network.",
    ],
    portfolio: [
      { label: "MailEDI", url: "https://www.mailedi.biz/" },
      { label: "PEPPOL", url: "https://peppol.org/" },
    ],
  },
  {
    company: "University of Mauritius",
    role: "Programmer & Part-time Tutor",
    period: "Nov 2005 – Nov 2006",
    impact: "Programmed the I-Learn platform and trained IC3 instructors at national scale.",
    outcomes: [
      "Built the I-Learn platform for university students.",
      "Taught IT courses to undergraduate students.",
      "Trained IC3 instructors reaching 400,000 Mauritians.",
    ],
  },
];

const JourneyTimeline = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-warm-glow" id="journey">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          label="The Journey"
          title="20 Years of Building"
          subtitle="Every role answered one question: what changed because I was there?"
        />

        <div className="relative">
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
                className="relative flex flex-col md:flex-row items-start mb-8 md:mb-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 300 }}
                  className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-[3px] border-timeline-dot z-10 top-2"
                />

                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-12" : "md:pl-12 md:ml-auto"
                  }`}
                >
                  <div
                    className={`p-4 md:p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 cursor-default ${
                      entry.accent
                        ? "bg-primary/5 border border-primary/15 border-l-4 border-l-primary/40"
                        : "bg-card border border-border/50"
                    }`}
                  >
                    <p className="text-primary font-body text-xs font-semibold uppercase tracking-wider mb-1">
                      {entry.company}
                    </p>
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-0.5">
                      {entry.role}
                    </h3>
                    <p className="text-muted-foreground font-body text-xs mb-3">
                      {entry.period}
                      {entry.location && ` · ${entry.location}`}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      <li className="text-sm text-foreground font-body flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        {entry.impact}
                      </li>
                      {entry.outcomes?.map((o, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground font-body flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                          {o}
                        </li>
                      ))}
                    </ul>
                    {entry.portfolio && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.portfolio.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-body text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/15 px-2.5 py-1 rounded-full transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.label}
                          </a>
                        ))}
                      </div>
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
