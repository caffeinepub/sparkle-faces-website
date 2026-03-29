import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const faqs = [
  {
    id: "refund",
    q: "Is the security deposit refundable?",
    a: "Yes, 100%. If your child is not selected after the initial process, the full security deposit is refunded. No questions asked.",
  },
  {
    id: "earnings",
    q: "How much can my child earn per shoot?",
    a: "From the 2nd shoot onwards, children earn ₹15,000–₹20,000 per brand shoot. The first shoot focuses on portfolio building and brand placement.",
  },
  {
    id: "age",
    q: "What age groups are eligible?",
    a: "We work with children aged 1 month to 18 years. All looks, skin tones, and backgrounds are welcome — diversity is our strength.",
  },
  {
    id: "timeline",
    q: "How long before my child gets their first shoot?",
    a: "Most children are placed within 2–6 weeks of enrollment, depending on current brand requirements and availability.",
  },
  {
    id: "safety",
    q: "Who will be present during the shoot?",
    a: "Parents are always present on set. Our team ensures a safe, professional, and child-friendly environment at all times.",
  },
  {
    id: "selection",
    q: "How do I know if my child will be selected?",
    a: "We shortlist based on current brand briefs. Once shortlisted, you'll be notified directly. The process is transparent and merit-based.",
  },
  {
    id: "after",
    q: "What happens after the shoot?",
    a: "Your child's portfolio is updated and they become eligible for repeat brand shoots with top brands earning ₹15,000–₹20,000 per shoot. We guide you through every next step.",
  },
  {
    id: "experience",
    q: "Do I need any prior experience?",
    a: "No experience needed. We provide grooming, camera confidence training, and full shoot-day guidance for every child.",
  },
];

export function FAQSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="faq"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#0B0D10" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200,162,90,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
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
            💬 Common Questions
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <span style={{ color: "#F0ECE3" }}>Parent</span>{" "}
            <span className="gold-gradient">FAQ</span>
          </h2>
          <p style={{ color: "rgba(240,236,227,0.6)" }} className="text-base">
            Everything you need to know before enrolling your child.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl px-5 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(200,162,90,0.18)",
                }}
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger
                  className="text-left py-5 text-base font-semibold hover:no-underline"
                  style={{ color: "#F0ECE3" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: "rgba(240,236,227,0.65)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p style={{ color: "rgba(240,236,227,0.5)" }} className="text-sm">
            Still have questions?{" "}
            <a
              href="#contact"
              style={{ color: "#E8C97A" }}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Contact us directly
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
