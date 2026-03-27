import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const photos = [
  "https://indiasproductionhouse.odoo.com/web/image/469-f6bd9b41/364713df-ba29-41b0-a092-2ae50098c90e_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/470-8544d58a/fd8f9c94-a8ce-4820-8970-4acc80d5ab22_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/480-092df419/WhatsApp%20Image%202026-02-15%20at%2016.25.52.webp",
  "https://indiasproductionhouse.odoo.com/web/image/473-037013e7/WhatsApp%20Image%202026-02-15%20at%2016.25.51%20%282%29.webp",
  "https://indiasproductionhouse.odoo.com/web/image/479-fefe724d/sparkefaces.jpeg",
  "https://indiasproductionhouse.odoo.com/web/image/481-084fe5c3/0d54c813-50e3-4e1f-a78a-24483a91656f_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/471-8a0a5177/4f26647f-a913-4687-bc0f-b1388a95923b_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/474-d283c2a6/74af594a-b06a-4dc3-9633-09311275bfc8_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/475-ce297566/a7bdeec4-34ec-40f7-bf33-4b52ca352c74_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/476-fb28db8e/6431f1c3-b93e-4a10-be09-180ffa485315_full.jpg",
  "https://indiasproductionhouse.odoo.com/web/image/482-2e393ddc/WhatsApp%20Image%202026-02-15%20at%2016.25.50.jpeg",
  "https://indiasproductionhouse.odoo.com/web/image/477-8c1e1e7c/WhatsApp%20Image%202026-02-15%20at%2016.25.51%20%281%29.jpeg",
  "https://indiasproductionhouse.odoo.com/web/image/472-678bc59c/4f88a4ba-b1d7-421d-be66-97ca25e99a6e_full.jpg",
];

export function GallerySection() {
  const { ref, inView } = useInView();

  return (
    <section id="gallery" className="py-24 bg-dark" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 bg-gold/10 mb-4"
          >
            Our Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            Our <span className="gold-gradient">Kids</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/55 mt-4 max-w-lg mx-auto"
          >
            A glimpse at our talented young stars and the moments we've helped
            create.
          </motion.p>
        </div>

        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          data-ocid="gallery.list"
        >
          {photos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid cursor-pointer"
              style={{ border: "1px solid rgba(200,162,90,0.15)" }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={src}
                alt={`Sparkle Faces talent ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-gold/80 text-xs font-semibold tracking-widest uppercase">
                  Sparkle Faces
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
