import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jfif";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-warm-highlight/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 relative inline-block"
          >
            {/* Decorative banner behind photo */}
            <div className="absolute -inset-6 md:-inset-10">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/25 to-primary/10 rotate-3 scale-105" />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tl from-accent/20 via-primary/15 to-transparent -rotate-2 scale-110" />
              <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/10 blur-xl" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 md:w-20 md:h-20 rounded-full bg-accent/15 blur-lg" />
            </div>
            <motion.img
              src={profilePhoto}
              alt="Nisha Appanah"
              whileHover={{ scale: 1.05 }}
              className="relative w-24 h-24 md:w-40 md:h-40 rounded-full mx-auto object-cover border-[3px] border-background shadow-xl shadow-primary/15 ring-2 ring-primary/20"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground font-body text-base md:text-lg tracking-widest uppercase mb-3 md:mb-4"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-3xl sm:text-5xl md:text-8xl font-bold text-foreground mb-3 md:mb-6 leading-tight"
          >
            Nisha{" "}
            <span className="text-primary italic">Appanah</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-16 md:w-24 h-1 bg-primary mx-auto mb-6 md:mb-8 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-display text-base md:text-2xl text-muted-foreground mb-3 md:mb-6 italic px-2"
          >
            20-Year Tech Leader · Product, Software & AI Strategy
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-body text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-2"
          >
            I'm a technology leader who turns complex challenges into practical solutions. 
            With two decades of building products and leading teams, 
            I thrive where technology meets real human impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-muted-foreground"
          >
            <a
              href="https://www.linkedin.com/in/nishaappanah/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors duration-300 font-body"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </motion.div>

        </motion.div>

        {/* Scroll indicator - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
