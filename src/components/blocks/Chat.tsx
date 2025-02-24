import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { sendMessage, receveMessage, getMessages } from '@/api/greenApi';
import { ChatMessage } from '@/types/greenApi';
import { PaperPlaneIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useStore } from '@/store/store';
import { createSoundPlayer } from '@/utils/notificationSound';

export default function Chat({ prevStep }: { prevStep: () => void }) {
  const state = useStore();
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const chatId = `${state.currentChatPhone}@c.us`;

  const playNotificationSound = createSoundPlayer(
    '/audio/multi-pop-2-188167.mp3'
  );

  // Отправка сообщений
  const handleSend = async () => {
    if (!message.trim()) return;
    console.log(message);
    const idMessage = await sendMessage(chatId, message);
    if (idMessage) {
      state.addMessage({
        chatId,
        idMessage: idMessage,
        isDeleted: false,
        isEdited: false,
        senderContactName: '',
        senderId: 'string',
        senderName: 'Я',
        textMessage: message,
        timestamp: 12,
        type: 'outgoing',
      });
      playNotificationSound();
    }
    setMessage('');
  };

  // загрузка всех сообщений
  const fetchMessages = useCallback(async () => {
    try {
      const fetchedMessages: ChatMessage[] = await getMessages(chatId);

      if (!Array.isArray(fetchedMessages) || fetchedMessages.length === 0) {
        console.warn('Ошибка получения сообщений');
        return;
      }

      if (!state.currentChatPhone) return;

      const filteredMessages = fetchedMessages
        .filter(
          (msg) =>
            (msg.typeMessage === 'textMessage' || msg.typeMessage === 'extendedTextMessage') &&
            msg.textMessage.trim() !== ''
        )
        .reverse(); 
      
      state.setMessages(state.currentChatPhone, filteredMessages);
    } catch (error) {
      console.error('Ошибка при загрузке сообщений:', error);
    }
  }, [chatId, state])

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    let isMounted = true;

    const fetchNotifies = async () => {
      while (isMounted) {
        try {
          const newNotifys = await receveMessage();
          if (newNotifys?.body?.messageData?.textMessageData?.textMessage) {
            state.addMessage({
              chatId,
              idMessage: newNotifys.body.idMessage,
              isDeleted: false,
              isEdited: false,
              senderContactName: '',
              senderId: newNotifys.body.idMessage,
              senderName: newNotifys.body.senderData.senderName,
              textMessage:
                newNotifys.body.messageData.textMessageData.textMessage,
              timestamp: newNotifys.body.timestamp,
              type:
                newNotifys.body.senderData.sender === '79234303369@c.us'
                  ? 'outgoing'
                  : 'incoming',
            });
            playNotificationSound();
          }
        } catch (error) {
          console.error('Ошибка при получении сообщения:', error);
        }
      }
    };

    fetchNotifies();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, playNotificationSound]);

  // Плавное появление сообщений
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  return (
    <div className="flex flex-col h-[100%] w-[100%] max-w-[1200px] mx-auto mb-5 mt-5 bg-gray-100 border rounded-xl shadow-lg overflow-hidden shadow-lg shadow-neutral-500/50">
      {/* Шапка */}
      <div className="bg-green-600 text-white p-4 text-lg font-semibold flex items-center">
        <button
          className="mr-3 p-1 rounded-full hover:bg-green-700 transition"
          onClick={() => {
            prevStep();
            state.resetChat();
          }}>
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        Чат
      </div>

      <div className="flex-1 h-[100%] overflow-y-hidden space-y-2 bg-white bg-[url('/images/background.webp')] bg-opacity-50 bg-cover bg-center">
        <ScrollArea className="h-[100%] w-[100%] flex-1 space-y-2 rounded-md p-4 overflow-y-auto bg-stone-50 bg-opacity-90">
          {(state.messages[state.currentChatPhone || ''] || []).map((msg) => (
            <motion.div
              key={msg.idMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg max-w-[75%] w-fit text-sm shadow-md ${
                msg.type === 'outgoing'
                  ? 'bg-green-500 text-white self-end ml-auto rounded-br-none'
                  : 'bg-gray-200 text-gray-900 self-start rounded-bl-none'
              }`}>
              <div
                className={`text-xs font-semibold mb-1 ${
                  msg.type === 'outgoing' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {msg.senderName ? msg.senderName : 'Я'}
              </div>
              {msg.textMessage}
            </motion.div>
          ))}
          <div ref={chatRef} />
        </ScrollArea>
      </div>

      {/* Поле ввода */}
      <div className="bg-gray-200 flex items-center gap-2 p-3 border-t">
        <Input
          type="text"
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          onClick={handleSend}
          className="rounded-full bg-green-600 text-white p-3 hover:bg-green-700">
          <PaperPlaneIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
