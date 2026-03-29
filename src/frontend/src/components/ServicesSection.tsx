import {
  Briefcase,
  Camera,
  Sparkles,
  Star,
  TrendingUp,
  Tv,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { SectionSparkles } from "./3d/StarScene";

const services = [
  {
    icon: Tv,
    title: "TV Commercials",
    description:
      "We connect your child with top brands for television advertisements, ensuring a professional and memorable debut on screen.",
  },
  {
    icon: Camera,
    title: "Fashion Shoots",
    description:
      "From editorial spreads to catalogue shoots, we place young talent in high-profile fashion and lifestyle photography campaigns.",
  },
  {
    icon: Briefcase,
    title: "Brand Collaborations",
    description:
      "We facilitate partnerships between children and leading brands for endorsements, product launches, and ambassador roles.",
  },
  {
    icon: TrendingUp,
    title: "Influencer Campaigns",
    description:
      "Tap into the digital era with carefully curated influencer opportunities on Instagram, YouTube, and emerging platforms.",
  },
  {
    icon: Star,
    title: "Event Appearances",
    description:
      "Exclusive event engagements, award shows, and brand activations where your child shines in front of live audiences.",
  },
  {
    icon: Users,
    title: "Talent Management",
    description:
      "End-to-end career management — from portfolio building and audition prep to contract negotiation and shoot-day support.",
  },
];

const packageFeatures = [
  { label: "Professional Portfolio Shoots" },
  { label: "Brand Shoot Opportunities" },
  { label: "Complimentary Family Portfolio" },
  { label: "5–7 Star Celebrity Studio Experience" },
];

const SILVER = "rgba(160,190,230,";

export function ServicesSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden"
      style={{ background: "#0a0f1e" }}
      ref={ref}
    >
      <SectionSparkles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              color: "#b0c4de",
              border: `1px solid ${SILVER}0.3)`,
              background: `${SILVER}0.08)`,
            }}
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            Our <span className="gold-gradient">Services</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 group transition-all duration-300"
              style={{ border: `1px solid ${SILVER}0.12)` }}
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors"
                style={{
                  background: `${SILVER}0.1)`,
                  border: `1px solid ${SILVER}0.2)`,
                }}
              >
                <service.icon size={24} style={{ color: "#b0c4de" }} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p
                style={{ color: "rgba(200,210,230,0.55)" }}
                className="leading-relaxed"
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Packages Sub-Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
          data-ocid="packages.section"
        >
          {/* Silver separator */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to right, transparent, ${SILVER}0.35))`,
              }}
            />
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                border: `1px solid ${SILVER}0.3)`,
                background: `${SILVER}0.08)`,
              }}
            >
              <Sparkles size={14} style={{ color: "#b0c4de" }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#b0c4de" }}
              >
                Our Packages
              </span>
              <Sparkles size={14} style={{ color: "#b0c4de" }} />
            </div>
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to left, transparent, ${SILVER}0.35))`,
              }}
            />
          </div>

          <div
            className="rounded-2xl backdrop-blur-sm p-8 md:p-12 relative overflow-hidden"
            style={{
              border: `1px solid ${SILVER}0.15)`,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: `${SILVER}0.04)` }}
            />
            <div
              className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: `${SILVER}0.04)` }}
            />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Customized <span className="gold-gradient">Photoshoot</span>{" "}
                  &amp; Casting Packages
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  style={{ color: "rgba(200,210,230,0.6)" }}
                  className="text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  We offer customized photoshoot and casting packages designed
                  for every aspiring talent.
                </motion.p>
              </div>

              {/* Feature grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {packageFeatures.map((feature, i) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 group"
                    style={{
                      border: `1px solid ${SILVER}0.15)`,
                      background: `${SILVER}0.05)`,
                    }}
                    data-ocid={`packages.item.${i + 1}`}
                  >
                    <div
                      className="mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        background: `${SILVER}0.12)`,
                        border: `1px solid ${SILVER}0.2)`,
                      }}
                    >
                      <Sparkles size={13} style={{ color: "#b0c4de" }} />
                    </div>
                    <span
                      className="text-sm font-medium leading-snug"
                      style={{ color: "rgba(220,230,245,0.85)" }}
                    >
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Info note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl"
                style={{
                  border: `1px solid ${SILVER}0.2)`,
                  background: `${SILVER}0.06)`,
                }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl"
                  style={{
                    background: `${SILVER}0.12)`,
                    border: `1px solid ${SILVER}0.25)`,
                  }}
                >
                  <Briefcase size={22} style={{ color: "#b0c4de" }} />
                </div>
                <div className="text-center md:text-left flex-1">
                  <p
                    className="font-semibold text-lg mb-1"
                    style={{ color: "#b8cce4" }}
                  >
                    Flexible &amp; Transparent Packages
                  </p>
                  <p
                    style={{ color: "rgba(200,210,230,0.6)" }}
                    className="text-sm"
                  >
                    Packages are tailored based on requirements. Connect with us
                    to get detailed availability &amp; next steps.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                  style={{
                    background:
                      "linear-gradient(135deg, #7a9cc0 0%, #b8cce4 100%)",
                    color: "#060b18",
                    boxShadow: "0 0 20px rgba(120,160,210,0.2)",
                  }}
                  data-ocid="packages.primary_button"
                >
                  <Star size={16} />
                  Get Details
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
