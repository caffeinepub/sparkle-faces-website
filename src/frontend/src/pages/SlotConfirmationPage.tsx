import { motion } from "motion/react";
import { useState } from "react";
import { Suspense } from "react";
import { PromoSparkles } from "../components/3d/StarScene";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

function generateConfirmationNumber(): string {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SF-${dateStr}-${rand}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface FormData {
  childName: string;
  parentName: string;
  contactNumber: string;
  registrationDate: string;
  amount: string;
}

export function SlotConfirmationPage() {
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    parentName: "",
    contactNumber: "",
    registrationDate: new Date().toISOString().split("T")[0],
    amount: "3500",
  });
  const [showLetter, setShowLetter] = useState(false);
  const [confirmationNumber] = useState(generateConfirmationNumber);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handlePrint = () => window.print();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.childName.trim())
      newErrors.childName = "Child's name is required";
    if (!formData.parentName.trim())
      newErrors.parentName = "Parent's name is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.registrationDate)
      newErrors.registrationDate = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowLetter(true);
      setTimeout(() => {
        document
          .getElementById("confirmation-letter")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(160,190,230,0.18)",
    color: "#e8eaf0",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
    fontFamily: "DM Sans, sans-serif",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  const labelStyle = {
    color: "rgba(176,196,222,0.8)",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "6px",
  };

  const issuedDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedAmount = formData.amount
    ? Number(formData.amount).toLocaleString("en-IN")
    : "0";

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; margin: 0; }
          .slot-letter {
            background: white !important;
            color: black !important;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 40px !important;
            border-radius: 0 !important;
          }
          .slot-letter * { color: black !important; background: transparent !important; }
          .slot-letter .letter-divider { border-color: #ddd !important; }
          .letter-detail-row { border-bottom: 1px solid #eee !important; }
          .amount-section { background: #f8f8f8 !important; border: 1px solid #ccc !important; }
          .brand-header-print { display: block !important; }
          .instructions-block { background: #f8f8f8 !important; border: 1px solid #ddd !important; }
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
            data-ocid="slot-confirmation.link"
          >
            ← Back to Site
          </a>
          {showLetter && (
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
              data-ocid="slot-confirmation.primary_button"
            >
              ⬇ Download as PDF
            </button>
          )}
        </motion.div>

        {/* Brand header */}
        <motion.div
          {...fadeUp(0.1)}
          className="text-center mb-10 relative no-print"
          style={{ zIndex: 10 }}
        >
          <div
            className="text-4xl md:text-5xl font-bold tracking-tight gold-gradient"
            style={{ fontFamily: "Playfair Display, serif", lineHeight: 1.15 }}
          >
            ✦ SPARKLE FACES
          </div>
          <div
            className="text-xs font-bold tracking-[0.3em] uppercase mt-2 mb-5"
            style={{ color: "rgba(176,196,222,0.65)" }}
          >
            Where Young Stars Shine
          </div>
          <div className="flex items-center justify-center gap-3">
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

        {/* ===== FORM STATE ===== */}
        {!showLetter && (
          <motion.div
            {...fadeUp(0.2)}
            className="glass-card gold-border relative w-full max-w-lg rounded-3xl no-print"
            style={{
              padding: "clamp(2rem, 5vw, 3rem)",
              boxShadow:
                "0 0 80px rgba(80,120,200,0.1), 0 40px 80px rgba(0,0,0,0.4)",
              zIndex: 5,
            }}
          >
            {/* Corner ornaments */}
            {["top-5 left-5", "top-5 right-5"].map((pos, i) => (
              <span
                key={pos}
                className={`absolute ${pos}`}
                style={{
                  color: "#b0c4de",
                  opacity: i < 2 ? 0.5 : 0.25,
                  fontSize: "1.2rem",
                }}
              >
                ✦
              </span>
            ))}

            <div className="text-center mb-8">
              <h1
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#e8eaf0",
                }}
              >
                Slot Confirmation Letter
              </h1>
              <p className="text-sm" style={{ color: "rgba(176,196,222,0.6)" }}>
                Fill in the details to generate the official confirmation
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Child's Name */}
              <div>
                <label htmlFor="childName" style={labelStyle}>
                  Child's Name
                </label>
                <input
                  id="childName"
                  type="text"
                  placeholder="Enter child's full name"
                  value={formData.childName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      childName: e.target.value,
                    }))
                  }
                  style={inputStyle}
                  data-ocid="slot-confirmation.input"
                />
                {errors.childName && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#ff7c7c" }}
                    data-ocid="slot-confirmation.error_state"
                  >
                    {errors.childName}
                  </p>
                )}
              </div>

              {/* Parent's Name */}
              <div>
                <label htmlFor="parentName" style={labelStyle}>
                  Parent's Name
                </label>
                <input
                  id="parentName"
                  type="text"
                  placeholder="Enter parent's full name"
                  value={formData.parentName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentName: e.target.value,
                    }))
                  }
                  style={inputStyle}
                  data-ocid="slot-confirmation.input"
                />
                {errors.parentName && (
                  <p className="text-xs mt-1" style={{ color: "#ff7c7c" }}>
                    {errors.parentName}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" style={labelStyle}>
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactNumber: e.target.value,
                    }))
                  }
                  style={inputStyle}
                  data-ocid="slot-confirmation.input"
                />
                {errors.contactNumber && (
                  <p className="text-xs mt-1" style={{ color: "#ff7c7c" }}>
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Registration Amount */}
              <div>
                <label htmlFor="amount" style={labelStyle}>
                  Registration Amount (₹)
                </label>
                <input
                  id="amount"
                  type="text"
                  placeholder="Enter amount (e.g. 3500)"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  style={inputStyle}
                  data-ocid="slot-confirmation.input"
                />
              </div>

              {/* Registration Date */}
              <div>
                <label htmlFor="registrationDate" style={labelStyle}>
                  Date of Registration
                </label>
                <input
                  id="registrationDate"
                  type="date"
                  value={formData.registrationDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      registrationDate: e.target.value,
                    }))
                  }
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  data-ocid="slot-confirmation.input"
                />
                {errors.registrationDate && (
                  <p className="text-xs mt-1" style={{ color: "#ff7c7c" }}>
                    {errors.registrationDate}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-bold text-sm tracking-wider transition-all hover:scale-105 active:scale-95 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #7a9cc0 0%, #c8d8f0 50%, #8aaad0 100%)",
                  color: "#060b18",
                  boxShadow:
                    "0 4px 24px rgba(100,150,220,0.28), inset 0 1px 0 rgba(255,255,255,0.2)",
                  letterSpacing: "0.05em",
                }}
                data-ocid="slot-confirmation.submit_button"
              >
                ✦ Generate Confirmation Letter
              </button>
            </form>
          </motion.div>
        )}

        {/* ===== LETTER STATE ===== */}
        {showLetter && (
          <motion.div
            id="confirmation-letter"
            {...fadeUp(0)}
            className="slot-letter glass-card gold-border relative w-full max-w-3xl rounded-3xl"
            style={{
              padding: "clamp(2rem, 5vw, 4rem)",
              boxShadow:
                "0 0 80px rgba(80,120,200,0.1), 0 40px 80px rgba(0,0,0,0.4), inset 0 0 60px rgba(100,140,200,0.02)",
              zIndex: 5,
            }}
          >
            {/* Corner ornaments (screen only) */}
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

            {/* Brand header (print only) */}
            <div
              className="brand-header-print text-center mb-8"
              style={{ display: "none" }}
            >
              <div
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "#0a0a0a",
                }}
              >
                ✦ SPARKLE FACES
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "#555",
                  marginTop: "4px",
                  textTransform: "uppercase",
                }}
              >
                Where Young Stars Shine
              </div>
              <div
                style={{ marginTop: "12px", borderBottom: "2px solid #0a0a0a" }}
              />
            </div>

            {/* Letter header */}
            <motion.div
              {...fadeUp(0.1)}
              className="flex justify-between items-start mb-8"
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(176,196,222,0.6)" }}
                >
                  Issued On
                </p>
                <p className="text-sm font-medium" style={{ color: "#e8eaf0" }}>
                  {issuedDate}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(176,196,222,0.6)" }}
                >
                  Confirmation No.
                </p>
                <p
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#c8d8f0",
                  }}
                >
                  {confirmationNumber}
                </p>
              </div>
            </motion.div>

            <div
              className="letter-divider"
              style={{
                height: "1px",
                background: "rgba(160,190,230,0.12)",
                marginBottom: "2rem",
              }}
            />

            {/* Slot Confirmation heading */}
            <motion.div {...fadeUp(0.15)} className="mb-6">
              <p
                className="text-xs font-bold uppercase tracking-[0.25em] mb-1"
                style={{ color: "rgba(176,196,222,0.6)" }}
              >
                Official Document
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold gold-gradient"
                style={{
                  fontFamily: "Playfair Display, serif",
                  lineHeight: 1.2,
                }}
              >
                Slot Confirmation
              </h2>
            </motion.div>

            {/* Greeting */}
            <motion.div {...fadeUp(0.2)} className="mb-6">
              <p
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#e8eaf0",
                }}
              >
                Dear {formData.parentName},
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(200,215,240,0.85)" }}
              >
                We are delighted to confirm that{" "}
                <strong style={{ color: "#c8d8f0", fontWeight: 700 }}>
                  {formData.childName}
                </strong>
                's slot has been{" "}
                <strong style={{ color: "#c8d8f0", fontWeight: 700 }}>
                  successfully registered
                </strong>{" "}
                with Sparkle Faces. Your child has been shortlisted for a{" "}
                <strong style={{ color: "#c8d8f0", fontWeight: 700 }}>
                  Premium Brand Shoot
                </strong>{" "}
                experience with our elite talent programme.
              </p>
            </motion.div>

            {/* Details block */}
            <motion.div
              {...fadeUp(0.25)}
              className="rounded-2xl overflow-hidden mb-8"
              style={{ border: "1px solid rgba(160,190,230,0.18)" }}
            >
              <div
                className="px-5 py-3"
                style={{
                  background: "rgba(100,140,200,0.12)",
                  borderBottom: "1px solid rgba(160,190,230,0.15)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#b0c4de" }}
                >
                  Registration Details
                </p>
              </div>
              {[
                ["Child's Name", formData.childName],
                ["Parent's Name", formData.parentName],
                ["Contact", formData.contactNumber],
                ["Registration Date", formatDate(formData.registrationDate)],
                ["Confirmation No.", confirmationNumber],
              ].map(([label, value], idx, arr) => (
                <div
                  key={label}
                  className="letter-detail-row flex justify-between items-center px-5 py-3.5"
                  style={{
                    borderBottom:
                      idx < arr.length - 1
                        ? "1px solid rgba(160,190,230,0.08)"
                        : "none",
                    background:
                      idx % 2 === 0 ? "rgba(80,120,200,0.03)" : "transparent",
                  }}
                >
                  <span
                    className="text-sm"
                    style={{ color: "rgba(176,196,222,0.7)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#e8eaf0" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Amount section */}
            <motion.div
              {...fadeUp(0.3)}
              className="amount-section rounded-2xl p-6 mb-8 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(70,110,190,0.15) 0%, rgba(100,150,220,0.08) 50%, rgba(60,100,180,0.12) 100%)",
                border: "1px solid rgba(160,190,230,0.3)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "rgba(176,196,222,0.65)" }}
              >
                Registration Amount
              </p>
              <p
                className="text-4xl font-bold gold-gradient mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                ₹{formattedAmount}
              </p>
              <p
                className="text-xs leading-relaxed px-4 inline-block py-2 rounded-full"
                style={{
                  color: "rgba(176,196,222,0.7)",
                  background: "rgba(100,140,200,0.12)",
                  border: "1px solid rgba(160,190,230,0.2)",
                  letterSpacing: "0.02em",
                }}
              >
                Note: If your child is not selected, the full amount of ₹
                {formattedAmount} will be refunded to you.
              </p>
            </motion.div>

            {/* Shoot Day Instructions */}
            <motion.div {...fadeUp(0.35)} className="mb-8">
              <p
                className="text-sm font-bold uppercase tracking-widest mb-5"
                style={{ color: "#b0c4de" }}
              >
                📸 Shoot Day Instructions
              </p>
              <div
                className="instructions-block rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(160,190,230,0.15)" }}
              >
                {[
                  [
                    "⏰",
                    "Arrival",
                    "Please arrive 15 minutes before your scheduled shoot time.",
                  ],
                  [
                    "👗",
                    "Dress Code",
                    "All costumes are provided by Sparkle Faces. No need to bring any clothing or outfits.",
                  ],
                  [
                    "🎒",
                    "What to Bring",
                    "Please bring appropriate footwear for your child. Everything else is taken care of by us.",
                  ],
                  [
                    "🤝",
                    "On the Day",
                    "Our professional team will guide you through every step — from styling to the shoot.",
                  ],
                  [
                    "📞",
                    "For Queries",
                    "Contact us at: info@sparklefaces.net or +91 98192 09964",
                  ],
                ].map(([icon, title, desc], idx, arr) => (
                  <div
                    key={title}
                    className="flex gap-4 px-5 py-4"
                    style={{
                      borderBottom:
                        idx < arr.length - 1
                          ? "1px solid rgba(160,190,230,0.08)"
                          : "none",
                      background:
                        idx % 2 === 0 ? "rgba(80,120,200,0.04)" : "transparent",
                    }}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p
                        className="text-sm font-bold mb-0.5"
                        style={{ color: "#c8d8f0" }}
                      >
                        {title}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(200,215,240,0.75)" }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div
              className="letter-divider"
              style={{
                height: "1px",
                background: "rgba(160,190,230,0.12)",
                marginBottom: "2rem",
              }}
            />

            {/* Signature */}
            <motion.div {...fadeUp(0.4)}>
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
                className="text-xs hover:opacity-80 transition-opacity mt-1 inline-block no-print"
                style={{ color: "rgba(160,190,230,0.55)" }}
              >
                🌐 sparklefaces.in
              </a>
            </motion.div>

            {/* Edit form button */}
            <motion.div {...fadeUp(0.45)} className="mt-8 no-print">
              <button
                type="button"
                onClick={() => setShowLetter(false)}
                className="text-sm transition-all hover:opacity-80"
                style={{
                  color: "rgba(176,196,222,0.5)",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                data-ocid="slot-confirmation.secondary_button"
              >
                ← Edit Details
              </button>
            </motion.div>
          </motion.div>
        )}

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
