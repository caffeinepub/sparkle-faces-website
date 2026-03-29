import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const ROWS = [
  {
    feature: "Security Deposit",
    us: "100% Refundable",
    them: "Non-refundable",
  },
  {
    feature: "Payout per Shoot",
    us: "₹15,000–₹20,000 (2nd shoot+)",
    them: "None or minimal",
  },
  { feature: "Brand Network", us: "75+ Premium Brands", them: "Limited" },
  {
    feature: "Studio Quality",
    us: "5–7 Star Celebrity Studios",
    them: "Standard",
  },
  { feature: "Experience", us: "4+ Years", them: "Varies" },
  { feature: "Grooming Sessions", us: "Included", them: "Extra charge" },
  { feature: "Family Portfolio", us: "Complimentary", them: "Not offered" },
  { feature: "Child Safety", us: "Always supervised", them: "Not guaranteed" },
  { feature: "Transparency", us: "Full process clarity", them: "Hidden fees" },
];

export function ComparisonSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "#0B0D10" }}
      id="compare"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Why Choose <span className="gold-gradient">Sparkle Faces?</span>
          </h2>
          <p className="text-white/50 text-lg">See how we compare</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-card rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(200,162,90,0.2)" }}
          data-ocid="comparison.table"
        >
          <div
            className="grid grid-cols-3 text-center py-4 px-4"
            style={{
              background: "rgba(200,162,90,0.08)",
              borderBottom: "1px solid rgba(200,162,90,0.2)",
            }}
          >
            <div className="text-white/40 text-sm font-semibold uppercase tracking-widest text-left">
              Feature
            </div>
            <div
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "#E8C97A" }}
            >
              Sparkle Faces
            </div>
            <div className="text-white/40 text-sm font-semibold uppercase tracking-widest">
              Other Agencies
            </div>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 items-center py-4 px-4 gap-2"
              style={{
                borderBottom:
                  i < ROWS.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                background:
                  i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
              }}
              data-ocid={`comparison.row.${i + 1}`}
            >
              <div className="text-white/70 text-sm font-medium">
                {row.feature}
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle
                  size={15}
                  className="flex-shrink-0"
                  style={{ color: "#4ade80" }}
                />
                <span
                  className="text-xs font-semibold text-center"
                  style={{ color: "#E8C97A" }}
                >
                  {row.us}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <XCircle size={15} className="flex-shrink-0 text-red-400/60" />
                <span className="text-xs text-white/40 text-center">
                  {row.them}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
