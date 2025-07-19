import { create } from "zustand";
import { LoginForm, RegisterForm, User } from "@/types/user";
import {
  userLogin,
  userLogout,
  userSignup,
  userDetails,
} from "@/services/ApiHandler";
import { useResponseMessage } from "./slice/message";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetching: boolean;

  login: (d: LoginForm) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (d: RegisterForm) => Promise<boolean>;
  loadUserDetails: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  fetching: false,

  login: async (payload) => {
    set({ fetching: true });
    const { success, message, data } = await userLogin(payload);

    if (success) {
      set({ user: data, isAuthenticated: true, fetching: false, loading: false });
    } else {
      useResponseMessage.getState().addMessage({
        title: message,
        severity: "error",
      });
      set({ user: null, isAuthenticated: false, fetching: false, loading: false });
    }
    return success;
  },

  logout: async () => {
    await userLogout();
    set({ user: null, isAuthenticated: false, loading: false });
  },

  signup: async (payload) => {
    set({ fetching: true });
    const { success, message } = await userSignup(payload);
    useResponseMessage.getState().addMessage({
      title: message,
      severity: success ? "success" : "error",
    });
    set({ user: null, isAuthenticated: false, fetching: false });
    return success;
  },

  loadUserDetails: async () => {
    set({ loading: true });
    const { success, data } = await userDetails();
    if (success) {
      set({ user: data, isAuthenticated: true, loading: false });
    } else {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));
