import { SiInstagram } from "react-icons/si";

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
    href: "https://www.instagram.com/sparklefaces.in?igsh=MWYxaDQ2MXVmNTF2eg==",
    label: "Instagram",
  },
];

const SILVER = "rgba(160,190,230,";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t py-16"
      style={{
        backgroundColor: "#060b18",
        borderColor: `${SILVER}0.1)`,
      }}
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
            <p
              style={{ color: "rgba(200,210,230,0.5)" }}
              className="text-sm leading-relaxed mb-6"
            >
              Nurturing Young Stars Across India. India&apos;s trusted kids
              casting &amp; talent management agency.
            </p>
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center transition-all"
                  style={{
                    border: `1px solid ${SILVER}0.18)`,
                    color: "rgba(200,210,230,0.5)",
                  }}
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
                    className="text-sm transition-colors"
                    style={{ color: "rgba(200,210,230,0.5)" }}
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
            <div
              className="space-y-2 text-sm"
              style={{ color: "rgba(200,210,230,0.5)" }}
            >
              <p>Office No-302, Crystal IT Park,</p>
              <p>Khandwa Road, Indore, MP 452015</p>
              <p className="pt-2">
                <a
                  href="tel:+919819209964"
                  className="hover:opacity-80 transition-opacity"
                >
                  +91 98192 09964
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@sparklefaces.net"
                  className="hover:opacity-80 transition-opacity"
                >
                  info@sparklefaces.net
                </a>
              </p>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{
            borderColor: `${SILVER}0.08)`,
            color: "rgba(200,210,230,0.3)",
          }}
        >
          <p>© {year} Sparkle Faces. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: `${SILVER}0.55)` }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
