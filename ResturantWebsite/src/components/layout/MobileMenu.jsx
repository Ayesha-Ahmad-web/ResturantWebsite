import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, restaurant } from '../../config/restaurant';
import { getOrderLinkProps } from '../../utils/ordering';
import Button from '../common/Button';

const LINKS = [...restaurant.navLinks, { label: 'Full Menu', to: '/menu' }];
const CLOSED = 'circle(0% at 90% 4%)';
const OPEN = 'circle(150% at 90% 4%)';

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[55] flex flex-col bg-char px-6 pb-8 pt-28 md:hidden"
          initial={{ clipPath: CLOSED }}
          animate={{ clipPath: OPEN }}
          exit={{ clipPath: CLOSED }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul className="flex flex-1 flex-col justify-center gap-2">
            {LINKS.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 border-b border-white/5 py-3"
                >
                  <span className="text-xs font-bold text-ember">0{i + 1}</span>
                  <span className="display-md transition-colors group-hover:text-ember">{link.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button {...getOrderLinkProps()} onClick={onClose} size="lg" className="w-full">
              Order now
            </Button>
            <div className="flex items-center justify-between text-cream-dim">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-cream"
              >
                <MessageCircle size={18} /> WhatsApp us
              </a>
              <div className="flex gap-4">
                <a href={restaurant.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-cream">
                  <Instagram size={20} />
                </a>
                <a href={restaurant.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-cream">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}