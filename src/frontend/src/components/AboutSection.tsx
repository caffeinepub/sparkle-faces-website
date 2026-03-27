import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const highlights = [
  "Children aged 1 month to 17 years represented",
  "Safe, transparent & professional process",
  "TV commercials, fashion shoots, brand campaigns",
  "Nationwide talent network across India",
];

export function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 bg-dark" ref={ref}>
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
              style={{ border: "2px solid rgba(200,162,90,0.25)" }}
            >
              <img
                src="https://indiasproductionhouse.odoo.com/web/image/479-fefe724d/sparkefaces.jpeg"
                alt="Sparkle Faces team"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl"
              style={{
                background: "rgba(200,162,90,0.08)",
                border: "1px solid rgba(200,162,90,0.2)",
              }}
            />
            <div
              className="absolute -top-4 -left-4 w-20 h-20 rounded-xl"
              style={{
                background: "rgba(200,162,90,0.06)",
                border: "1px solid rgba(200,162,90,0.15)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 bg-gold/10 mb-4">
              About Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              About <span className="gold-gradient">Sparkle Faces</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              Sparkle Faces is a trusted kids casting and talent management
              agency dedicated to discovering and nurturing young talent across
              India. We connect children with genuine opportunities in TV
              commercials, fashion shoots, brand collaborations, and influencer
              campaigns — while ensuring a safe, transparent, and professional
              experience for both kids and parents.
            </p>
            <p className="text-white/65 leading-relaxed mb-8">
              We represent children aged{" "}
              <strong className="text-gold">1 month to 17 years</strong>,
              helping families navigate the entertainment and brand industry
              with confidence and ease.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-white/75"
                >
                  <CheckCircle2 size={18} className="text-gold flex-shrink-0" />
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
