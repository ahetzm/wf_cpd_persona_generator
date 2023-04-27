import axios, { AxiosInstance, AxiosResponse } from "axios";
import { PersonaRequest, PersonaResponse } from "../models/PersonaInterface";
import { ImageResponse } from "../models/ImageInterface";
import { AnswerResponse, PersonaQuestionRequest } from "../models/AnswerInterface";
import { MessageResponse } from "../models/MessageInterface";

export default class PersonaService {
  private axios: AxiosInstance;
  private baseUrl = "http://localhost:7000";

  constructor() {
    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async generatePersona(personaData: PersonaRequest): Promise<PersonaResponse> {
    const response: AxiosResponse<PersonaResponse> = await this.axios.post(
      "/api/persona",
      personaData
    );
    return response.data;
  }

  public async getImage(personaData: PersonaRequest): Promise<string> {
    const response: AxiosResponse<ImageResponse> = await this.axios.post(
      "/api/images",
      personaData
    );
    return response.data[0].url;
  }

  public async getAnswer(personaData: PersonaQuestionRequest): Promise<string> {
    const response: AxiosResponse<AnswerResponse> = await this.axios.post(
      "/api/ask",
      personaData
    );
    return response.data.data;
  }

  public async getMessages(personaData: PersonaRequest): Promise<string[]> {
    const response: AxiosResponse<MessageResponse> = await this.axios.post(
      "/api/messages",
      personaData
    );
    return response.data.data.messages;
  }

}