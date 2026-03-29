import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { HeroStarScene } from "./3d/StarScene";

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
            "linear-gradient(135deg, #060b18 0%, #0d1428 50%, #060b18 100%)",
        }}
        className="absolute inset-0"
      />
      <HeroStarScene />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(100,140,200,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Sparkles
            size={48}
            className="mx-auto mb-6"
            style={{ color: "#b0c4de" }}
          />
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Let Your Child
            <br />
            <span className="gold-gradient">Shine?</span>
          </h2>
          <p
            style={{ color: "rgba(200,210,230,0.6)" }}
            className="text-lg md:text-xl max-w-xl mx-auto mb-8"
          >
            Join 1,500+ families who trust Sparkle Faces to guide their
            children&apos;s journey in the spotlight.
          </p>

          {/* Slot Counter */}
          <div className="max-w-sm mx-auto mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-bold"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.35)",
                color: "#f87171",
              }}
              data-ocid="enroll.slot_counter"
            >
              ⚡ Only {slotsRemaining} slot{slotsRemaining === 1 ? "" : "s"}{" "}
              remaining this month
            </div>
            <div
              className="w-full rounded-full overflow-hidden mb-2"
              style={{ background: "rgba(255,255,255,0.07)", height: "8px" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #6080b0, #b0c4de)",
                }}
              />
            </div>
            <p style={{ color: "rgba(200,210,230,0.4)" }} className="text-xs">
              {filled} of {TOTAL} slots filled — act now before it&apos;s too
              late!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cfpe.me/sparklefaces"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full text-lg font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7a9cc0 0%, #b8cce4 100%)",
                color: "#060b18",
                boxShadow: "0 0 30px rgba(120,160,210,0.25)",
              }}
              data-ocid="enroll.primary_button"
            >
              Enroll Now
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold transition-all duration-300"
              style={{
                border: "1px solid rgba(160,190,230,0.35)",
                color: "#b0c4de",
              }}
              data-ocid="enroll.secondary_button"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
