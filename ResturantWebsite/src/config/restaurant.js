// Central place for contact details, ordering links, navigation and the combo offer.
// Edit values here (or via .env) instead of hunting through components.

const env = import.meta.env;

export const restaurant = {
  name: "STACK'D BURGER",
  tagline: 'Built different. Bites better.',
  statement: 'Real ingredients. Big flavor. Zero compromises.',

  // Checkout is a DEMO unless externalOrderUrl is set.
  demoMode: true,
  externalOrderUrl: env.VITE_EXTERNAL_ORDER_URL || '',

  currency: { code: 'PKR', symbol: 'Rs.' },
  deliveryFee: 150,
  freeDeliveryOver: 3000,

  // PLACEHOLDER contact details: replace with real ones.
  phone: '+92 300 0000000',
  email: 'hello@stackdburger.example',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER || '923000000000',
  address: {
    line1: '123 Placeholder Street',
    line2: 'Your City, Pakistan',
  },
  hours: [
    { days: 'Mon – Thu', time: '12:00 PM – 12:00 AM' },
    { days: 'Fri – Sat', time: '12:00 PM – 2:00 AM' },
    { days: 'Sunday', time: '1:00 PM – 12:00 AM' },
  ],
  mapsEmbedUrl: env.VITE_MAPS_EMBED_URL || '',

  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    tiktok: 'https://tiktok.com/',
  },

  navLinks: [
    { label: 'Home', to: '/#home' },
    { label: 'Our Burgers', to: '/#burgers' },
    { label: 'Our Story', to: '/#story' },
    { label: 'Locations', to: '/#locations' },
  ],

  // Genuine configured offer. The countdown only renders when endsAt is a valid
  // future ISO date string (e.g. '2026-12-31T23:59:00+05:00'). Leave null for no timer.
  offer: {
    id: 'offer-stack-combo',
    name: 'The Stack Combo',
    description: 'Double Trouble burger + loaded fries + a chilled drink.',
    includes: ['Double Trouble burger', 'Loaded fries', 'Chilled drink (330ml)'],
    price: 1990,
    originalPrice: 2490,
    image: '/images/burgers/combo.webp',
    endsAt: null,
  },
};

export function getWhatsAppLink(message = "Hi STACK'D BURGER! I'd like to place an order.") {
  const number = String(restaurant.whatsappNumber).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}