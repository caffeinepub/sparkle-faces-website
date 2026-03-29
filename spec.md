# Sparkle Faces Website

## Current State
Fully built dark/cinematic gold-themed kids casting agency website with:
- Hero, Services, Gallery, Testimonials, Brand Partners, Stats, FAQ, Comparison, Trust, Founder, Contact, Footer sections
- 3D Three.js star scene in hero
- Admin panel at /admin with slot counter
- Promo page at /promo with PDF download
- Enrollment toast notifications
- Dark background with gold/amber color accents
- Some sections contain pricing references (₹3,500 deposit language, ₹15,000–₹20,000 payouts)

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- **Full theme redesign**: Replace dark gold/amber with deep navy + platinum/silver luxury palette
  - Background: deep navy (#0a0f1e, #060b18 deep darks with blue undertones)
  - Accents: platinum/silver instead of gold (#C0C0C0, #E8E8E8, silver gradients)
  - Typography: editorial, spacious, fashion-forward luxury brand feel
  - 3D elements: maintain but use silver/platinum particle colors instead of gold
  - All sections: more breathing room, larger editorial typography
  - index.css: update CSS variables for navy/platinum design system
  - All components: replace gold/amber color classes with navy/silver equivalents
- **Remove all ₹3,500 references**: Remove all mentions of the ₹3,500 charge/deposit/fee — from Services, FAQ, Promo page, Comparison table, TrustSection, everywhere. No language about any payment from parents at all.
- **Keep ₹15,000–₹20,000 payout**: This is an earning for the child/family, it stays visible wherever it currently appears.

### Remove
- All language implying parents pay anything: "₹3,500", "security deposit", "refundable deposit", "refundable fee", any mention of registration cost

## Implementation Plan
1. Update `index.css` with new deep navy + platinum/silver design tokens
2. Update `tailwind.config.js` if it exists with new color tokens
3. Update `HeroSection.tsx` -- navy bg, silver particles in 3D scene, platinum text accents
4. Update `Navbar.tsx` -- navy/silver theme
5. Update `ServicesSection.tsx` -- navy/silver, remove any ₹3,500 language
6. Update `BrandsSection.tsx` -- navy/silver
7. Update `StatsSection.tsx` -- navy/silver
8. Update `KidsGallerySection.tsx` -- navy/silver
9. Update `TestimonialsSection.tsx` -- navy/silver
10. Update `FAQSection.tsx` -- navy/silver, remove ₹3,500 from answers, keep ₹15,000–₹20,000 payouts
11. Update `ComparisonSection.tsx` -- navy/silver, remove ₹3,500, keep ₹15,000–₹20,000
12. Update `TrustSection.tsx` -- navy/silver, remove ₹3,500
13. Update `FounderSection.tsx` -- navy/silver
14. Update `ContactSection.tsx` -- navy/silver
15. Update `Footer.tsx` -- navy/silver
16. Update `PromoPage.tsx` -- navy/silver, remove ₹3,500 and refundable deposit language, keep ₹15,000–₹20,000
17. Update `EnrollSection.tsx` and `AboutSection.tsx` -- navy/silver
18. Update `3d/StarScene.tsx` -- change particle/star colors to silver/platinum
19. Validate: lint, typecheck, build
