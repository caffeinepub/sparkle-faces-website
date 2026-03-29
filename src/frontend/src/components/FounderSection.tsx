import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

export function FounderSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "#0E1015" }}
      id="founder"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Our <span className="gold-gradient">Founder's Vision</span>
          </h2>
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8"
          style={{ border: "1px solid rgba(200,162,90,0.2)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="flex-shrink-0">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                background: "rgba(200,162,90,0.12)",
                border: "2px solid rgba(200,162,90,0.5)",
                color: "#E8C97A",
                boxShadow: "0 0 40px rgba(200,162,90,0.2)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              KC
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-heading text-2xl font-bold text-white mb-1">
              Kunal Chaudhary
            </h3>
            <p className="text-white/40 text-sm mb-6">Founder, Sparkle Faces</p>
            <blockquote className="text-white/75 text-lg leading-relaxed mb-6">
              "I started Sparkle Faces because I believed every child deserves a
              platform where their natural talent can shine. Having seen how the
              industry worked, I wanted to create an agency built on trust,
              transparency, and genuine care for families. Today, over 1,500
              families trust us — and every one of their children's smiles makes
              it worth it."
            </blockquote>
            <p
              className="font-heading text-lg italic"
              style={{ color: "#E8C97A" }}
            >
              — Kunal Chaudhary
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
