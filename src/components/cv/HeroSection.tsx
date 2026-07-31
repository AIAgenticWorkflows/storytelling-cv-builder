import { motion } from "framer-motion";
import { Linkedin, ArrowDown, Zap, TrendingUp, Users, Mic, Rocket, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jfif";

const selectedImpact = [
  {
    icon: TrendingUp,
    text: "3 platform migrations across 4 markets.",
  },
  {
    icon: Rocket,
    text: "Ally Agent: pitched to C-suite, approved for next stage.",
  },
  {
    icon: Users,
    text: "Scaled team from 7 to 17 across continents.",
  },
  {
    icon: Zap,
    text: "Founded Aplica — practical AI for real businesses.",
  },
  {
    icon: Mic,
    text: "Speaker on AI agents, robotics & implementation.",
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-accent/30 blur-2xl" />
              <div className="absolute -inset-3 rounded-full bg-secondary/50 blur-lg" />
              <motion.img
                src={profilePhoto}
                alt="Nisha Appanah"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-card shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Right: Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-body text-xs md:text-sm text-primary uppercase tracking-wider mb-2 font-semibold"
            >
              Software Engineer &rarr; Product Leader &rarr; AI Founder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 leading-tight"
            >
              Nisha <span className="text-primary italic">Appanah</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display text-lg md:text-2xl text-primary mb-4 italic"
            >
              Turning complex tech into products people use.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="font-body text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed mb-6"
            >
              Tech leader and AI strategist with 20 years building, shipping and leading.
              I migrate platforms without breaking revenue, scale teams across continents, and
              help businesses turn AI from hype into outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4"
            >
              <a
                href="https://www.linkedin.com/in/nishaappanah/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground font-body text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <ArrowDown className="w-4 h-4" />
                See my journey
              </a>
              <a
                href="/Nisha_Appanah_CV.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-body text-sm font-medium hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV (PDF)
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Selected Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-12 md:mt-16"
        >
          <p className="text-primary font-body text-xs tracking-widest uppercase mb-4 text-center md:text-left font-semibold">
            Selected Impact
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedImpact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors"
              >
                <item.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="font-body text-sm text-foreground leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
