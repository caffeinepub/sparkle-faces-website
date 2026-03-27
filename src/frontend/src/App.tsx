import { Toaster } from "@/components/ui/sonner";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { EnrollSection } from "./components/EnrollSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  const isAdmin = window.location.pathname === "/admin";

  if (isAdmin) {
    return (
      <>
        <AdminPage />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0B0D10" }}>
      <Toaster />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <StatsSection />
        <TestimonialsSection />
        <EnrollSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
