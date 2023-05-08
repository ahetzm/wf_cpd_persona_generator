import { PersonaResponse } from './PersonaInterface';
import {faker} from '@faker-js/faker';

export interface AnswerResponse {
    answer: string;
  }
  
 export class AnswerResponseFactory {
    static empty(): AnswerResponse {
      return {
        answer: ""
      }
    }
  
    static fromObject(obj: AnswerResponse): AnswerResponse {
      return {
        answer: obj.answer
      }
    }

    static random(): AnswerResponse {
      return {
        answer: faker.lorem.sentence(100)
      }
    }
  }

  export interface PersonaQuestionRequest {
    data: PersonaResponse
    question: string;
  }
  