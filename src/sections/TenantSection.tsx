import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bed, Calendar } from 'lucide-react';
import { prefersReducedMotion } from '../lib/prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface TenantSectionProps {
  className?: string;
}

const TenantSection = ({ className = '' }: TenantSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mainCard = mainCardRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !mainCard || !leftCard || !rightCard || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Main card entrance (0% - 30%) - from bottom
      scrollTl.fromTo(mainCard,
        { y: '110vh', opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      // Left card entrance (8% - 30%)
      scrollTl.fromTo(leftCard,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Right card entrance (8% - 30%)
      scrollTl.fromTo(rightCard,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Exit animations (70% - 100%)
      scrollTl.fromTo(mainCard,
        { y: 0, opacity: 1 },
        { y: '-90vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(leftCard,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(rightCard,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tenants"
      className={`section-pinned bg-navy ${className}`}
    >
      <div className="stage-container flex flex-col lg:block justify-center lg:justify-start">
        {/* Mobile info cards row */}
        <div className="flex lg:hidden gap-3 sm:gap-4 mb-4 px-1 sm:px-2">
          <div className="flex-1 glass-card p-4">
            <div className="w-8 h-8 rounded-lg bg-mint/10 flex items-center justify-center mb-3">
              <Bed className="w-4 h-4 text-mint" />
            </div>
            <h3 className="font-display text-xs font-semibold text-gray-light mb-1">
              Bed Allocation
            </h3>
            <p className="text-[10px] text-gray-text leading-relaxed">
              Drag-and-drop assignment with occupancy rules.
            </p>
          </div>
          <div className="flex-1 glass-card p-4">
            <div className="w-8 h-8 rounded-lg bg-mint/10 flex items-center justify-center mb-3">
              <Calendar className="w-4 h-4 text-mint" />
            </div>
            <h3 className="font-display text-xs font-semibold text-gray-light mb-1">
              Notice Tracking
            </h3>
            <p className="text-[10px] text-gray-text leading-relaxed">
              Set notice dates, auto-calculate last-day rent, and prepare handovers.
            </p>
          </div>
        </div>

        {/* Left info card - Desktop only */}
        <div
          ref={leftCardRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[18vw] min-w-[160px] max-w-[240px] h-[22vh] min-h-[140px] glass-card p-5 lg:p-6 hidden lg:flex flex-col justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-4">
            <Bed className="w-5 h-5 text-mint" />
          </div>
          <h3 className="font-display text-sm lg:text-base font-semibold text-gray-light mb-2">
            Bed Allocation
          </h3>
          <p className="text-xs text-gray-text leading-relaxed">
            Drag-and-drop assignment with occupancy rules.
          </p>
        </div>

        {/* Right info card - Desktop only */}
        <div
          ref={rightCardRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[18vw] min-w-[160px] max-w-[240px] h-[22vh] min-h-[140px] glass-card p-5 lg:p-6 hidden lg:flex flex-col justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5 text-mint" />
          </div>
          <h3 className="font-display text-sm lg:text-base font-semibold text-gray-light mb-2">
            Notice Tracking
          </h3>
          <p className="text-xs text-gray-text leading-relaxed">
            Set notice dates, auto-calculate last-day rent, and prepare handovers.
          </p>
        </div>

        {/* Main tenant card */}
        <div
          ref={mainCardRef}
          className="relative lg:absolute left-1/2 top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-[92vw] lg:w-[min(72vw,1080px)] h-[45vh] sm:h-[50vh] lg:h-[min(62vh,560px)] min-h-[280px] sm:min-h-[320px] glass-card overflow-hidden"
        >
          {/* Content overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 lg:p-10 z-10 bg-gradient-to-b from-navy/90 via-navy/70 to-transparent">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-light mb-3">
              Tenants, beds, and moves—handled.
            </h2>
            <p className="text-sm lg:text-base text-gray-text max-w-xl leading-relaxed">
              Onboard with KYC, assign beds, track notices, and close the loop when someone moves out.
            </p>
          </div>

          {/* Tenant list UI image */}
          <div className="absolute inset-0">
            <img
              src="/images/tenant_list_ui.jpg"
              alt="Tenant Management"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantSection;
