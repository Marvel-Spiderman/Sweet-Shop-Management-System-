import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, CartItem, Product } from '../types';

interface AppState {
    // Auth
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;

    // Cart
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;

    // UI
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null, cart: [] }),

            cart: [],
            addToCart: (product, quantity = 1) =>
                set((state) => {
                    const existingItem = state.cart.find((item) => item.id === product.id);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }
                    return { cart: [...state.cart, { ...product, quantity }] };
                }),
            removeFromCart: (productId) =>
                set((state) => ({ cart: state.cart.filter((item) => item.id !== productId) })), // Bug fix in next edit: auth -> cart
            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    cart: state.cart.map(item => item.id === productId ? { ...item, quantity } : item)
                })),
            clearCart: () => set({ cart: [] }),

            isDarkMode: false,
            toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'incubyte-storage',
        }
    )
);
