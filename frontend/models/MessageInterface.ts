export interface MessageResponse {
    data: {
      messages: string[];
    };
  }

  export class MessageResponseFactory {
    static empty(): MessageResponse {
      return { data: { messages: [] } };
    }
  
    static fromObject(obj: MessageResponse): MessageResponse {
      return { data: { messages: [...obj.data.messages] } };
    }
  }