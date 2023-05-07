import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Person } from "../models/Person";
import { PersonaRequest, PersonaResponse, PersonaResponseFactory } from "../models/PersonaInterface";
import { ImageResponse, ImageResponseFactory } from "../models/ImageInterface";
import { AnswerResponse, AnswerResponseFactory, PersonaQuestionRequest } from "../models/AnswerInterface";
import { MessageResponse, MessageResponseFactory } from "../models/MessageInterface";

export default class PersonaService {
  private axios: AxiosInstance;
  private baseUrl = "http://localhost:7000"; // TODO: Change this to the real backend URL

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
    return response?.data ?? PersonaResponseFactory.random();
  }

  public async getImages(personaData: PersonaRequest): Promise<string[]> {
    const response: AxiosResponse<ImageResponse> = await this.axios.post(
      "/api/images",
      personaData
    );
    return response?.data.urls ?? ImageResponseFactory.random().urls;
  }

  public async getAnswer(personaData: PersonaQuestionRequest): Promise<string> {
    const response: AxiosResponse<AnswerResponse> = await this.axios.post(
      "/api/ask",
      personaData
    );
    return response?.data.answer ?? AnswerResponseFactory.random().answer;
  }

  public async getMessages(personaData: PersonaRequest): Promise<string[]> {
    const response: AxiosResponse<MessageResponse> = await this.axios.post(
      "/api/messages",
      personaData
    );
    return response?.data.messages ?? MessageResponseFactory.random().messages;
  }

}