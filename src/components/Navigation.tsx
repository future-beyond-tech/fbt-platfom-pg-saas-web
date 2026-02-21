import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-navy/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl lg:text-2xl font-bold text-gray-light tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            FBT
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-sm"
            >
              Request Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('dashboard')}
              className="block w-full text-left text-gray-text hover:text-gray-light transition-colors py-2"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left text-gray-text hover:text-gray-light transition-colors py-2"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-text hover:text-gray-light transition-colors py-2"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary w-full text-center"
            >
              Request Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;