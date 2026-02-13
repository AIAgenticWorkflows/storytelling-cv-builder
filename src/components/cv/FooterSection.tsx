import { motion } from "framer-motion";
import { Mail, Linkedin, Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-20 px-6" id="contact">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Build Something{" "}
            <span className="text-primary italic">Remarkable</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
            I'm looking for my next chapter — leading product and AI innovation 
            at a company that believes technology should serve people, not the other way around.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:n.appanah@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <a
              href="https://www.linkedin.com/in/nishaappanah/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background text-foreground font-body font-semibold hover:border-primary/40 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          <p className="mt-16 text-sm text-muted-foreground font-body flex items-center justify-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-primary" /> by Nisha Appanah
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
