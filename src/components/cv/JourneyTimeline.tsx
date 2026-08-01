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
  outcomes: string[];
  accent?: boolean;
  portfolio?: PortfolioLink[];
}

const timeline: TimelineEntry[] = [
  {
    company: "Aplica Ltd",
    role: "Founder",
    period: "Nov 2024 – Present",
    outcomes: [
      "Built an AI agent in n8n to automate responses to villa rental inquiries.",
      "Secured an AI consulting agreement with Cybernaptics Ltd.",
      "Speak at conferences on data privacy, AI agents and robotics.",
      "Led client discovery sessions to identify AI automation opportunities.",
      "Developed rapid AI prototypes using low-code development tools.",
    ],
    accent: true,
  },
  {
    company: "Ringier South Africa",
    role: "Product Manager, AI Team & Property Marketplace",
    period: "Jun 2019 – Oct 2024",
    outcomes: [
      "Drove the product roadmap for the largest property marketplace in 3 countries.",
      "Migrated platforms serving 1M+ unique users and 3M+ sessions per month.",
      "Led 2 major platform migrations in Kenya and Romania.",
      "Scaled the team from 7 to 17 while running backlog refinement, sprint planning, stand-ups and retrospectives.",
      "Pitched an AI Agent to the C-suite and secured approval to advance.",
      "Validated AI demand via interviews and early sign-ups across 3 markets.",
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
    outcomes: [
      "Architected the end-to-end property listing flow deployed across 5 countries.",
      "Developed a dynamic form builder powering landing pages.",
      "Migrated the legacy web solution to the latest .NET technology stack.",
    ],
    portfolio: [
      { label: "BuyRentKenya", url: "https://www.buyrentkenya.com/" },
      { label: "Mamaison Senegal", url: "https://www.mamaison.sn/" },
      { label: "Private Property Nigeria", url: "https://www.privateproperty.com.ng/" },
    ],
  },
  {
    company: "Aplica Ltd",
    role: "Managing Director",
    period: "Mar 2015 – Jan 2017",
    location: "Mauritius",
    outcomes: [
      "Built live housing systems for Copenhagen Business School and DTU.",
      "Optimized algorithms, memory and database usage to resolve load issues.",
      "Designed and developed new features based on customer requests.",
      "Delivered technical training sessions to Danish partners.",
    ],
  },
  {
    company: "Expand Technology",
    role: "Project Manager",
    period: "Feb 2013 – Feb 2015",
    location: "Mauritius",
    outcomes: [
      "Managed the product backlog, weekly sprint planning and daily Scrum for a team of 7.",
      "Coded the business logic of a smartcard payment web solution.",
    ],
  },
  {
    company: "KnowGo Ltd",
    role: "CEO",
    period: "Feb 2012 – Oct 2012",
    location: "Mauritius",
    outcomes: [
      "Co-managed the ERP system with the other director, overseeing PAYE and NPS compliance.",
      "Coordinated accountant, bank, lessor and employees on general company matters.",
      "Led the development team, assigning tasks and organizing Scrum meetings for a workflow product.",
      "Engaged existing and prospective clients in Denmark.",
    ],
  },
  {
    company: "KnowGo Ltd",
    role: "Project Manager",
    period: "Jun 2010 – Jan 2012",
    location: "Mauritius",
    outcomes: [
      "Developed software that generates web solutions from workflow rules.",
      "Built design, runtime and admin web services.",
      "Added custom user controls such as NemID for authentication.",
      "Maintained infrastructure and deployments.",
    ],
  },
  {
    company: "Swteams Ltd",
    role: "Software Developer",
    period: "Dec 2006 – Jul 2010",
    outcomes: [
      "Developed 2 university web solutions for summer courses and residences.",
      "Built WCF services for the PEPPOL project funded by the European Commission.",
      "Built an app commercialised on mailedi.dk to send business documents.",
      "Built rule engine modules for an internal search engine.",
    ],
    portfolio: [
      { label: "MailEDI", url: "https://www.mailedi.biz/" },
      { label: "PEPPOL", url: "https://peppol.org/" },
    ],
  },
  {
    company: "University of Mauritius",
    role: "Programmer & Part-Time Tutor",
    period: "Nov 2005 – Nov 2006",
    outcomes: [
      "Programmed the I-Learn platform for university students.",
      "Trained IC3 instructors reaching 400,000 Mauritians.",
      "Taught IT courses to undergraduate students.",
      "Lectured an IT proficiency course to university staff.",
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
                      {entry.outcomes.map((o, i) => (
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
