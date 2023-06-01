export interface MessageResponse {
      messages: string[];
  }

  export class MessageResponseFactory {
    static empty(): MessageResponse {
      return { messages: [] };
    }
  
    static fromObject(obj: MessageResponse): MessageResponse {
      return { messages: [...obj.messages] };
    }

    static random(): MessageResponse {
      return { messages: [
        "I'm a message",
        "I'm a message",
        "I'm a message",
        "I'm a message",
      ]};
    }
  }