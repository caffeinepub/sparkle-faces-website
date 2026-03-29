import { motion } from "motion/react";
import { Suspense } from "react";
import { PromoSparkles } from "../components/3d/StarScene";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export function PromoPage() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .promo-letter {
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 40px !important;
          }
          .promo-letter * { color: black !important; }
          .promo-letter .letter-divider { border-color: #ccc !important; }
          .promo-earn-box { background: #f8f8f8 !important; border: 1px solid #ccc !important; }
          .promo-earn-amount { color: black !important; }
        }
      `}</style>

      <div
        className="min-h-screen relative flex flex-col items-center justify-start py-12 px-4"
        style={{
          backgroundColor: "#060b18",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {/* 3D background */}
        <div className="fixed inset-0 no-print" style={{ zIndex: 0 }}>
          <Suspense fallback={null}>
            <PromoSparkles />
          </Suspense>
        </div>

        {/* Ambient glow */}
        <div
          className="fixed pointer-events-none no-print"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(80,120,190,0.07) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Nav row */}
        <motion.div
          {...fadeUp(0)}
          className="w-full max-w-3xl flex items-center justify-between mb-10 no-print relative"
          style={{ zIndex: 10 }}
        >
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-all hover:opacity-70"
            style={{ color: "#b0c4de", letterSpacing: "0.02em" }}
            data-ocid="promo.link"
          >
            ← Back to Site
          </a>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #7a9cc0 0%, #c8d8f0 50%, #8aaad0 100%)",
              color: "#060b18",
              boxShadow:
                "0 4px 24px rgba(100,150,220,0.28), inset 0 1px 0 rgba(255,255,255,0.2)",
              letterSpacing: "0.03em",
            }}
            data-ocid="promo.primary_button"
          >
            ⬇ Download as PDF
          </button>
        </motion.div>

        {/* Brand header above card */}
        <motion.div
          {...fadeUp(0.1)}
          className="text-center mb-10 relative"
          style={{ zIndex: 10 }}
        >
          <div
            className="text-5xl md:text-6xl font-bold tracking-tight gold-gradient no-print"
            style={{ fontFamily: "Playfair Display, serif", lineHeight: 1.15 }}
          >
            ✦ SPARKLE FACES
          </div>
          <div
            className="text-xs font-bold tracking-[0.3em] uppercase mt-2 mb-5 no-print"
            style={{ color: "rgba(176,196,222,0.65)" }}
          >
            Where Young Stars Shine
          </div>
          {/* Decorative platinum line */}
          <div className="flex items-center justify-center gap-3 no-print">
            <div
              style={{
                height: "1px",
                width: "60px",
                background:
                  "linear-gradient(to right, transparent, rgba(180,200,230,0.5))",
              }}
            />
            <span
              style={{ color: "rgba(176,196,222,0.5)", fontSize: "0.6rem" }}
            >
              ✦
            </span>
            <div
              style={{
                height: "1px",
                width: "160px",
                background:
                  "linear-gradient(to right, rgba(180,200,230,0.5), rgba(200,220,250,0.3), rgba(180,200,230,0.5))",
              }}
            />
            <span
              style={{ color: "rgba(176,196,222,0.5)", fontSize: "0.6rem" }}
            >
              ✦
            </span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background:
                  "linear-gradient(to left, transparent, rgba(180,200,230,0.5))",
              }}
            />
          </div>
        </motion.div>

        {/* Letter card */}
        <motion.div
          {...fadeUp(0.2)}
          className="promo-letter glass-card gold-border relative w-full max-w-3xl rounded-3xl"
          style={{
            padding: "clamp(2rem, 5vw, 4rem)",
            boxShadow:
              "0 0 80px rgba(80,120,200,0.1), 0 40px 80px rgba(0,0,0,0.4), inset 0 0 60px rgba(100,140,200,0.02)",
            zIndex: 5,
          }}
        >
          {/* Corner ornaments */}
          {[
            "top-5 left-5",
            "top-5 right-5",
            "bottom-5 left-5",
            "bottom-5 right-5",
          ].map((pos, i) => (
            <span
              key={pos}
              className={`absolute ${pos} no-print`}
              style={{
                color: "#b0c4de",
                opacity: i < 2 ? 0.5 : 0.25,
                fontSize: i < 2 ? "1.4rem" : "1rem",
              }}
            >
              ✦
            </span>
          ))}

          {/* Brand inside card (for print) */}
          <div className="text-center mb-8" style={{ display: "none" }}>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#0a0a0a",
              }}
            >
              ✦ Sparkle Faces
            </div>
          </div>

          {/* Opening */}
          <motion.div {...fadeUp(0.3)}>
            <p
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#e8eaf0",
              }}
            >
              Dear Parents,
            </p>
            <p
              className="text-sm"
              style={{
                color: "rgba(200,210,230,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              A Personal Invitation from Sparkle Faces
            </p>
          </motion.div>

          <div
            className="letter-divider my-7"
            style={{ height: "1px", background: "rgba(160,190,230,0.12)" }}
          />

          {/* Congratulations callout */}
          <motion.div
            {...fadeUp(0.35)}
            className="rounded-2xl p-6 mb-8"
            style={{
              background: "rgba(80,120,200,0.07)",
              borderLeft: "3px solid rgba(160,190,230,0.5)",
              border: "1px solid rgba(160,190,230,0.15)",
              borderLeftWidth: "3px",
              borderLeftColor: "rgba(160,190,230,0.55)",
            }}
          >
            <p
              className="text-base font-bold mb-3"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#c8d8f0",
                letterSpacing: "0.02em",
              }}
            >
              🌟 Big Congratulations!
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#e8eaf0" }}
            >
              Your child has been{" "}
              <strong style={{ color: "#c8dcf8", fontWeight: 700 }}>
                exclusively shortlisted
              </strong>{" "}
              for a{" "}
              <strong style={{ color: "#c8dcf8", fontWeight: 700 }}>
                Premium Kids Brand Shoot
              </strong>{" "}
              by Sparkle Faces.
            </p>
            <p
              className="text-sm mt-3 leading-relaxed"
              style={{ color: "rgba(200,215,240,0.7)" }}
            >
              ✨ This is a golden opportunity to kickstart your child&apos;s
              journey into ads, brand shoots &amp; media exposure.
            </p>
          </motion.div>

          {/* What's Included */}
          <motion.div {...fadeUp(0.4)} className="mb-8">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#b0c4de" }}
            >
              What&apos;s Included
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["📸", "Professional Brand Photoshoot"],
                ["📺", "Ad Shoot Opportunities"],
                ["✨", "Grooming & Camera Confidence"],
                ["👗", "Designer Outfits (2–3 Looks)"],
              ].map(([icon, text]) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(100,140,200,0.05)",
                    border: "1px solid rgba(160,190,230,0.1)",
                  }}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm" style={{ color: "#e8eaf0" }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Earning Potential */}
          <motion.div
            {...fadeUp(0.45)}
            className="promo-earn-box rounded-2xl p-8 mb-8 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(70,110,190,0.15) 0%, rgba(100,150,220,0.08) 50%, rgba(60,100,180,0.12) 100%)",
              border: "1px solid rgba(160,190,230,0.3)",
            }}
          >
            {/* Subtle glow behind */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(100,150,220,0.08) 0%, transparent 70%)",
              }}
            />
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "rgba(176,196,222,0.65)" }}
            >
              💰 Earning Potential
            </p>
            <p
              className="promo-earn-amount text-4xl md:text-5xl font-bold gold-gradient"
              style={{ fontFamily: "Playfair Display, serif", lineHeight: 1.1 }}
            >
              ₹15,000 – ₹20,000
            </p>
            <p
              className="text-base mt-1 mb-1"
              style={{ color: "rgba(200,215,240,0.7)" }}
            >
              per shoot
            </p>
            <p
              className="text-xs mt-3 inline-block px-4 py-1.5 rounded-full"
              style={{
                color: "rgba(176,196,222,0.7)",
                background: "rgba(100,140,200,0.12)",
                border: "1px solid rgba(160,190,230,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              From 2nd shoot onwards
            </p>
          </motion.div>

          {/* Complimentary Benefits */}
          <motion.div {...fadeUp(0.5)} className="mb-8">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#b0c4de" }}
            >
              🎁 Exclusive Complimentary Benefits
            </p>
            <ul className="space-y-2.5">
              {[
                "Professional Kids Portfolio",
                "Complimentary Family Portfolio",
                "Shoot at 5–7 Star Celebrity Studio",
                "Top Photographers & Styling Team",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#e8eaf0" }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{
                      background: "rgba(100,150,220,0.2)",
                      color: "#b0c4de",
                      border: "1px solid rgba(160,190,230,0.25)",
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div
            className="letter-divider my-7"
            style={{ height: "1px", background: "rgba(160,190,230,0.12)" }}
          />

          {/* Zero Risk */}
          <motion.div
            {...fadeUp(0.55)}
            className="rounded-2xl p-5 mb-6 text-center"
            style={{
              background: "rgba(80,130,190,0.06)",
              border: "1px solid rgba(160,190,230,0.15)",
            }}
          >
            <p
              className="font-bold text-base mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#c8d8f0",
              }}
            >
              🔁 Zero Risk for Your Family
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(200,215,240,0.65)" }}
            >
              Your child&apos;s journey is in safe, experienced hands. Every
              step is transparent and professionally managed.
            </p>
          </motion.div>

          {/* Scarcity / Urgency */}
          <motion.div
            {...fadeUp(0.6)}
            className="rounded-2xl p-5 mb-8 text-center"
            style={{
              background: "rgba(255,90,40,0.05)",
              border: "1px solid rgba(255,120,60,0.22)",
            }}
          >
            <p className="font-semibold text-sm" style={{ color: "#FFAA77" }}>
              ⚠️ Very Limited Slots — First Come, First Served
            </p>
            <p
              className="text-xs mt-1.5"
              style={{ color: "rgba(200,210,230,0.5)" }}
            >
              Parents are already confirming quickly… don&apos;t miss this
              chance!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(0.65)} className="text-center py-2 mb-8">
            <p
              className="text-2xl md:text-3xl font-bold"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#e8eaf0",
                lineHeight: 1.3,
              }}
            >
              👉 Reply{" "}
              <span className="gold-gradient" style={{ fontStyle: "italic" }}>
                YES
              </span>{" "}
              to lock your child&apos;s slot
            </p>
          </motion.div>

          <div
            className="letter-divider my-7"
            style={{ height: "1px", background: "rgba(160,190,230,0.12)" }}
          />

          {/* Signature */}
          <motion.div {...fadeUp(0.7)}>
            <p
              className="text-sm mb-1"
              style={{
                color: "rgba(200,215,240,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              Warm regards,
            </p>
            <p
              className="text-xl font-bold mt-1"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#e8eaf0",
              }}
            >
              Kunal Chaudhary
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#b0c4de" }}>
              Sparkle Faces
            </p>
            <a
              href="https://sparklefaces.in"
              className="text-xs hover:opacity-80 transition-opacity mt-1 inline-block"
              style={{ color: "rgba(160,190,230,0.55)" }}
            >
              🌐 sparklefaces.in
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div
          className="mt-10 text-center no-print relative"
          style={{ zIndex: 5 }}
        >
          <p style={{ color: "rgba(200,210,230,0.25)", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              style={{ color: "rgba(160,190,230,0.45)" }}
              className="hover:opacity-80 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
