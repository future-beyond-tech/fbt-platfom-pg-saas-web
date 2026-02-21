import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { prefersReducedMotion } from '../lib/prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyCount: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative w-full py-20 lg:py-32 bg-navy ${className}`}
    >
      <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
        <div
          ref={cardRef}
          className="glass-card p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left side - Contact info */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-light mb-4">
                Ready to unify your PG operations?
              </h2>
              <p className="text-sm lg:text-base text-gray-text mb-8 leading-relaxed">
                Tell us what you're managing. We'll recommend a setup and migration plan.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-text uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm text-gray-light">hello@fbtpg.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-text uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-gray-light">+91-XXXX-XXX-XXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-text uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm text-gray-light">Hyderabad, India | Remote-first team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div>
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-mint/20 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-mint" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gray-light mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-text">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-text uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-light text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-mint/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-text uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-light text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-mint/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-text uppercase tracking-wider mb-2">
                      Property Count
                    </label>
                    <select
                      name="propertyCount"
                      value={formData.propertyCount}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-light text-sm focus:outline-none focus:border-mint/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-navy">Select property count</option>
                      <option value="1" className="bg-navy">1 property</option>
                      <option value="2-5" className="bg-navy">2-5 properties</option>
                      <option value="6-20" className="bg-navy">6-20 properties</option>
                      <option value="20+" className="bg-navy">20+ properties</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-text uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-light text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-mint/50 transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
                  >
                    Send Message
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display text-xl font-bold text-gray-light">
              FBT
            </div>
            <p className="text-xs text-gray-text">
              © FBT PG Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-xs text-gray-text hover:text-gray-light transition-colors">
                Privacy
              </button>
              <button className="text-xs text-gray-text hover:text-gray-light transition-colors">
                Terms
              </button>
              <button className="text-xs text-gray-text hover:text-gray-light transition-colors">
                Security
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;