import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const highlights = [
  "Children aged 1 month to 18 years represented",
  "Safe, transparent & professional process",
  "TV commercials, fashion shoots, brand campaigns",
  "Nationwide talent network across India",
];

const SILVER = "rgba(160,190,230,";

export function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="py-24"
      style={{ backgroundColor: "#060b18" }}
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ border: `2px solid ${SILVER}0.2)` }}
            >
              <img
                src="https://indiasproductionhouse.odoo.com/web/image/479-fefe724d/sparkefaces.jpeg"
                alt="Sparkle Faces team"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b18]/80 via-transparent to-transparent" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl"
              style={{
                background: `${SILVER}0.06)`,
                border: `1px solid ${SILVER}0.15)`,
              }}
            />
            <div
              className="absolute -top-4 -left-4 w-20 h-20 rounded-xl"
              style={{
                background: `${SILVER}0.04)`,
                border: `1px solid ${SILVER}0.1)`,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                color: "#b0c4de",
                border: `1px solid ${SILVER}0.3)`,
                background: `${SILVER}0.08)`,
              }}
            >
              About Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              About <span className="gold-gradient">Sparkle Faces</span>
            </h2>
            <p
              style={{ color: "rgba(200,210,230,0.65)" }}
              className="text-lg leading-relaxed mb-8"
            >
              Sparkle Faces is a trusted kids casting and talent management
              agency dedicated to discovering and nurturing young talent across
              India. We connect children with genuine opportunities in TV
              commercials, fashion shoots, brand collaborations, and influencer
              campaigns — while ensuring a safe, transparent, and professional
              experience for both kids and parents.
            </p>
            <p
              style={{ color: "rgba(200,210,230,0.65)" }}
              className="leading-relaxed mb-8"
            >
              We represent children aged{" "}
              <strong style={{ color: "#b0c4de" }}>1 month to 18 years</strong>,
              helping families navigate the entertainment and brand industry
              with confidence and ease.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                  style={{ color: "rgba(220,228,245,0.75)" }}
                >
                  <CheckCircle2
                    size={18}
                    style={{ color: "#7ab0e0", flexShrink: 0 }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
