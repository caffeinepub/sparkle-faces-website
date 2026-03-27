import { Briefcase, Camera, Star, TrendingUp, Tv, Users } from "lucide-react";
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

export function ServicesSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
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
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 bg-gold/10 mb-4"
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
              className="glass-card rounded-2xl p-8 group hover:border-gold/40 transition-all duration-300 hover:shadow-gold"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                <service.icon size={24} className="text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/55 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
