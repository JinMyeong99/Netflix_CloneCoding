import { create } from "zustand";

const useLoginStore = create((set) => ({
  user: null,
  isLogin: false,
  setUser: (user) => set({ user, isLogin: !!user }),
  logout: () => set({ user: null, isLogin: false }),
}));

export default useLoginStore;
