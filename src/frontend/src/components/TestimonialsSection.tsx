import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { SectionSparkles } from "./3d/StarScene";

const testimonials = [
  {
    id: "t1",
    quote:
      "The team at Sparkle Faces handled everything professionally. My daughter got her first commercial within a month!",
    name: "Priya M.",
    city: "Mumbai",
    initials: "PM",
    photo:
      "/assets/uploads/little_star_with_big_dreams_shining_brighter_every_day._portfolio_kidsmodeling_kidsbrandsho-019d3b51-1dc3-7351-83c2-7e68011234c6-2.jpg",
  },
  {
    id: "t2",
    quote:
      "Safe, transparent, and genuinely caring. I trust Sparkle Faces completely with my son's career in the entertainment world.",
    name: "Rahul S.",
    city: "Delhi",
    initials: "RS",
    photo:
      "/assets/uploads/a_little_star_shines_brighter_when_shared_with_mom_from_his_first_brand_shoot_with_persona_ki-019d3b51-1e6c-7641-9da8-d4aa9d975f92-4.jpg",
  },
  {
    id: "t3",
    quote:
      "From audition to shoot day, they guided us every step of the way. Highly recommended for all parents!",
    name: "Anita K.",
    city: "Bangalore",
    initials: "AK",
    photo:
      "/assets/uploads/img_20260325_190346_869-019d3b51-1dd4-7344-a164-435de6281c6d-3.jpg",
  },
  {
    id: "t4",
    quote:
      "We were nervous at first, but Sparkle Faces made the entire process so smooth and reassuring. My son looked like a star on shoot day!",
    name: "Meera P.",
    city: "Ahmedabad",
    initials: "MP",
    photo:
      "/assets/uploads/img_20260325_190336_057-019d3b51-1f7e-758f-b795-b78567816e39-6.jpg",
  },
  {
    id: "t5",
    quote:
      "Incredible experience from start to finish. The studio was world-class and the team treated our daughter like royalty. Highly recommend!",
    name: "Sanjay B.",
    city: "Kolkata",
    initials: "SB",
    photo:
      "/assets/uploads/pure_innocence_pure_charm_little_moments_big_memories_future_star_in_the_making_1-019d3b51-1faf-77fe-8c2e-8679ab04a173-7.jpg",
  },
  {
    id: "t6",
    quote:
      "My child's confidence has grown so much after working with Sparkle Faces. The grooming sessions and professional guidance are truly exceptional.",
    name: "Deepika R.",
    city: "Hyderabad",
    initials: "DR",
    photo:
      "/assets/uploads/img_20260325_190304_856-019d3b51-1c5e-736a-be51-367a3d5d4490-1.jpg",
  },
  {
    id: "t7",
    quote:
      "Professional team, stunning portfolio for our little one. Sparkle Faces delivered beyond our expectations!",
    name: "Vikram J.",
    city: "Pune",
    initials: "VJ",
    photo:
      "/assets/uploads/img_20260325_194724_128-019d3b51-1e4a-7754-8a77-251a28e6264a-5.jpg",
  },
];

const SILVER = "rgba(160,190,230,";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView();

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#0a0f1e" }}
      ref={ref}
    >
      <SectionSparkles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              color: "#b0c4de",
              border: `1px solid ${SILVER}0.3)`,
              background: `${SILVER}0.08)`,
            }}
          >
            Parent Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            What <span className="gold-gradient">Parents Say</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-10 text-center relative"
              style={{ border: `1px solid ${SILVER}0.15)` }}
              data-ocid="testimonials.card"
            >
              <Quote
                size={48}
                className="mx-auto mb-6"
                style={{ color: `${SILVER}0.2)` }}
              />
              <p
                className="text-xl leading-relaxed font-heading italic mb-8"
                style={{ color: "rgba(220,228,245,0.8)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: `2px solid ${SILVER}0.35)` }}
                >
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = "rgba(100,140,200,0.2)";
                        parent.innerHTML = `<span style="color:#b0c4de;font-weight:bold;font-size:14px;display:flex;align-items:center;justify-content:center;height:100%;">${t.initials}</span>`;
                      }
                    }}
                  />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p
                    style={{ color: "rgba(200,210,230,0.5)" }}
                    className="text-sm"
                  >
                    {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all"
              style={{
                border: `1px solid ${SILVER}0.2)`,
                color: `${SILVER}0.7)`,
              }}
              data-ocid="testimonials.pagination_prev"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === current ? "24px" : "8px",
                    background: i === current ? "#b0c4de" : `${SILVER}0.3)`,
                  }}
                  data-ocid={`testimonials.item.${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all"
              style={{
                border: `1px solid ${SILVER}0.2)`,
                color: `${SILVER}0.7)`,
              }}
              data-ocid="testimonials.pagination_next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
