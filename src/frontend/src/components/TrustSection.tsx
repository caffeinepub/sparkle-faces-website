import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const WA_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="WhatsApp"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CARDS = [
  {
    icon: "💳",
    title: "₹3,500 is 100% Refundable",
    body: "If your child isn’t selected, every rupee comes back. No questions asked. No paperwork. No delays.",
  },
  {
    icon: "🏆",
    title: "4+ Years in Business",
    body: "We’ve been operating since 2021. Real shoots, real families, real results — you can verify us anywhere online.",
  },
  {
    icon: "🤝",
    title: "75+ Brand Partners",
    body: "Our kids have worked with H&M, Zara, Manyavar, Hopscotch, and more. Every brand is verifiable.",
  },
  {
    icon: "🛡️",
    title: "Always Supervised Shoots",
    body: "A parent is always present during every shoot. Your child’s safety is our non-negotiable #1 priority.",
  },
];

export function TrustSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "#0E1015" }}
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
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            As a parent, it’s natural to be cautious. Here’s why thousands of
            families trust us:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-card rounded-2xl p-7"
              style={{ border: "1px solid rgba(200,162,90,0.2)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              data-ocid={`trust.card.${i + 1}`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
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
              background: "rgba(200,162,90,0.1)",
              border: "1px solid rgba(200,162,90,0.4)",
            }}
          >
            <span className="text-2xl">🔒</span>
            <span
              className="font-heading text-lg font-bold"
              style={{ color: "#E8C97A" }}
            >
              100% Risk-Free Guarantee
            </span>
          </div>
          <div>
            <a
              href="https://wa.me/919819209964?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Sparkle%20Faces."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
              style={{ background: "#25D366", color: "#fff" }}
              data-ocid="trust.primary_button"
            >
              {WA_ICON}
              Still have questions? Chat with us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
