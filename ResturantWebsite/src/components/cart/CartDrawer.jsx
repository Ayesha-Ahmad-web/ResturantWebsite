import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import useCart from '../../hooks/useCart';
import Button from '../common/Button';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartDrawer() {
  const { items, count, isOpen, closeCart, clear } = useCart();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[76] flex h-[100dvh] w-full max-w-md flex-col border-l border-white/10 bg-char-800 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <h2 className="font-display text-2xl uppercase tracking-tight">
                Your bag <span className="text-ember">({count})</span>
              </h2>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cream-mute transition hover:text-ember"
                  >
                    Clear
                  </button>
                )}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream transition hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-char-700 text-cream-mute">
                  <ShoppingBag size={34} />
                </span>
                <div>
                  <p className="font-display text-2xl uppercase">Your bag is empty</p>
                  <p className="mt-1 text-sm text-cream-dim">Pick a burger and let's get stacking.</p>
                </div>
                <Button to="/menu" onClick={closeCart}>Browse burgers</Button>
              </div>
            ) : (
              <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-5">
                <CartSummary onNavigate={closeCart} />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}