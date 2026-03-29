import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const KIDS = [
  {
    photo:
      "/assets/uploads/img_20260325_190304_856-019d3b51-1c5e-736a-be51-367a3d5d4490-1.jpg",
    name: "Aryan",
    brand: "Manyavar",
  },
  {
    photo:
      "/assets/uploads/little_star_with_big_dreams_shining_brighter_every_day._portfolio_kidsmodeling_kidsbrandsho-019d3b51-1dc3-7351-83c2-7e68011234c6-2.jpg",
    name: "Priya",
    brand: "H&M",
  },
  {
    photo:
      "/assets/uploads/img_20260325_190346_869-019d3b51-1dd4-7344-a164-435de6281c6d-3.jpg",
    name: "Ananya",
    brand: "Hopscotch",
  },
  {
    photo:
      "/assets/uploads/a_little_star_shines_brighter_when_shared_with_mom_from_his_first_brand_shoot_with_persona_ki-019d3b51-1e6c-7641-9da8-d4aa9d975f92-4.jpg",
    name: "Zara & Mom",
    brand: "Biba",
  },
  {
    photo:
      "/assets/uploads/img_20260325_194724_128-019d3b51-1e4a-7754-8a77-251a28e6264a-5.jpg",
    name: "Rohan",
    brand: "Mamaearth",
  },
  {
    photo:
      "/assets/uploads/img_20260325_190336_057-019d3b51-1f7e-758f-b795-b78567816e39-6.jpg",
    name: "Nisha",
    brand: "Ajio",
  },
];

export function KidsGallerySection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "#0B0D10" }}
      id="stars"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Our <span className="gold-gradient">Stars in Action</span>
          </h2>
          <p className="text-white/50 text-lg">
            Real kids. Real brands. Real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KIDS.map((kid, i) => (
            <motion.div
              key={kid.name}
              className="glass-card rounded-2xl overflow-hidden group"
              style={{ border: "1px solid rgba(200,162,90,0.2)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-ocid={`stars.item.${i + 1}`}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={kid.photo}
                  alt={`${kid.name} shot for ${kid.brand}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,13,16,0.85) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(200,162,90,0.2)",
                      border: "1px solid rgba(200,162,90,0.5)",
                      color: "#E8C97A",
                    }}
                  >
                    ✦ {kid.brand}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white font-semibold">{kid.name}</p>
                <p className="text-white/50 text-sm mt-0.5">
                  Shot for {kid.brand}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
