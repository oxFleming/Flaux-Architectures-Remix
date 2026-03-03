import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isSamePage = location.pathname === '/' || (href.startsWith('/') && location.pathname === href.split('#')[0]);
    const hash = href.includes('#') ? '#' + href.split('#')[1] : (href.startsWith('#') ? href : null);

    if (isSamePage && hash) {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Studio', href: '/#studio' },
    { name: 'Team', href: '/#team' },
    { name: 'Portfolio', href: '/#projects' },
    { name: 'Inquiry', href: '/#inquiry' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md py-4 border-b border-black/5 text-black' 
            : 'bg-transparent py-8 text-white'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className={`text-xl md:text-2xl font-sans font-extrabold tracking-tighter z-50 relative ${isMobileMenuOpen ? 'text-black' : ''}`}>
            FLAUX ARCHITECTURES.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e as any, link.href)}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                  isScrolled ? 'hover:text-flaux-red' : 'hover:text-flaux-red'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden z-50 relative ${isMobileMenuOpen ? 'text-black' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e as any, link.href)}
                className="text-4xl font-serif text-black hover:text-flaux-red transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;