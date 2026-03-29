import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const SILVER = "rgba(160,190,230,";

const CARDS = [
  {
    icon: "🏆",
    title: "4+ Years of Proven Excellence",
    body: "We've been operating since 2021. Real shoots, real families, real results — you can verify us anywhere online.",
  },
  {
    icon: "🤝",
    title: "75+ Premium Brand Partners",
    body: "Our kids have worked with H&M, Zara, Manyavar, Hopscotch, and more. Every brand is verifiable.",
  },
  {
    icon: "🛡️",
    title: "Always Supervised Shoots",
    body: "A parent is always present during every shoot. Your child's safety is our non-negotiable #1 priority.",
  },
  {
    icon: "⭐",
    title: "1,500+ Enrolled Kids",
    body: "Thousands of families have trusted Sparkle Faces. Read their real stories in our testimonials section.",
  },
];

export function TrustSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "#0a0f1e" }}
      id="trust"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            We Get It —{" "}
            <span className="gold-gradient">You Have Questions</span>
          </h2>
          <p
            style={{ color: "rgba(200,210,230,0.5)" }}
            className="text-lg max-w-2xl mx-auto"
          >
            As a parent, it&apos;s natural to be cautious. Here&apos;s why
            thousands of families trust us:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-card rounded-2xl p-7"
              style={{ border: `1px solid ${SILVER}0.18)` }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              data-ocid={`trust.card.${i + 1}`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {card.title}
              </h3>
              <p
                style={{ color: "rgba(200,210,230,0.55)" }}
                className="text-sm leading-relaxed"
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl mb-8"
            style={{
              background: `${SILVER}0.08)`,
              border: `1px solid ${SILVER}0.35)`,
            }}
          >
            <span className="text-2xl">🛡️</span>
            <span
              className="font-heading text-lg font-bold"
              style={{ color: "#b0c4de" }}
            >
              Zero Risk for Your Family
            </span>
          </div>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7a9cc0 0%, #b8cce4 100%)",
                color: "#060b18",
                boxShadow: "0 0 20px rgba(120,160,210,0.2)",
              }}
              data-ocid="trust.primary_button"
            >
              Ask Us Anything
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
