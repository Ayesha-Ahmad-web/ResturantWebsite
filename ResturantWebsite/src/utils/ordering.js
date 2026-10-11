import { restaurant } from '../config/restaurant';

// Totals used by the cart drawer and the checkout page.
export function getTotals(subtotal) {
  const delivery =
    subtotal <= 0 ? 0 : subtotal >= restaurant.freeDeliveryOver ? 0 : restaurant.deliveryFee;
  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
    remainingForFree: Math.max(0, restaurant.freeDeliveryOver - subtotal),
  };
}

// "Order now" buttons: external link if configured, otherwise the demo menu page.
export function getOrderLinkProps() {
  return restaurant.externalOrderUrl ? { href: restaurant.externalOrderUrl } : { to: '/menu' };
}

// Cart "Checkout" button: external link if configured, otherwise the demo checkout page.
export function getCheckoutLinkProps() {
  return restaurant.externalOrderUrl ? { href: restaurant.externalOrderUrl } : { to: '/checkout' };
}