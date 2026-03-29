import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Enroll", href: "#enroll" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 border-b" : "py-4 bg-transparent"
      }`}
      style={
        scrolled
          ? {
              background: "rgba(6,11,24,0.92)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(160,190,230,0.15)",
              boxShadow: "0 0 30px rgba(100,140,200,0.1)",
            }
          : {}
      }
      data-ocid="nav.panel"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/sparkle-faces-logo-transparent.dim_600x200.png"
            alt="Sparkle Faces"
            className="h-10 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide uppercase transition-colors"
              style={{ color: "rgba(180,200,230,0.7)" }}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://cfpe.me/sparklefaces"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7a9cc0 0%, #b8cce4 100%)",
              color: "#060b18",
              boxShadow: "0 0 20px rgba(120,160,210,0.25)",
            }}
            data-ocid="nav.primary_button"
          >
            Enroll Now
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
          style={{
            background: "rgba(6,11,24,0.95)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(160,190,230,0.15)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 tracking-wide transition-colors"
              style={{ color: "rgba(200,210,230,0.8)" }}
              onClick={() => setMenuOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://cfpe.me/sparklefaces"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-sm font-semibold text-center"
            style={{
              background: "linear-gradient(135deg, #7a9cc0 0%, #b8cce4 100%)",
              color: "#060b18",
            }}
            data-ocid="nav.primary_button"
          >
            Enroll Now
          </a>
        </div>
      )}
    </nav>
  );
}
