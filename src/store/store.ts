
import StoreState from '@/api/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentChatPhone: null,
      messages: {}, 
      setCurrentChat: (phone) => set({ currentChatPhone: phone }),

      setMessages: (phone, newMessages) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [phone]: newMessages,
          },
        })),

        addMessage: (message) => {
          const phone = get().currentChatPhone;
          if (!phone) return;
        
          set((state) => {
            const existingMessages = state.messages[phone] || [];
        
            // Проверяем, есть ли уже сообщение с таким idMessage
            const isDuplicate = existingMessages.some((msg) => msg.idMessage === message.idMessage);
            if (isDuplicate) return state; // Если дубликат найден, ничего не меняем
        
            return {
              messages: {
                ...state.messages,
                [phone]: [...existingMessages, message], // Добавляем только уникальные
              },
            };
          });
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
