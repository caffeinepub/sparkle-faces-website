import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { SectionSparkles } from "./3d/StarScene";

const testimonials = [
  {
    id: "t1",
    quote:
      "The team at Sparkle Faces handled everything professionally. My daughter got her first commercial within a month!",
    name: "Priya M.",
    city: "Mumbai",
    initials: "PM",
  },
  {
    id: "t2",
    quote:
      "Safe, transparent, and genuinely caring. I trust Sparkle Faces completely with my son's career in the entertainment world.",
    name: "Rahul S.",
    city: "Delhi",
    initials: "RS",
  },
  {
    id: "t3",
    quote:
      "From audition to shoot day, they guided us every step of the way. Highly recommended for all parents!",
    name: "Anita K.",
    city: "Bangalore",
    initials: "AK",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView();

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#0E1015" }}
      ref={ref}
    >
      <SectionSparkles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 bg-gold/10 mb-4"
          >
            Parent Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            What <span className="gold-gradient">Parents Say</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-10 text-center relative"
              data-ocid="testimonials.card"
            >
              <Quote size={48} className="text-gold/20 mx-auto mb-6" />
              <p className="text-white/80 text-xl leading-relaxed font-heading italic mb-8">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">
                    {testimonials[current].initials}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">
                    {testimonials[current].name}
                  </p>
                  <p className="text-white/50 text-sm">
                    {testimonials[current].city}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full glass-card border border-gold/20 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold/50 transition-all"
              data-ocid="testimonials.pagination_prev"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-gold w-6" : "bg-gold/30"
                  }`}
                  data-ocid={`testimonials.item.${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full glass-card border border-gold/20 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold/50 transition-all"
              data-ocid="testimonials.pagination_next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
