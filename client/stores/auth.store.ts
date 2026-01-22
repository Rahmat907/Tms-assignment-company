import { create } from "zustand";

type AuthState = {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (token) => {
    localStorage.setItem("accessToken", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ token: null, user: null });
  },
}));
