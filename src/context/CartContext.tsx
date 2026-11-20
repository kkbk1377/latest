import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductItem } from '../types.ts';

export interface CartEntry {
  product: ProductItem;
  quantity: number;
}

const CART_STORAGE_KEY = 'trinetra_store_cart_v1';

interface CartContextValue {
  items: CartEntry[];
  drawerOpen: boolean;
  totalCount: number;
  subtotalInr: number;
  lastAddedName: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (product: ProductItem, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartEntry[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  const addToCart = useCallback((product: ProductItem, quantity = 1) => {
    if (product.priceInr === null || product.availability === 'Out of Stock') return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { product, quantity: Math.min(200, i.quantity + quantity) }
            : i,
        );
      }
      return [...prev, { product, quantity: Math.max(1, quantity) }];
    });
    setLastAddedName(product.name);
    setTimeout(() => setLastAddedName(null), 2600);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.min(200, quantity) } : i,
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalInr = items.reduce(
    (sum, i) => sum + (i.product.priceInr ?? 0) * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        drawerOpen,
        totalCount,
        subtotalInr,
        lastAddedName,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
}
