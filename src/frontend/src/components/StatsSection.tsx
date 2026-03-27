import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { StatsOrbScene } from "./3d/StarScene";

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

const statsData = [
  { value: 1000, suffix: "+", label: "Happy Families" },
  { value: 500, suffix: "+", label: "Brand Collaborations" },
  { value: 95, suffix: "%", label: "Parent Satisfaction" },
  { value: 20, suffix: "+", label: "Cities Covered" },
];

function StatItem({
  value,
  suffix,
  label,
  active,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
}) {
  const count = useCountUp(value, 2000, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="text-center px-8 py-6"
      data-ocid={`stats.item.${index + 1}`}
    >
      <div className="font-heading text-5xl md:text-6xl font-bold text-gold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-white/60 text-sm tracking-wide uppercase font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <div
        style={{
          background: "linear-gradient(135deg, #0E1015 0%, #12100E 100%)",
        }}
        className="absolute inset-0"
      />
      <StatsOrbScene />

      {/* Gold line dividers */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,162,90,0.4), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,162,90,0.4), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            A Legacy of <span className="gold-gradient">Trust and Talent</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/15">
          {statsData.map((stat, i) => (
            <StatItem key={stat.label} {...stat} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
