import { ReceiveMessageResponse, ChatMessage, SentMessageResponse } from "@/types/greenApi";
import axios from "axios";
import {  getCookie } from 'cookies-next';

const API_URL = "https://7105.api.greenapi.com";

const getInstanceId = () => String(getCookie('idInstance')) || '';
const getApiToken = () => String(getCookie('apiToken')) || '';

export async function sendMessage( chatId: string, text: string) {
  const responce = await axios.post<SentMessageResponse>(`${API_URL}/waInstance${getInstanceId()}/sendMessage/${getApiToken()}`, {
    chatId,
    message: text,
  });
  return responce.data.idMessage
}

export async function deleteMessage(
    instanceId: string | undefined,
    apiToken: string,
    receiptId: number
  ): Promise<boolean> {
    try {
      const response = await axios.delete<boolean>(
        `${API_URL}/waInstance${instanceId}/deleteNotification/${apiToken}/${receiptId.toString()}`
      );
  
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
      return false;
    }
}

export async function receveMessage(): Promise<ReceiveMessageResponse | null> {
    try {
      const response = await axios.get<ReceiveMessageResponse>(
        `${API_URL}/waInstance${getInstanceId()}/receiveNotification/${getApiToken()}?receiveTimeout=10`
      );
  
      if (response?.data?.receiptId) {
        await deleteMessage(getInstanceId(), getApiToken(), response.data.receiptId);
      }
  
      return response.data || null;
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
      return null;
  }

  }

export async function getMessages(
    chatId: string
  ): Promise<ChatMessage[] | []> {
    try {
      const response = await axios.post<ChatMessage[]>(
        `${API_URL}/waInstance${getInstanceId()}/getChatHistory/${getApiToken()}`, {
            chatId,
            "count": 20
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
      return [];
    }
}
  

