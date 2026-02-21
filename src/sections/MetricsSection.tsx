import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCw, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MetricsSectionProps {
  className?: string;
}

const MetricsSection = ({ className = '' }: MetricsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mainCard = mainCardRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !mainCard || !leftCard || !rightCard) return;

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

      // Main card entrance (0% - 30%) - from right
      scrollTl.fromTo(mainCard,
        { x: '100vw', opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      // Left card entrance (6% - 30%)
      scrollTl.fromTo(leftCard,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.06
      );

      // Right card entrance (10% - 30%)
      scrollTl.fromTo(rightCard,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Exit animations (70% - 100%)
      scrollTl.fromTo(mainCard,
        { x: 0, opacity: 1 },
        { x: '-100vw', opacity: 0, ease: 'power2.in' },
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
      id="metrics"
      className={`section-pinned bg-navy ${className}`}
    >
      <div className="stage-container">
        {/* Left info card */}
        <div
          ref={leftCardRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[18vw] min-w-[160px] max-w-[240px] h-[22vh] min-h-[140px] glass-card p-5 lg:p-6 hidden lg:flex flex-col justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-4">
            <RefreshCw className="w-5 h-5 text-mint" />
          </div>
          <h3 className="font-display text-sm lg:text-base font-semibold text-gray-light mb-2">
            Auto-Reconciliation
          </h3>
          <p className="text-xs text-gray-text leading-relaxed">
            Payments match invoices instantly. No spreadsheets.
          </p>
        </div>

        {/* Right info card */}
        <div
          ref={rightCardRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[18vw] min-w-[160px] max-w-[240px] h-[22vh] min-h-[140px] glass-card p-5 lg:p-6 hidden lg:flex flex-col justify-center"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center mb-4">
            <Bell className="w-5 h-5 text-mint" />
          </div>
          <h3 className="font-display text-sm lg:text-base font-semibold text-gray-light mb-2">
            Smart Alerts
          </h3>
          <p className="text-xs text-gray-text leading-relaxed">
            Get notified when dues cross thresholds or a notice is served.
          </p>
        </div>

        {/* Main metrics card */}
        <div
          ref={mainCardRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] lg:w-[min(72vw,1080px)] h-[50vh] lg:h-[min(60vh,540px)] glass-card overflow-hidden"
        >
          {/* Content overlay */}
          <div className="absolute top-0 left-0 right-0 p-6 lg:p-10 z-10 bg-gradient-to-b from-navy/90 via-navy/70 to-transparent">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-light mb-3">
              Metrics that move with you.
            </h2>
            <p className="text-sm lg:text-base text-gray-text max-w-xl leading-relaxed">
              Rent collected, dues, and notices—updated the moment a payment hits.
            </p>
          </div>

          {/* Metrics UI image */}
          <div className="absolute inset-0">
            <img
              src="/images/metrics_ui.jpg"
              alt="Real-time Metrics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;