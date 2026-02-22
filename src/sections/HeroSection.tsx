import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { prefersReducedMotion } from '../lib/prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heroCard = heroCardRef.current;
    const satellites = satelliteRefs.current.filter(Boolean);
    const headline = headlineRef.current;

    if (!section || !heroCard || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Satellite cards entrance
      satellites.forEach((sat, i) => {
        if (!sat) return;
        const directions = [
          { x: -100, y: -50 },
          { x: 100, y: -30 },
          { x: -80, y: 80 },
          { x: 100, y: 60 },
          { x: -60, y: 100 },
          { x: 80, y: 100 },
          { x: -120, y: 20 },
          { x: 120, y: 40 },
        ];
        const dir = directions[i % directions.length];
        
        gsap.set(sat, { 
          x: dir.x, 
          y: dir.y, 
          opacity: 0,
          scale: 0.9 
        });
        
        loadTl.to(sat, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        }, i * 0.06);
      });

      // Hero card entrance
      gsap.set(heroCard, { scale: 0.92, opacity: 0 });
      loadTl.to(heroCard, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.2);

      // Headline word reveal
      if (headline) {
        const words = headline.querySelectorAll('.word');
        gsap.set(words, { y: 18, opacity: 0 });
        loadTl.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
        }, 0.5);
      }

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set(heroCard, { x: 0, opacity: 1, scale: 1 });
            satellites.forEach(sat => {
              if (sat) gsap.set(sat, { x: 0, y: 0, opacity: 1 });
            });
          }
        }
      });

      // Exit animations (70% - 100%)
      scrollTl.fromTo(heroCard,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      satellites.forEach((sat, i) => {
        if (!sat) return;
        const exitDirs = [
          { x: -150, y: -80 },
          { x: 150, y: -60 },
          { x: -120, y: 120 },
          { x: 140, y: 100 },
          { x: -100, y: 150 },
          { x: 120, y: 140 },
          { x: -180, y: 40 },
          { x: 180, y: 60 },
        ];
        const dir = exitDirs[i % exitDirs.length];
        
        scrollTl.fromTo(sat,
          { x: 0, y: 0, opacity: 1 },
          { x: dir.x, y: dir.y, opacity: 0, ease: 'power2.in' },
          0.7 + i * 0.02
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const satellitePositions = [
    { left: '4%', top: '10%', width: '100px', height: '70px', delay: 0, mobile: true },
    { left: '78%', top: '12%', width: '90px', height: '65px', delay: 0.5, mobile: true },
    { left: '2%', top: '72%', width: '110px', height: '75px', delay: 1, mobile: true },
    { left: '80%', top: '70%', width: '95px', height: '65px', delay: 1.5, mobile: true },
    { left: '12%', top: '88%', width: '85px', height: '55px', delay: 2, mobile: false },
    { left: '68%', top: '90%', width: '80px', height: '50px', delay: 2.5, mobile: false },
    { left: '2%', top: '35%', width: '70px', height: '50px', delay: 3, mobile: false },
    { left: '88%', top: '40%', width: '75px', height: '55px', delay: 3.5, mobile: false },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-navy ${className}`}
    >
      {/* Satellite cards - responsive visibility */}
      {satellitePositions.map((pos, i) => (
        <div
          key={i}
          ref={el => { satelliteRefs.current[i] = el; }}
          className={`absolute ${pos.mobile ? 'block' : 'hidden md:block'}`}
          style={{
            left: pos.left,
            top: pos.top,
            width: pos.width,
            height: pos.height,
            animationDelay: `${pos.delay}s`,
          }}
        >
          <div className="relative w-full h-full glass-card animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-mint/5 to-transparent" />
          </div>
        </div>
      ))}

      {/* Hero card */}
      <div
        ref={heroCardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[92vw] max-w-[520px] sm:max-w-[600px] lg:max-w-[760px]
                   min-h-[320px] sm:min-h-[280px] lg:min-h-[260px]
                   glass-card neon-border flex flex-col justify-center 
                   p-6 sm:p-8 lg:p-12"
      >
        <div className="relative z-10">
          <h1
            ref={headlineRef}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-light leading-tight mb-3 sm:mb-4 lg:mb-6"
          >
            <span className="word inline-block">Modular</span>{' '}
            <span className="word inline-block">Living.</span>
            <br className="hidden sm:block" />
            <span className="word inline-block text-mint">Unified</span>{' '}
            <span className="word inline-block text-mint">Control.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-gray-text max-w-md lg:max-w-lg mb-5 sm:mb-6 lg:mb-8 leading-relaxed">
            A multi-tenant platform for PG owners—rooms, tenants, billing, and compliance in one system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Request Demo
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              View Pricing
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Background UI image */}
        <div className="absolute inset-0 opacity-15 sm:opacity-20 pointer-events-none">
          <img
            src="/images/hero_dashboard_ui.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;