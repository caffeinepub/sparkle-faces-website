import { SiInstagram, SiLinkedin, SiWhatsapp, SiYoutube } from "react-icons/si";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Enroll", href: "#enroll" },
];

const socials = [
  {
    Icon: SiInstagram,
    href: "https://instagram.com/sparklefaces",
    label: "Instagram",
  },
  {
    Icon: SiYoutube,
    href: "https://youtube.com/@sparklefaces",
    label: "YouTube",
  },
  {
    Icon: SiLinkedin,
    href: "https://linkedin.com/company/sparklefaces",
    label: "LinkedIn",
  },
  { Icon: SiWhatsapp, href: "https://wa.me/919819209964", label: "WhatsApp" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-gold/10 bg-dark py-16"
      data-ocid="footer.section"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/sparkle-faces-logo-transparent.dim_600x200.png"
                alt="Sparkle Faces"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Nurturing Young Stars Across India. India's trusted kids casting &
              talent management agency.
            </p>
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass-card border border-gold/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/50 transition-all"
                  data-ocid="footer.link"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Contact
            </h4>
            <div className="space-y-2 text-white/50 text-sm">
              <p>Office No-302, Crystal IT Park,</p>
              <p>Khandwa Road, Indore, MP 452015</p>
              <p className="pt-2">
                <a
                  href="tel:+919819209964"
                  className="hover:text-gold transition-colors"
                >
                  +91 9819209964
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@sparklefaces.net"
                  className="hover:text-gold transition-colors"
                >
                  info@sparklefaces.net
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/35">
          <p>© {year} Sparkle Faces. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
