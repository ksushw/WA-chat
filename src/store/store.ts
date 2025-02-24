
import StoreState from '@/api/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentChatPhone: null,
      messages: {}, // Сообщения группируются по номерам телефонов

      // Устанавливаем текущий чат по номеру телефона
      setCurrentChat: (phone) => set({ currentChatPhone: phone }),

      setMessages: (phone, newMessages) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [phone]: newMessages, // Полностью заменяем сообщения
          },
        })),

      addMessage: (message) => {
        const phone = get().currentChatPhone;
        if (!phone) return; 

        set((state) => ({
          messages: {
            ...state.messages,
            [phone]: [...(state.messages[phone] || []), message], 
          },
        }));
      },

      deleteMessage: (idMessage) => {
        const phone = get().currentChatPhone;
        if (!phone) return;

        set((state) => ({
          messages: {
            ...state.messages,
            [phone]: state.messages[phone].map((msg) =>
              msg.idMessage === idMessage ? { ...msg, isDeleted: true } : msg
            ),
          },
        }));
          },
      
          resetChat: () => set({ currentChatPhone: null, messages: {} }),

     
    }),
    { name: 'chat-messages-storage' }
  )
);
