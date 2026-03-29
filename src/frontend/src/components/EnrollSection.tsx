import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { HeroStarScene } from "./3d/StarScene";

const WA_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="WhatsApp"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function EnrollSection() {
  const { ref, inView } = useInView();
  const [slotsRemaining, setSlotsRemaining] = useState(2);
  const TOTAL = 20;

  useEffect(() => {
    const stored = localStorage.getItem("sparkle_slots_remaining");
    if (stored) setSlotsRemaining(Number(stored));
  }, []);

  const filled = TOTAL - slotsRemaining;
  const pct = (filled / TOTAL) * 100;

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
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-8">
            Join 1,500+ families who trust Sparkle Faces to guide their
            children’s journey in the spotlight.
          </p>

          {/* Slot Counter */}
          <div className="max-w-sm mx-auto mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-bold"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#f87171",
              }}
              data-ocid="enroll.slot_counter"
            >
              ⚡ Only {slotsRemaining} slot{slotsRemaining === 1 ? "" : "s"}{" "}
              remaining this month
            </div>
            <div
              className="w-full rounded-full overflow-hidden mb-2"
              style={{ background: "rgba(255,255,255,0.08)", height: "8px" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #C8A25A, #E8C97A)",
                }}
              />
            </div>
            <p className="text-white/40 text-xs">
              {filled} of {TOTAL} slots filled — act now before it’s too late!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cfpe.me/sparklefaces"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full text-lg font-bold text-dark bg-gold hover:bg-gold-light transition-all duration-300 shadow-gold-lg"
              data-ocid="enroll.primary_button"
            >
              Enroll Now
            </a>
            <a
              href="https://wa.me/919819209964?text=Hi%2C%20I%20want%20to%20register%20my%20child%20for%20Sparkle%20Faces."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:opacity-90"
              style={{ background: "#25D366", color: "#fff" }}
              data-ocid="enroll.secondary_button"
            >
              {WA_ICON}
              Register on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
