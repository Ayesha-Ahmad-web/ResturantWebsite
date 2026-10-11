import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { loadJSON, saveJSON } from '../utils/storage';

const STORAGE_KEY = 'stackd-cart-v1';
const MAX_QTY = 20;

export const CartContext = createContext(null);

function sanitize(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((i) => i && typeof i.id === 'string' && typeof i.name === 'string' && Number.isFinite(i.price) && Number.isFinite(i.qty) && i.qty > 0)
    .map((i) => ({ ...i, qty: Math.min(Math.floor(i.qty), MAX_QTY) }));
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item, qty } = action;
      const exists = state.find((i) => i.id === item.id);
      if (exists) {
        return state.map((i) => (i.id === item.id ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i));
      }
      return [...state, { ...item, qty: Math.min(qty, MAX_QTY) }];
    }
    case 'SET_QTY': {
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => (i.id === action.id ? { ...i, qty: Math.min(action.qty, MAX_QTY) } : i));
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], () => sanitize(loadJSON(STORAGE_KEY, [])));
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveJSON(STORAGE_KEY, items);
  }, [items]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const next = sanitize(loadJSON(STORAGE_KEY, []));
        dispatch({ type: 'CLEAR' });
        next.forEach((item) => dispatch({ type: 'ADD', item, qty: item.qty }));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // item: { id, name, price, image?, note? }
  const addItem = useCallback((item, qty = 1, { openDrawer = false } = {}) => {
    dispatch({ type: 'ADD', item, qty });
    setToast({ id: Date.now(), name: item.name });
    if (openDrawer) setIsOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => dispatch({ type: 'SET_QTY', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, setQty, removeItem, clear, isOpen, openCart, closeCart, toast, dismissToast }),
    [items, count, subtotal, addItem, setQty, removeItem, clear, isOpen, openCart, closeCart, toast, dismissToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}