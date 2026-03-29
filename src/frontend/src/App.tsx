import { Toaster } from "@/components/ui/sonner";
import { GlobalLuxury3D } from "./components/3d/StarScene";
import { AboutSection } from "./components/AboutSection";
import { BrandsSection } from "./components/BrandsSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { ContactSection } from "./components/ContactSection";
import { EnrollSection } from "./components/EnrollSection";
import { EnrollmentToasts } from "./components/EnrollmentToasts";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { FounderSection } from "./components/FounderSection";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { KidsGallerySection } from "./components/KidsGallerySection";
import { Navbar } from "./components/Navbar";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TrustSection } from "./components/TrustSection";
import { AdminPage } from "./pages/AdminPage";
import { PromoPage } from "./pages/PromoPage";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return (
      <>
        <AdminPage />
        <Toaster />
      </>
    );
  }

  if (path === "/promo") {
    return (
      <>
        <PromoPage />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0B0D10" }}>
      <GlobalLuxury3D />
      <Toaster />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <KidsGallerySection />
        <GallerySection />
        <StatsSection />
        <BrandsSection />
        <TestimonialsSection />
        <FounderSection />
        <EnrollSection />
        <ComparisonSection />
        <TrustSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <EnrollmentToasts />
    </div>
  );
}
