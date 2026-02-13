import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { GraduationCap } from "lucide-react";

const education = [
  {
    school: "Curtin University",
    degree: "Master's Degree — International Business",
    years: "2014 — 2016",
  },
  {
    school: "University of Technology, Mauritius",
    degree: "Master's Degree — Computational Science & Engineering",
    years: "2005 — 2007",
  },
  {
    school: "University of Canberra",
    degree: "Bachelor's Degree — Information Technology",
    years: "2002 — 2005",
  },
];

const EducationSection = () => {
  return (
    <section className="py-24 px-6 bg-warm-glow" id="education">
      <div className="container mx-auto max-w-3xl">
        <SectionHeader label="Foundation" title="Education" />

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 8, scale: 1.01 }}
              className="flex gap-4 items-start p-4 rounded-xl hover:bg-background/80 transition-colors duration-200 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1"
              >
                <GraduationCap className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {edu.school}
                </h3>
                <p className="font-body text-foreground/80">{edu.degree}</p>
                <p className="font-body text-sm text-muted-foreground">{edu.years}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
