import { StateCreator } from 'zustand';
import { createResponseMessage } from './slice/message';
import { LoginForm, LoginRes } from '@/types/user';

const useResponseMessage = createResponseMessage.getState();

interface IUserStore {
  fetching: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  user: Partial<LoginRes> | null;
  login: (d: LoginForm) => void;
  logout: () => void;
  loadUserDetails: () => void;
}

async function userLogin(d: any) {
  // TODO  add handler
  return { data: {}, success: !true, message: "" }
}
async function userLogout() {
  // TODO  add handler
  return { data: {}, success: true, message: "" }

}
async function userDetail() {
  // TODO  add handler
  return { data: {}, success: true, message: "" }

}
const createUserStore: StateCreator<IUserStore> = (set, get) => ({
  isAuthenticated: false,
  loading: true,
  user: null,
  fetching: false,
  login: async (d) => {
    set({ fetching: true });
    let { data, message, success } = (await userLogin(d));

    if (success) {
      set(() => ({
        user: data,
        isAuthenticated: true,
        fetching: false,
      }));
    } else {
      useResponseMessage.addMessage({
        title: 'Login Failed',
        severity: 'error',
      });
      set(() => ({
        user: null,
        isAuthenticated: false,
        fetching: false,
      }));
    }
  },
  logout: async () => {
    const { success } = (await userLogout());
    if (success) {
      set((s) => ({ user: null, isAuthenticated: false }));
    }
  },
  loadUserDetails: async () => {
    const { success, data } = (await userDetail());

    if (success) {
      set(() => ({
        user: data,
        isAuthenticated: true,
        loading: false,
      }));
    } else {
      get().logout();
      set(() => ({ user: null, isAuthenticated: false, loading: false }));
    }
  },
});

export { createUserStore };
export type { IUserStore };
