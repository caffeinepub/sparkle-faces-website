import { Suspense } from "react";
import { SectionSparkles } from "../components/3d/StarScene";

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
        }
      `}</style>

      <div
        className="min-h-screen relative flex flex-col items-center justify-start py-10 px-4"
        style={{ backgroundColor: "#060b18" }}
      >
        {/* 3D background sparkles */}
        <div className="fixed inset-0 no-print" style={{ zIndex: 0 }}>
          <Suspense fallback={null}>
            <SectionSparkles />
          </Suspense>
        </div>

        {/* Silver glow blob */}
        <div
          className="fixed no-print"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(100,140,200,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Nav row */}
        <div
          className="w-full max-w-2xl flex items-center justify-between mb-8 no-print relative"
          style={{ zIndex: 10 }}
        >
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#b0c4de" }}
            data-ocid="promo.link"
          >
            ← Back to Site
          </a>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7a9cc0, #b8cce4)",
              color: "#060b18",
              boxShadow: "0 4px 20px rgba(100,140,200,0.25)",
            }}
            data-ocid="promo.primary_button"
          >
            🖨️ Download as PDF
          </button>
        </div>

        {/* Letter card */}
        <div
          className="promo-letter relative w-full max-w-2xl rounded-2xl p-10 md:p-14"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(160,190,230,0.2)",
            boxShadow:
              "0 0 60px rgba(100,140,200,0.08), inset 0 0 40px rgba(100,140,200,0.02)",
            zIndex: 5,
          }}
        >
          <span
            className="absolute top-5 left-5 text-2xl no-print"
            style={{ color: "#b0c4de", opacity: 0.6 }}
          >
            ✦
          </span>
          <span
            className="absolute top-5 right-5 text-2xl no-print"
            style={{ color: "#b0c4de", opacity: 0.6 }}
          >
            ✦
          </span>
          <span
            className="absolute bottom-5 left-5 text-xl no-print"
            style={{ color: "#8090b0", opacity: 0.4 }}
          >
            ✦
          </span>
          <span
            className="absolute bottom-5 right-5 text-xl no-print"
            style={{ color: "#8090b0", opacity: 0.4 }}
          >
            ✦
          </span>

          <div className="text-center mb-8">
            <div
              className="text-2xl font-bold mb-1"
              style={{
                fontFamily: "Playfair Display, serif",
                background: "linear-gradient(135deg, #8ba8d0, #c8d8f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✨ Sparkle Faces
            </div>
            <div
              className="letter-divider"
              style={{
                height: "1px",
                background: "rgba(160,190,230,0.2)",
                margin: "16px 0",
              }}
            />
          </div>

          <p
            className="text-xl font-semibold mb-6"
            style={{ color: "#e8eaf0", fontFamily: "Playfair Display, serif" }}
          >
            Dear Parents, 👋
          </p>

          <div
            className="rounded-xl p-5 mb-8"
            style={{
              background: "rgba(100,140,200,0.07)",
              border: "1px solid rgba(160,190,230,0.2)",
            }}
          >
            <p className="text-lg font-bold mb-2" style={{ color: "#b0c4de" }}>
              🌟 Big Congratulations!
            </p>
            <p className="leading-relaxed" style={{ color: "#e8eaf0" }}>
              Your child has been{" "}
              <strong style={{ color: "#b0c4de" }}>
                exclusively shortlisted
              </strong>{" "}
              for a{" "}
              <strong style={{ color: "#b0c4de" }}>
                Premium Kids Brand Shoot
              </strong>{" "}
              by Sparkle Faces.
            </p>
            <p
              className="mt-3 leading-relaxed"
              style={{ color: "rgba(200,210,230,0.75)" }}
            >
              ✨ This is a golden opportunity to kickstart your child&apos;s
              journey into ads, brand shoots &amp; media exposure.
            </p>
          </div>

          <div className="mb-8">
            <p
              className="text-base font-bold mb-4"
              style={{ color: "#b0c4de" }}
            >
              What&apos;s Included:
            </p>
            <ul className="space-y-2">
              {[
                "📸 Professional Brand Photoshoot",
                "📺 Ad Shoot Opportunities",
                "✨ Grooming & Camera Confidence",
                "👗 Designer Outfits (2–3 Looks)",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "#e8eaf0" }}
                >
                  <span className="mt-0.5">{item.slice(0, 2)}</span>
                  <span>{item.slice(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Earnings / Payout highlight */}
          <div
            className="rounded-xl p-5 mb-8 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(100,140,200,0.12), rgba(140,170,220,0.06))",
              border: "1px solid rgba(160,190,230,0.3)",
            }}
          >
            <p
              className="text-base font-bold mb-1"
              style={{ color: "#b0c4de" }}
            >
              💰 Earning Potential
            </p>
            <p
              className="text-2xl font-bold"
              style={{
                color: "#e8eaf0",
                fontFamily: "Playfair Display, serif",
              }}
            >
              ₹15,000 – ₹20,000 per shoot
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(200,210,230,0.6)" }}
            >
              From 2nd shoot onwards
            </p>
          </div>

          <div className="mb-8">
            <p
              className="text-base font-bold mb-4"
              style={{ color: "#b0c4de" }}
            >
              🎁 Exclusive Complimentary Benefits:
            </p>
            <ul className="space-y-2">
              {[
                "Professional Kids Portfolio",
                "Complimentary Family Portfolio",
                "Shoot at 5–7 Star Celebrity Studio",
                "Top Photographers & Styling Team",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#e8eaf0" }}
                >
                  <span style={{ color: "#b0c4de" }}>✔️</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-4 mb-8 text-center"
            style={{
              background: "rgba(100,140,200,0.05)",
              border: "1px solid rgba(160,190,230,0.15)",
            }}
          >
            <p
              className="font-bold text-base mb-1"
              style={{ color: "#b0c4de" }}
            >
              🔁 Zero Risk for Your Family
            </p>
            <p className="text-sm" style={{ color: "rgba(200,210,230,0.65)" }}>
              Your child&apos;s journey is in safe, experienced hands. Every
              step is transparent and professionally managed.
            </p>
          </div>

          <div
            className="rounded-xl p-4 mb-8 text-center"
            style={{
              background: "rgba(255,100,50,0.05)",
              border: "1px solid rgba(255,100,50,0.2)",
            }}
          >
            <p className="font-semibold text-sm" style={{ color: "#FF9966" }}>
              ⚠️ Very Limited Slots – First Come, First Served
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(200,210,230,0.5)" }}
            >
              Parents are already confirming quickly… don&apos;t miss this
              chance!
            </p>
          </div>

          <div className="text-center mb-8">
            <p
              className="text-lg font-bold"
              style={{
                color: "#e8eaf0",
                fontFamily: "Playfair Display, serif",
              }}
            >
              👉 Reply <span style={{ color: "#b0c4de" }}>YES</span> now to lock
              your child&apos;s slot
            </p>
          </div>

          <div
            className="letter-divider"
            style={{
              height: "1px",
              background: "rgba(160,190,230,0.15)",
              margin: "24px 0",
            }}
          />

          <div>
            <p style={{ color: "rgba(200,210,230,0.7)", fontSize: "0.9rem" }}>
              Warm regards,
            </p>
            <p
              className="text-lg font-bold mt-1"
              style={{
                color: "#e8eaf0",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Kunal Chaudhary
            </p>
            <p style={{ color: "#b0c4de", fontSize: "0.9rem" }}>
              Sparkle Faces
            </p>
            <a
              href="https://sparklefaces.in"
              style={{ color: "rgba(160,190,230,0.6)", fontSize: "0.85rem" }}
              className="hover:opacity-80 transition-opacity"
            >
              🌐 sparklefaces.in
            </a>
          </div>
        </div>

        <div
          className="mt-8 text-center no-print"
          style={{ zIndex: 5, position: "relative" }}
        >
          <p style={{ color: "rgba(200,210,230,0.3)", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              style={{ color: "rgba(160,190,230,0.5)" }}
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
