import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { HeroStarScene } from "./3d/StarScene";

const heroPhotos = [
  "https://indiasproductionhouse.odoo.com/web/image/469-f6bd9b41/364713df-ba29-41b0-a092-2ae50098c90e_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/470-8544d58a/fd8f9c94-a8ce-4820-8970-4acc80d5ab22_full.jpg",
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060b18 0%, #0a1020 50%, #060b18 100%)",
      }}
    >
      <HeroStarScene />

      {/* Ambient silver radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(160,180,220,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left floating photo */}
        <motion.div
          className="hidden lg:block w-64 xl:w-72 flex-shrink-0"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              transform: "rotate(-3deg)",
              border: "2px solid rgba(180,200,230,0.25)",
              boxShadow: "0 0 40px rgba(140,170,220,0.15)",
            }}
          >
            <img
              src={heroPhotos[0]}
              alt="Sparkle Faces talent"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b18]/60 to-transparent" />
          </div>
        </motion.div>

        {/* Center content */}
        <div className="flex-1 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                color: "#b0c4de",
                border: "1px solid rgba(160,190,230,0.3)",
                background: "rgba(140,170,220,0.08)",
              }}
            >
              India&apos;s Trusted Kids Agency
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Where Young
            <br />
            <span className="gold-gradient">Stars Shine</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(200,210,230,0.65)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            India&apos;s Trusted Kids Casting &amp; Talent Management Agency —
            connecting children with genuine opportunities in TV, fashion &amp;
            brand campaigns.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <a
              href="https://cfpe.me/sparklefaces"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-center transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #8ba8d0 0%, #c8d8f0 50%, #8ba8d0 100%)",
                color: "#060b18",
                boxShadow: "0 0 30px rgba(140,175,220,0.3)",
              }}
              data-ocid="hero.primary_button"
            >
              Enroll Your Child
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-full font-semibold text-center transition-all duration-300"
              style={{
                color: "#b0c4de",
                border: "1px solid rgba(160,190,230,0.4)",
              }}
              data-ocid="hero.secondary_button"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right floating photo */}
        <motion.div
          className="hidden lg:block w-64 xl:w-72 flex-shrink-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              transform: "rotate(3deg)",
              border: "2px solid rgba(180,200,230,0.25)",
              boxShadow: "0 0 40px rgba(140,170,220,0.15)",
            }}
          >
            <img
              src={heroPhotos[1]}
              alt="Sparkle Faces talent"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b18]/60 to-transparent" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors animate-bounce"
        style={{ color: "rgba(160,190,230,0.6)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}
