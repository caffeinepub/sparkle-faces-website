import { Loader2, Mail, MapPin, Phone, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInView } from "../hooks/useInView";

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

  return (
    <section id="contact" className="py-24 bg-dark" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 bg-gold/10 mb-4"
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
                Let's Connect
              </h3>
              <p className="text-white/60 leading-relaxed">
                Whether you're a parent looking to enroll your child or a brand
                seeking young talent, we'd love to hear from you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    Address
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Office No-302, Crystal IT Park,
                    <br />
                    Khandwa Road, Indore, MP 452015
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+919819209964"
                    className="text-white/80 hover:text-gold transition-colors"
                  >
                    +91 9819209964
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@sparklefaces.net"
                    className="text-white/80 hover:text-gold transition-colors"
                  >
                    info@sparklefaces.net
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    Client Servicing
                  </p>
                  <p className="text-white/80 text-sm">Kunal Chaudhary</p>
                </div>
              </div>
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
              data-ocid="contact.panel"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-white/50 text-xs uppercase tracking-wider mb-2 block"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-white/50 text-xs uppercase tracking-wider mb-2 block"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="text-white/50 text-xs uppercase tracking-wider mb-2 block"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-white/50 text-xs uppercase tracking-wider mb-2 block"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none text-sm"
                  data-ocid="contact.textarea"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl font-semibold text-dark bg-gold hover:bg-gold-light disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2"
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
