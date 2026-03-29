import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const ROWS = [
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
  { feature: "Experience", us: "4+ Years in the Industry", them: "Varies" },
  { feature: "Grooming Sessions", us: "Included", them: "Extra charge" },
  { feature: "Family Portfolio", us: "Complimentary", them: "Not offered" },
  { feature: "Child Safety", us: "Always supervised", them: "Not guaranteed" },
  { feature: "Transparency", us: "Full process clarity", them: "Hidden fees" },
  { feature: "Support", us: "End-to-end guidance", them: "Minimal" },
];

const SILVER = "rgba(160,190,230,";

export function ComparisonSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "#060b18" }}
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
          <p style={{ color: "rgba(200,210,230,0.5)" }} className="text-lg">
            See how we compare
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-card rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${SILVER}0.18)` }}
          data-ocid="comparison.table"
        >
          <div
            className="grid grid-cols-3 text-center py-4 px-4"
            style={{
              background: `${SILVER}0.07)`,
              borderBottom: `1px solid ${SILVER}0.18)`,
            }}
          >
            <div
              style={{ color: "rgba(200,210,230,0.4)" }}
              className="text-sm font-semibold uppercase tracking-widest text-left"
            >
              Feature
            </div>
            <div
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "#b0c4de" }}
            >
              Sparkle Faces
            </div>
            <div
              style={{ color: "rgba(200,210,230,0.4)" }}
              className="text-sm font-semibold uppercase tracking-widest"
            >
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
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                background:
                  i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
              }}
              data-ocid={`comparison.row.${i + 1}`}
            >
              <div
                style={{ color: "rgba(220,228,245,0.75)" }}
                className="text-sm font-medium"
              >
                {row.feature}
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <CheckCircle
                  size={14}
                  style={{ color: "#7ab0e0", flexShrink: 0 }}
                />
                <span
                  style={{ color: "#b0c8e8" }}
                  className="text-sm font-medium text-center"
                >
                  {row.us}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 justify-center"
                style={{ color: "rgba(200,210,230,0.4)" }}
              >
                <XCircle size={14} className="flex-shrink-0" />
                <span className="text-sm text-center">{row.them}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
