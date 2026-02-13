import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Recommendation {
  name: string;
  title: string;
  relationship: string;
  text: string;
}

const recommendations: Recommendation[] = [
  {
    name: "Elias Mwangi",
    title: "Full Stack Web Developer | 10+ Years in Laravel, PHP, and Real Estate Solutions",
    relationship: "Nisha was senior to Elias at Ringier South Africa",
    text: "I had the privilege of working closely with Nisha during her time at Ringier South Africa, where she showcased exceptional talent and adaptability. Starting as a skilled software developer, she quickly grew into the role of Product Manager, demonstrating strong leadership, strategic thinking, and a deep understanding of user needs. Her ability to bridge the gap between technical and business perspectives was instrumental in driving several successful projects. Later, Nisha expanded her expertise into the field of AI, where she excelled at exploring cutting edge technologies and delivering innovative solutions. Her dedication to learning and growth is truly inspiring, and her contributions left a lasting positive impact on our team and the company.",
  },
  {
    name: "Delphine Racoupeau",
    title: "Head of Product · Solutions at Ringier South Africa",
    relationship: "Worked with Nisha for over 4 years at Ringier",
    text: "I've had the pleasure of working with Nisha for over 4 years at Ringier. She always prioritizes strong relationships with her colleagues, which I believe has been key to the success of the projects she led. I could always rely on her for brainstorming and honest opinions. I've seen her step out of her comfort zone and grow, and it's been truly inspiring to work alongside her.",
  },
  {
    name: "Thomas Omweri",
    title: "Tech Lead at Ringier South Africa",
    relationship: "Nisha was senior to Thomas",
    text: "I had the privilege of working with Nisha for several years while she served as our Product Manager in the online property marketplace. Nisha consistently demonstrated a remarkable level of resilience, innovation, and forward thinking that truly set her apart. Nisha led our product team through one of the largest and most complex system migrations we've ever undertaken. Her calm and methodical approach during this high-pressure project ensured a seamless transition. Beyond her exceptional project management skills, Nisha has been a true innovator, constantly seeking ways to leverage cutting edge technology. She was an early advocate for generative AI, recognizing its potential and successfully integrating AI driven solutions that enhanced user experience and streamlined operations.",
  },
  {
    name: "Sandeep Ramgolam",
    title: "Frontend / UX / Linux / Open Source / GDE",
    relationship: "Nisha was senior to Sandeep at Ringier",
    text: "I've been part of Nisha's team during my time at Ringier and we worked on a major project for the company. Nisha led a team of engineers and designers while managing requirements from users and clients. It has always been a pleasure to work alongside her and I would say her people skills are extremely valuable to have within a tech organization. We often meet in tech events as she's also active in the local communities.",
  },
  {
    name: "Christian Drejae",
    title: "CEO @ The EasyCopy Company | Software Sales",
    relationship: "Christian worked with Nisha at different companies",
    text: "I've known Nisha for more than 10 years as a dedicated and skillful provider of IT solutions. She has always been appreciated by our customers. She is easy to work with and not afraid to go the extra mile for a job well done.",
  },
  {
    name: "Lydie Lambert",
    title: "Strategic and inclusive project leader",
    relationship: "Lydie was Nisha's client",
    text: "Nisha is highly professional and capable. Her technical skills are excellent, but it's especially fortunate when one finds an IT partner that can also communicate with users on a user level. She's effective, dependable and pleasant to work with.",
  },
  {
    name: "Jahved Aktaar Cassim Saib",
    title: "QA",
    relationship: "Jahved worked with Nisha on the same team",
    text: "Nisha is a good project manager who's highly organised, knowledgeable, calm and efficient. She always took the time to discuss and explain any technical issues, which really helped gain trust and create a better product. This helped us deliver great site to a tight deadline. Thanks again and I look forward to working on future projects.",
  },
  {
    name: "Bent Mentzler",
    title: "IT Chef/consultant",
    relationship: "Bent worked with Nisha at different companies",
    text: "Nisha is a fast learner, very good to work with. Solid programmer, who I only can give my best recommendations. As a person, she has a good sense of humor and nice personality.",
  },
];

const RecommendationsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % recommendations.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + recommendations.length) % recommendations.length);

  const rec = recommendations[current];

  return (
    <section className="py-12 md:py-24 px-4 md:px-6" id="recommendations">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          label="What People Say"
          title="Voices of Trust"
          subtitle="Colleagues, clients, and leaders who've seen the work firsthand."
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              className="bg-quote-bg border border-border/50 rounded-2xl p-6 md:p-12 relative hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/15" />
              <div className="relative z-10">
                <p className="font-body text-foreground/85 text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic">
                  "{rec.text}"
                </p>
                <div className="border-t border-border/50 pt-6">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {rec.name}
                  </p>
                  <p className="font-body text-sm text-primary">{rec.title}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {rec.relationship}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="Previous recommendation"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </motion.button>

            <div className="flex gap-2">
              {recommendations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to recommendation ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="Next recommendation"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
