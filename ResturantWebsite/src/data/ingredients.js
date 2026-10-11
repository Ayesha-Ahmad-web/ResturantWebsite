// Burger builder options. Prices in PKR. `color` drives the live preview layers.
export const builderOptions = {
  basePrice: 690, // bun + one patty + basic prep

  buns: [
    { id: 'brioche', label: 'Brioche', price: 0, color: '#E0A24A' },
    { id: 'sesame', label: 'Sesame', price: 0, color: '#D9963A' },
    { id: 'potato', label: 'Potato', price: 40, color: '#EBB660' },
    { id: 'charcoal', label: 'Charcoal', price: 80, color: '#2B2622' },
  ],

  patties: [
    { id: 'single', label: 'Single', price: 0, count: 1 },
    { id: 'double', label: 'Double', price: 480, count: 2 },
  ],

  cheeses: [
    { id: 'none', label: 'No cheese', price: 0, color: null },
    { id: 'cheddar', label: 'Cheddar', price: 120, color: '#F2A91E' },
    { id: 'pepper-jack', label: 'Pepper-jack', price: 140, color: '#F6C453' },
    { id: 'swiss', label: 'Swiss', price: 150, color: '#F3DE9A' },
  ],

  extras: [
    { id: 'lettuce', label: 'Lettuce', price: 0, color: '#6FB33C' },
    { id: 'tomato', label: 'Tomato', price: 40, color: '#E0412B' },
    { id: 'pickles', label: 'Pickles', price: 30, color: '#7C9A2D' },
  ],

  sauces: [
    { id: 'stackd', label: "STACK'D sauce", price: 40, color: '#E87B3A' },
    { id: 'bbq', label: 'Hickory BBQ', price: 40, color: '#6B2D17' },
    { id: 'chilli-mayo', label: 'Chilli mayo', price: 40, color: '#F0623A' },
    { id: 'garlic', label: 'Garlic aioli', price: 40, color: '#F2E6C9' },
    { id: 'mustard', label: 'Honey mustard', price: 40, color: '#E3B82C' },
  ],
  maxSauces: 3,
};

export const defaultBuild = {
  bun: 'brioche',
  patty: 'single',
  cheese: 'cheddar',
  extras: ['lettuce', 'tomato'],
  sauces: ['stackd'],
};

export function calculateBuildPrice(build) {
  const o = builderOptions;
  const bun = o.buns.find((b) => b.id === build.bun);
  const patty = o.patties.find((p) => p.id === build.patty);
  const cheese = o.cheeses.find((c) => c.id === build.cheese);
  const extras = o.extras.filter((e) => build.extras.includes(e.id));
  const sauces = o.sauces.filter((s) => build.sauces.includes(s.id));
  return (
    o.basePrice +
    (bun?.price || 0) +
    (patty?.price || 0) +
    (cheese?.price || 0) +
    extras.reduce((sum, e) => sum + e.price, 0) +
    sauces.reduce((sum, s) => sum + s.price, 0)
  );
}

export function describeBuild(build) {
  const o = builderOptions;
  const parts = [
    o.buns.find((b) => b.id === build.bun)?.label + ' bun',
    o.patties.find((p) => p.id === build.patty)?.label + ' patty',
  ];
  const cheese = o.cheeses.find((c) => c.id === build.cheese);
  if (cheese && cheese.id !== 'none') parts.push(cheese.label);
  o.extras.filter((e) => build.extras.includes(e.id)).forEach((e) => parts.push(e.label));
  o.sauces.filter((s) => build.sauces.includes(s.id)).forEach((s) => parts.push(s.label));
  return parts.join(', ');
}
