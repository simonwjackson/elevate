import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: { id: number } | null;
  setUser: (user: { id: number }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) =>
        set((state) => ({
          ...state,
          user,
        })),
    }),
    {
      name: "user-storage",
    },
  ),
);
