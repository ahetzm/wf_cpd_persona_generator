import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Person } from "../models/Person";
import { PersonaRequest, PersonaRequestFactory, PersonaResponse, PersonaResponseFactory } from "../models/PersonaInterface";
import { ImageResponse, ImageResponseFactory } from "../models/ImageInterface";
import { AnswerResponse, AnswerResponseFactory, PersonaQuestionRequest } from "../models/AnswerInterface";
import { MessageResponse, MessageResponseFactory } from "../models/MessageInterface";
import { getRandId } from "./firebase";

// TODO remove return of fake mock data in case API fails to deliver

export default class PersonaService {
  private axios: AxiosInstance;
  private baseUrl = "http://localhost:7000"; // TODO: Change this to the real backend URL

  constructor() {
    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async createPerson(personaData: PersonaRequest): Promise<Person> {
    if(!personaData.name) {
      personaData = PersonaRequestFactory.random();
    }

    const personaResponse: PersonaResponse = await this.generatePersona(personaData);
    const imageResponse: string[] = await this.getImages(personaData);
    const messageResponse: string[] = await this.getMessages(personaData);

    const id = getRandId();

    return {
      id: id,
      name: personaData.name,
      age: personaData.age,
      interests: personaData.interests,
      additional_info: personaData.additional_info,
      purpose_context: personaData.purpose_context,
      ...personaResponse,
      urls: imageResponse,
      messages: messageResponse,
      imageUri: imageResponse[0],
    };
  }

  public async generatePersona(personaData: PersonaRequest): Promise<PersonaResponse> {
    try {
      const response: AxiosResponse<PersonaResponse> = await this.axios.post(
        "/api/persona",
        personaData
      );
      return response?.data ?? PersonaResponseFactory.random();
    }
    catch (error) {
      console.log(error);
    }
    
    return PersonaResponseFactory.random();
  }

  public async getImages(personaData: PersonaRequest): Promise<string[]> {
    try {
      const response: AxiosResponse<ImageResponse> = await this.axios.post(
        "/api/images",
        personaData
      );
      return response?.data.urls ?? ImageResponseFactory.random().urls;
    }
    catch (error) {
      console.log(error);
    }

    return ImageResponseFactory.random().urls;
  }

  public async getAnswer(personaData: PersonaQuestionRequest): Promise<string> {
    try {
      const response: AxiosResponse<AnswerResponse> = await this.axios.post(
        "/api/ask",
        personaData
      );
      return response?.data.answer ?? AnswerResponseFactory.random().answer;
    }
    catch (error) {
      console.log(error);
    }

    return AnswerResponseFactory.random().answer;
  }

  public async getMessages(personaData: PersonaRequest): Promise<string[]> {
    try {
      const response: AxiosResponse<MessageResponse> = await this.axios.post(
        "/api/messages",
        personaData
      );
      return response?.data.messages ?? MessageResponseFactory.random().messages;
    }
    catch (error) {
      console.log(error);
    }

    return MessageResponseFactory.random().messages;
  }

}