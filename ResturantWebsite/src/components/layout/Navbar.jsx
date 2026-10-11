import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';
import { restaurant } from '../../config/restaurant';
import { getOrderLinkProps } from '../../utils/ordering';
import useCart from '../../hooks/useCart';
import Button from '../common/Button';
import Logo from '../common/Logo';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const solid = scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          solid ? 'border-b border-white/5 bg-char/80 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Logo onClick={closeMenu} />

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {restaurant.navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to} 
                // onClick={open.tolink.to.startsWith('#')}
                className="group relative text-sm font-medium text-cream-dim transition-colors hover:text-cream"
              >
                {link.label} 
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-ember transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-char-700/70 text-cream transition hover:bg-char-600"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-char"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <Button {...getOrderLinkProps()} size="sm" className="hidden sm:inline-flex">
              Order now
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-char-700/70 text-cream md:hidden"
            >
              {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sibling of <header>, not a child: backdrop-filter would trap a fixed child. */}
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}