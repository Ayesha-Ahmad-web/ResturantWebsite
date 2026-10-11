import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SafeImage from '../common/SafeImage';
import useCart from '../../hooks/useCart';
import { formatPKR } from '../../utils/currency';

const MAX_QTY = 20;

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 rounded-2xl bg-char-700 p-3"
    >
      <SafeImage
        src={item.image}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-xl"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-bold text-cream">{item.name}</p>
            {item.note && <p className="mt-0.5 line-clamp-2 text-xs text-cream-mute">{item.note}</p>}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 rounded-full p-1.5 text-cream-mute transition hover:bg-white/10 hover:text-ember"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-char-800 p-1">
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty - 1)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="grid h-7 w-7 place-items-center rounded-full text-cream transition hover:bg-white/10"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-bold" aria-live="polite">{item.qty}</span>
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty + 1)}
              disabled={item.qty >= MAX_QTY}
              aria-label={`Increase quantity of ${item.name}`}
              className="grid h-7 w-7 place-items-center rounded-full text-cream transition hover:bg-white/10 disabled:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="font-bold text-cream">{formatPKR(item.price * item.qty)}</p>
        </div>
      </div>
    </motion.li>
  );
}