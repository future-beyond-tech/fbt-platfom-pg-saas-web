import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import DashboardSection from './sections/DashboardSection';
import MetricsSection from './sections/MetricsSection';
import TenantSection from './sections/TenantSection';
import FinanceSection from './sections/FinanceSection';
import PowerSection from './sections/PowerSection';
import SecuritySection from './sections/SecuritySection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-navy">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Background glow */}
      <div className="fixed inset-0 bg-glow pointer-events-none" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <DashboardSection className="z-20" />
        <MetricsSection className="z-30" />
        <TenantSection className="z-40" />
        <FinanceSection className="z-50" />
        <PowerSection className="z-[60]" />
        <SecuritySection className="z-[70]" />
        <PricingSection className="z-[80]" />
        <ContactSection className="z-[90]" />
      </main>
    </div>
  );
}

export default App;