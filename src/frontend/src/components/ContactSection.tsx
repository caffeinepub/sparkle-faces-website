import { Loader2, Mail, MapPin, Phone, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInView } from "../hooks/useInView";

const SILVER = "rgba(160,190,230,";

export function ContactSection() {
  const { ref, inView } = useInView();
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      if (actor && typeof (actor as any).submitContact === "function") {
        await (actor as any).submitContact(
          form.name,
          form.email,
          form.phone,
          form.message,
        );
      }
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: `${SILVER}0.04)`,
    border: `1px solid ${SILVER}0.12)`,
    color: "#e8eaf0",
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: "#060b18" }}
      ref={ref}
    >
      <div className="container mx-auto px-4">
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
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            Contact <span className="gold-gradient">Us</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-6">
                Let&apos;s Connect
              </h3>
              <p
                style={{ color: "rgba(200,210,230,0.6)" }}
                className="leading-relaxed"
              >
                Whether you&apos;re a parent looking to enroll your child or a
                brand seeking young talent, we&apos;d love to hear from you.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  content: (
                    <p
                      style={{ color: "rgba(220,228,245,0.8)" }}
                      className="text-sm leading-relaxed"
                    >
                      Office No-302, Crystal IT Park,
                      <br />
                      Khandwa Road, Indore, MP 452015
                    </p>
                  ),
                },
                {
                  Icon: Phone,
                  label: "Phone",
                  content: (
                    <a
                      href="tel:+919819209964"
                      className="text-sm transition-colors"
                      style={{ color: "rgba(220,228,245,0.8)" }}
                    >
                      +91 98192 09964
                    </a>
                  ),
                },
                {
                  Icon: Mail,
                  label: "Email",
                  content: (
                    <a
                      href="mailto:info@sparklefaces.net"
                      className="text-sm transition-colors"
                      style={{ color: "rgba(220,228,245,0.8)" }}
                    >
                      info@sparklefaces.net
                    </a>
                  ),
                },
                {
                  Icon: User,
                  label: "Client Servicing",
                  content: (
                    <p
                      style={{ color: "rgba(220,228,245,0.8)" }}
                      className="text-sm"
                    >
                      Kunal Chaudhary
                    </p>
                  ),
                },
              ].map(({ Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `${SILVER}0.08)`,
                      border: `1px solid ${SILVER}0.18)`,
                    }}
                  >
                    <Icon size={18} style={{ color: "#b0c4de" }} />
                  </div>
                  <div>
                    <p
                      style={{ color: "rgba(200,210,230,0.4)" }}
                      className="text-xs uppercase tracking-widest mb-1"
                    >
                      {label}
                    </p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
              style={{ border: `1px solid ${SILVER}0.12)` }}
              data-ocid="contact.panel"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{ color: "rgba(200,210,230,0.5)" }}
                    className="text-xs uppercase tracking-wider mb-2 block"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle}
                    className="w-full px-4 py-3 rounded-xl placeholder-white/20 focus:outline-none transition-colors text-sm"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{ color: "rgba(200,210,230,0.5)" }}
                    className="text-xs uppercase tracking-wider mb-2 block"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    style={inputStyle}
                    className="w-full px-4 py-3 rounded-xl placeholder-white/20 focus:outline-none transition-colors text-sm"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  style={{ color: "rgba(200,210,230,0.5)" }}
                  className="text-xs uppercase tracking-wider mb-2 block"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-xl placeholder-white/20 focus:outline-none transition-colors text-sm"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  style={{ color: "rgba(200,210,230,0.5)" }}
                  className="text-xs uppercase tracking-wider mb-2 block"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your child..."
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-xl placeholder-white/20 focus:outline-none transition-colors resize-none text-sm"
                  data-ocid="contact.textarea"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl font-semibold disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #7a9cc0 0%, #b8cce4 100%)",
                  color: "#060b18",
                  boxShadow: "0 0 20px rgba(120,160,210,0.2)",
                }}
                data-ocid="contact.submit_button"
              >
                {sending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
