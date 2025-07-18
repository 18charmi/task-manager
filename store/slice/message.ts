import { AlertColor } from '@mui/material';
import { create } from 'zustand';

interface IResponseMessage {
  id: number;
  title: string;
  severity?: AlertColor;
}

interface IResponseMessageStore {
  message: [] | IResponseMessage[];
  addMessage: (d: Pick<IResponseMessage, 'title' | 'severity'>) => void;
  removeMessage: (d: number) => void;
}

const createResponseMessage = create<IResponseMessageStore>()((set, get) => ({
  message: [],
  addMessage: (msg) => {
    set((state) => {
      const newId = state.message.length + 1;
      return { message: [...state.message, { ...msg, id: newId }] };
    });
  },
  removeMessage: (id) =>
    set((state) => {
      let messageIndex = state.message.findIndex((m) => m.id === id);
      return messageIndex !== -1
        ? {
            message: [
              ...state.message.splice(0, messageIndex),
              ...state.message.splice(messageIndex + 1),
            ],
          }
        : state;
    }),
}));

export { createResponseMessage };
