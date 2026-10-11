import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import useCart from '../../hooks/useCart';

export default function CartToast() {
  const { toast, dismissToast, openCart, isOpen } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(dismissToast, 2600);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4"
    >
      <AnimatePresence>
        {toast && !isOpen && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-char-700 py-2 pl-3 pr-2 shadow-2xl"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-leaf text-char">
              <Check size={16} strokeWidth={3} />
            </span>
            <span className="max-w-[40vw] truncate text-sm sm:max-w-xs">
              <b>{toast.name}</b> added
            </span>
            <button
              type="button"
              onClick={openCart}
              className="rounded-full bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-char transition hover:bg-ember-glow"
            >
              View bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}