import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ label, title, subtitle }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 md:mb-16"
    >
      <p className="text-primary font-body text-sm tracking-widest uppercase mb-3">
        {label}
      </p>
      <h2 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-0.5 bg-primary/40 mx-auto mt-6" />
    </motion.div>
  );
};

export default SectionHeader;
