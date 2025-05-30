import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  activeOrderId: null,
  setOrders: (orders) => set({ orders }),
  setActiveOrder: (id) => set({ activeOrderId: id }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      ),
    })),
}));