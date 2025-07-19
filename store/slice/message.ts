import { AlertColor } from '@mui/material';
import { create } from 'zustand';

interface IResponseMessage {
  id: number;
  title: string;
  severity?: AlertColor;
}

interface IResponseMessageStore {
  message: IResponseMessage[];
  addMessage: (d: Pick<IResponseMessage, 'title' | 'severity'>) => void;
  removeMessage: (id: number) => void;
}

export const useResponseMessage = create<IResponseMessageStore>((set) => ({
  message: [],
  addMessage: (msg) =>
    set((state) => ({
      message: [
        ...state.message,
        {
          ...msg,
          id: Date.now(),
        },
      ],
    })),
  removeMessage: (id) =>
    set((state) => ({
      message: state.message.filter((m) => m.id !== id),
    })),
}));
