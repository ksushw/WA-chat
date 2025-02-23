 export type ReceiveMessageResponse = {
    receiptId: number;
    body: {
      typeWebhook: "incomingMessageReceived";
      instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
      };
      timestamp: number;
      idMessage: string;
      senderData: {
        chatId: string;
        chatName: string;
        sender: string;
        senderName: string;
        senderContactName: string;
      };
      messageData: {
        typeMessage: "textMessage";
        textMessageData: {
          textMessage: string;
        };
      };
    };
};
  
type MessageType = "incoming" | "outgoing";

type MessageContentType = "textMessage" | "imageMessage" | "videoMessage" | "audioMessage" | "documentMessage";

export interface ChatMessage {
  chatId: string;
  deletedMessageId: string;
  editedMessageId: string;
  idMessage: string;
  isDeleted: boolean;
  isEdited: boolean;
  senderContactName: string;
  senderId: string;
  senderName: string;
  textMessage: string;
  timestamp: number;
  type: MessageType;
  typeMessage: MessageContentType;
}

  