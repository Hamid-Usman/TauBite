import { create } from 'zustand'

const useCartStore = create((set) => ({
    cart: [],
    total: 0,

    addToCart: (item) =>
        set((state) => {
        const existing = state.cart.find((i) => i.id === item.id)
        if (existing) {
            return {
            cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            total: state.total + item.price,
            }
        }
        return {
            cart: [...state.cart, { ...item, quantity: 1 }],
            total: state.total + item.price,
        }
    }),

    removeFromCart: (id) =>
        set((state) => {
        const item = state.cart.find((i) => i.id === id)
        if (!item) return state
        return {
            cart: state.cart.filter((i) => i.id !== id),
            total: state.total - item.price * item.quantity,
        }
        }),

    increaseQty: (id) =>
        set((state) => {
            const item = state.cart.find((i) => i.id === id)
            if (!item) return state
            return {
                cart: state.cart.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                ),
                total: state.total + item.price,
            }
        }),

    decreaseQty: (id) =>
        set((state) => {
        const item = state.cart.find((i) => i.id === id)
        if (!item) return state
        if (item.quantity === 1) {
            return {
            cart: state.cart.filter((i) => i.id !== id),
            total: state.total - item.price,
            }
        }
        return {
            cart: state.cart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
            total: state.total - item.price,
        }
        }),

    clearCart: () => set({ cart: [], total: 0 }),
}))

export default useCartStore
