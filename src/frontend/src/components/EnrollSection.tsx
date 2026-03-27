import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { HeroStarScene } from "./3d/StarScene";

export function EnrollSection() {
  const { ref, inView } = useInView();

  return (
    <section id="enroll" className="relative py-32 overflow-hidden" ref={ref}>
      <div
        style={{
          background:
            "linear-gradient(135deg, #0B0D10 0%, #1A1208 50%, #0B0D10 100%)",
        }}
        className="absolute inset-0"
      />
      <HeroStarScene />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,162,90,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Sparkles size={48} className="text-gold mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Let Your Child
            <br />
            <span className="gold-gradient">Shine?</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Join 1,000+ families who trust Sparkle Faces to guide their
            children's journey in the spotlight.
          </p>
          <a
            href="https://cfpe.me/sparklefaces"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 rounded-full text-lg font-bold text-dark bg-gold hover:bg-gold-light transition-all duration-300 shadow-gold-lg"
            data-ocid="enroll.primary_button"
          >
            Enroll Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
