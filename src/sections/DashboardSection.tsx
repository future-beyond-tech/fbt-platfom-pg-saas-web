import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users } from 'lucide-react';
import { prefersReducedMotion } from '../lib/prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface DashboardSectionProps {
  className?: string;
}

const DashboardSection = ({ className = '' }: DashboardSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mainCard = mainCardRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const content = contentRef.current;

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

      // Main card entrance (0% - 30%)
      scrollTl.fromTo(mainCard,
        { y: '110vh', scale: 0.86, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      // Left card entrance (5% - 30%)
      scrollTl.fromTo(leftCard,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Right card entrance (8% - 30%)
      scrollTl.fromTo(rightCard,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Content entrance (12% - 30%)
      if (content) {
        const headline = content.querySelector('h2');
        const body = content.querySelector('p');
        
        if (headline) {
          scrollTl.fromTo(headline,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.12
          );
        }
        if (body) {
          scrollTl.fromTo(body,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.18
          );
        }
      }

      // Exit animations (70% - 100%)
      scrollTl.fromTo(mainCard,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-90vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
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
      id="dashboard"
      className={`section-pinned bg-navy ${className}`}
    >
      <div className="stage-container flex flex-col lg:block justify-center lg:justify-start">
        {/* Mobile/Tablet: Info cards as a row above main card */}
        <div className="flex lg:hidden gap-3 sm:gap-4 mb-4 px-1">
          <div className="flex-1 glass-card p-3 sm:p-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-2 sm:mb-3">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
            </div>
            <h3 className="font-display text-xs sm:text-sm font-semibold text-gray-light mb-1">
              Multi-Property
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-text leading-relaxed line-clamp-2">
              Switch properties instantly.
            </p>
          </div>
          <div className="flex-1 glass-card p-3 sm:p-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-2 sm:mb-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-mint" />
            </div>
            <h3 className="font-display text-xs sm:text-sm font-semibold text-gray-light mb-1">
              Live Occupancy
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-text leading-relaxed line-clamp-2">
              Beds available, notices served.
            </p>
          </div>
        </div>

        {/* Left info card - Desktop only */}
        <div
          ref={leftCardRef}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-[18vw] min-w-[160px] max-w-[240px] h-[22vh] min-h-[140px] glass-card p-5 lg:p-6 flex-col justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-4">
            <Building2 className="w-5 h-5 text-mint" />
          </div>
          <h3 className="font-display text-sm lg:text-base font-semibold text-gray-light mb-2">
            Multi-Property
          </h3>
          <p className="text-xs text-gray-text leading-relaxed">
            Switch properties instantly. Tenant isolation is enforced at the data layer.
          </p>
        </div>

        {/* Right info card - Desktop only */}
        <div
          ref={rightCardRef}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[18vw] min-w-[160px] max-w-[240px] h-[22vh] min-h-[140px] glass-card p-5 lg:p-6 flex-col justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-mint" />
          </div>
          <h3 className="font-display text-sm lg:text-base font-semibold text-gray-light mb-2">
            Live Occupancy
          </h3>
          <p className="text-xs text-gray-text leading-relaxed">
            Beds available, notices served, and move-ins this week.
          </p>
        </div>

        {/* Main dashboard card */}
        <div
          ref={mainCardRef}
          className="relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 
                     w-full lg:w-[min(74vw,1100px)] 
                     h-[45vh] sm:h-[50vh] lg:h-[min(62vh,560px)] 
                     min-h-[280px] sm:min-h-[320px]
                     glass-card overflow-hidden"
        >
          {/* Content overlay */}
          <div
            ref={contentRef}
            className="absolute top-0 left-0 right-0 p-4 sm:p-6 lg:p-10 z-10 bg-gradient-to-b from-navy/90 via-navy/70 to-transparent"
          >
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-light mb-2 sm:mb-3">
              One dashboard. Every unit.
            </h2>
            <p className="text-sm lg:text-base text-gray-text max-w-xl leading-relaxed">
              See occupancy, rent status, and tenant requests across all properties—without switching contexts.
            </p>
          </div>

          {/* Dashboard UI image */}
          <div className="absolute inset-0">
            <img
              src="/images/dashboard_overview_ui.jpg"
              alt="Dashboard Overview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;