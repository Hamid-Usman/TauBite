import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  modalData: null,
  openModal: (data) => set({ isOpen: true, modalData: data }),
  closeModal: () => set({ isOpen: false, modalData: null }),
}));