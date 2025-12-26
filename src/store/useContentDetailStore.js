import { create } from "zustand";

const useContentDetailStore = create((set) => ({
  content: null,
  isOpen: false,
  open: (content) => {
    if (!content) return;
    set({ content, isOpen: true });
  },
  close: () => set({ content: null, isOpen: false }),
}));

export default useContentDetailStore;
