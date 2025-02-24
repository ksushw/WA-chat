
// import { ChatMessage } from '@/types/greenApi';

type MessageType = 'incoming' | 'outgoing';
  
export interface Message {
  chatId: string;
  idMessage: string;
  isDeleted: boolean;
  isEdited: boolean;
  senderContactName: string;
  senderId: string;
  senderName: string;
  textMessage: string;
  timestamp: number;
  type: MessageType;
}

export default interface StoreState {
  currentChatPhone: string | null; 
  messages: Record<string, Message[]>; 
  setCurrentChat: (phone: string) => void;
  setMessages: (phone: string, newMessages: Message[]) => void;
  addMessage: (message: Message) => void;
    deleteMessage: (idMessage: string) => void;
    resetChat: () => void;
}

