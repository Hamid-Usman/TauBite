import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [], // Array to store the cart items

  addToCart: (item) => set((state) => {
    const itemExists = state.cart.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };
    } else {
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  })),

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () => set((state) => {
    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalPrice: total };
  }),

  loading: false,
  setLoading: (status) => set({ loading: status }),
}));

export default useCartStore;
