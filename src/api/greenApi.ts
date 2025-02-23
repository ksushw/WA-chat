import { ReceiveMessageResponse, ChatMessage } from "@/types/greenApi";
import axios from "axios";

const API_URL = "https://7105.api.greenapi.com";

export async function sendMessage(instanceId: string, apiToken: string, chatId: string, text: string) {
  return axios.post<ReceiveMessageResponse>(`${API_URL}/waInstance${instanceId}/sendMessage/${apiToken}`, {
    chatId,
    message: text,
  });
}

export async function deleteMessage(
    instanceId: string,
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

export async function receveMessage(instanceId: string, apiToken: string): Promise<ReceiveMessageResponse | null> {
    try {
      const response = await axios.get<ReceiveMessageResponse>(
        `${API_URL}/waInstance${instanceId}/receiveNotification/${apiToken}?receiveTimeout=10`
      );
  
      if (response?.data?.receiptId) {
        await deleteMessage(instanceId, apiToken, response.data.receiptId);
      }
  
      return response.data || null;
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
      return null;
    }
  }

export async function getMessages(
    instanceId: string,
    apiToken: string,
    chatId: string
  ): Promise<ChatMessage[] | []> {
    try {
      const response = await axios.post<ChatMessage[]>(
        `${API_URL}/waInstance${instanceId}/getChatHistory/${apiToken}`, {
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
  

