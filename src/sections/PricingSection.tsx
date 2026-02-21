import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Building, Infinity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  className?: string;
}

const PricingSection = ({ className = '' }: PricingSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards stagger animation
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Perfect for single property owners',
      icon: Sparkles,
      features: [
        '1 property / up to 20 beds',
        'Tenant & room management',
        'Manual invoicing',
        'Basic reporting',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '₹2,999',
      period: '/month',
      description: 'For growing PG operators',
      icon: Building,
      features: [
        'Up to 5 properties / 150 beds',
        'Auto-billing + power module',
        'Payment reconciliation',
        'Advanced analytics',
        'Priority support',
        'WhatsApp notifications',
      ],
      cta: 'Start Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large chains & franchises',
      icon: Infinity,
      features: [
        'Unlimited properties',
        'Custom integrations + SLA',
        'Dedicated support',
        'White-label options',
        'API access',
        'On-premise deployment',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={`relative w-full py-20 lg:py-32 bg-navy-light ${className}`}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-light mb-4">
            Simple pricing. No setup fees.
          </h2>
          <p className="text-base lg:text-lg text-gray-text max-w-2xl mx-auto leading-relaxed">
            Start free. Upgrade when you're ready to automate billing and add more properties.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={el => { cardsRef.current[i] = el; }}
              className={`relative glass-card p-6 lg:p-8 flex flex-col ${
                plan.popular ? 'border-mint/30' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-mint text-navy text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-mint/20' : 'bg-white/5'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-mint' : 'text-gray-text'}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-light mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-text">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="font-display text-3xl lg:text-4xl font-bold text-gray-light">
                  {plan.price}
                </span>
                <span className="text-gray-text text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-mint text-navy hover:bg-mint-light'
                    : 'bg-white/5 text-gray-light hover:bg-white/10 border border-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Compare link */}
        <div className="text-center mt-10">
          <button className="text-mint text-sm hover:underline underline-offset-4">
            Compare all features
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;