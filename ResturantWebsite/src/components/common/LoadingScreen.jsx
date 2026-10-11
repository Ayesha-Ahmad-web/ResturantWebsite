import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { ScrollTrigger } from '../../animations/gsapConfig';

const KEY = 'stackd-intro-seen';

function alreadySeen() {
  try {
    return window.sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

// Short branded intro: once per session, under 1.5s, skippable (button or Escape).
export default function LoadingScreen() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => !alreadySeen());

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked: fine */
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(finish, reduced ? 400 : 1400);
    const onKey = (e) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible, finish, reduced]);

  return (
    <AnimatePresence onExitComplete={() => ScrollTrigger.refresh()}>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading STACK'D BURGER"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-char"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: reduced ? 0.01 : 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="px-6 text-center">
            <p className="font-display text-5xl uppercase leading-none text-cream sm:text-7xl">
              STACK'D<span className="text-ember"> BURGER</span>
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-cream-mute">
              Heating the grill
            </p>
            <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-char-600">
              <motion.div
                className="h-full origin-left bg-ember"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0.3 : 1.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={finish}
            className="absolute bottom-8 text-xs font-bold uppercase tracking-widest text-cream-mute transition hover:text-cream"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}