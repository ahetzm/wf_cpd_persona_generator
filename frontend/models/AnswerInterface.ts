import { PersonaResponse } from './PersonaInterface';

export interface AnswerResponse {
    data: string;
  }
  
 export class AnswerResponseFactory {
    static empty(): AnswerResponse {
      return {
        data: ""
      }
    }
  
    static fromObject(obj: AnswerResponse): AnswerResponse {
      return {
        data: obj.data
      }
    }
  }

  export interface PersonaQuestionRequest extends PersonaResponse {
    question: string;
  }
  