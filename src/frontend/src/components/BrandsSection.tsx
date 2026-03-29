import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const brands = [
  "Pantaloons",
  "Biba",
  "Hopscotch",
  "Manyavar",
  "H&M",
  "Zara",
  "Ajio",
  "Kidology",
  "CeraVe",
  "Mamaearth",
];

const stats = [
  { value: 1500, suffix: "+", label: "Kids Enrolled" },
  { value: 735, suffix: "+", label: "Brand Shoots" },
  { value: 4, suffix: " Years", label: "of Excellence" },
  { value: 75, suffix: "+", label: "Brand Partners" },
];

// Pre-build the doubled list with stable unique keys
const tickerItems = [
  ...brands.map((b) => ({ brand: b, key: `a-${b}` })),
  ...brands.map((b) => ({ brand: b, key: `b-${b}` })),
];

function CountUp({
  target,
  suffix,
  active,
}: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function BrandsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="brands"
      style={{ backgroundColor: "#0E1015" }}
      className="relative py-20 overflow-hidden"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(200,162,90,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-medium"
            style={{
              background: "rgba(200,162,90,0.12)",
              border: "1px solid rgba(200,162,90,0.35)",
              color: "#E8C97A",
            }}
          >
            ✨ Brand Partnerships
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <span className="gold-gradient">Trusted By</span>{" "}
            <span style={{ color: "#F0ECE3" }}>Leading Brands</span>
          </h2>
          <p
            style={{ color: "rgba(240,236,227,0.6)" }}
            className="text-base max-w-xl mx-auto"
          >
            Our kids have graced campaigns for India's most iconic and global
            fashion &amp; lifestyle brands.
          </p>
        </motion.div>

        {/* Scrolling ticker */}
        <div className="relative overflow-hidden mb-6">
          <div
            className="flex gap-4"
            style={{
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}
          >
            {tickerItems.map(({ brand, key }) => (
              <span
                key={key}
                className="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
                style={{
                  background: "rgba(200,162,90,0.08)",
                  border: "1px solid rgba(200,162,90,0.3)",
                  color: "#E8C97A",
                  letterSpacing: "0.04em",
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-base font-bold"
            style={{
              background:
                "linear-gradient(135deg, rgba(200,162,90,0.18), rgba(232,201,122,0.1))",
              border: "1px solid rgba(200,162,90,0.5)",
              color: "#E8C97A",
              boxShadow: "0 0 24px rgba(200,162,90,0.15)",
            }}
          >
            ⭐ 75+ Brand Partners &amp; Counting
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="text-center glass-card rounded-2xl py-8 px-4"
              style={{ border: "1px solid rgba(200,162,90,0.2)" }}
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-1 gold-gradient"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <div
                style={{ color: "rgba(240,236,227,0.6)" }}
                className="text-sm font-medium"
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
