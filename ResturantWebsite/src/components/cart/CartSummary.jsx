import { restaurant } from '../../config/restaurant';
import { formatPKR } from '../../utils/currency';
import { getCheckoutLinkProps, getTotals } from '../../utils/ordering';
import useCart from '../../hooks/useCart';
import Button from '../common/Button';

// showCheckoutButton={false} lets the checkout page reuse the totals block.
export default function CartSummary({ showCheckoutButton = true, onNavigate }) {
  const { subtotal, count } = useCart();
  const { delivery, total, remainingForFree } = getTotals(subtotal);
  const progress = Math.min(100, (subtotal / restaurant.freeDeliveryOver) * 100);
  const isDemo = restaurant.demoMode && !restaurant.externalOrderUrl;

  return (
    <div className="space-y-4">
      {count > 0 && (
        <div>
          <p className="mb-2 text-xs text-cream-dim">
            {remainingForFree > 0
              ? `Add ${formatPKR(remainingForFree)} more for free delivery`
              : 'You have unlocked free delivery'}
          </p>
          <div className="h-1.5 overflow-hidden rounded-full bg-char-600">
            <div
              className="h-full rounded-full bg-ember transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between text-cream-dim">
          <dt>Subtotal</dt>
          <dd>{formatPKR(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-cream-dim">
          <dt>Delivery</dt>
          <dd>{count === 0 ? '-' : delivery === 0 ? 'Free' : formatPKR(delivery)}</dd>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold text-cream">
          <dt>Total</dt>
          <dd>{formatPKR(total)}</dd>
        </div>
      </dl>

      {showCheckoutButton &&
        (count === 0 ? (
          <Button disabled size="lg" className="w-full">Checkout</Button>
        ) : (
          <Button {...getCheckoutLinkProps()} onClick={onNavigate} size="lg" className="w-full">
            Checkout
          </Button>
        ))}

      {isDemo && (
        <p className="text-center text-xs text-cream-mute">
          Demo checkout: no real order is placed and nothing is charged.
        </p>
      )}
    </div>
  );
}