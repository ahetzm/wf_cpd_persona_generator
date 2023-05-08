import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useState } from 'react';
import { Person, PersonFactory } from "../models/Person";
import { PersonaRequest, PersonaRequestFactory, PersonaResponse, PersonaResponseFactory } from "../models/PersonaInterface";
import { ImageResponse, ImageResponseFactory } from "../models/ImageInterface";
import { AnswerResponse, AnswerResponseFactory, PersonaQuestionRequest } from "../models/AnswerInterface";
import { MessageResponse, MessageResponseFactory } from "../models/MessageInterface";
import { getPersonas, getRandId, savePersona } from "./firebase";


// TODO remove return of fake mock data in case API fails to deliver

export default function usePersonaService() {
  const fakeUserId = '86tgh89zg9';
  const baseUrl = 'http://localhost:7000'; // TODO: Change this to the real backend URL
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
  });
  const [persons, setPersons] = useState<Person[]>([]);

  const fetchPersonas = useCallback(async (userId: string): Promise<void> => {
    // const fetchedPersonas: Person[] = await getPersonas(userId = fakeUserId);
    // console.log('fetchedPersonas', fetchedPersonas);

    const fakePersons: Person[] = [
      PersonFactory.random(),
      PersonFactory.random(),
      PersonFactory.random(),
      PersonFactory.random(),
      PersonFactory.random(),
      PersonFactory.random(),
    ];

    setPersons(fakePersons);
  }, []);

  const createPerson = useCallback(async (personaData: PersonaRequest): Promise<Person> => {
    if (!personaData.name) {
      personaData = PersonaRequestFactory.random();
    }

    const personaResponse: PersonaResponse = await generatePersona(personaData);
    const imageResponse: string[] = await getImages(personaData);
    const messageResponse: string[] = await getMessages(personaData);

    const id = getRandId();

    const newPerson: Person = {
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

    setPersons([...persons, newPerson]);
    savePersona(fakeUserId, newPerson); // TODO: Change this to the real user ID

    return newPerson;

  }, []);

  const generatePersona = useCallback(async (personaData: PersonaRequest): Promise<PersonaResponse> => {
    try {
      const response: AxiosResponse<PersonaResponse> = await axiosInstance.post('/api/persona', personaData);
      return response?.data ?? PersonaResponseFactory.random();
    } catch (error) {
      console.log(error);
    }

    return PersonaResponseFactory.random();
  }, []);

  const getImages = useCallback(async (personaData: PersonaRequest): Promise<string[]> => {
    try {
      const response: AxiosResponse<ImageResponse> = await axiosInstance.post('/api/images', personaData);
      return response?.data.urls ?? ImageResponseFactory.random().urls;
    } catch (error) {
      console.log(error);
    }

    return ImageResponseFactory.random().urls;
  }, []);

  const getAnswer = useCallback(async (personaData: PersonaQuestionRequest): Promise<string> => {
    try {
      const response: AxiosResponse<AnswerResponse> = await axiosInstance.post('/api/ask', personaData);
      return response?.data.answer ?? AnswerResponseFactory.random().answer;
    } catch (error) {
      console.log(error);
    }

    return AnswerResponseFactory.random().answer;
  }, []);

  const getMessages = useCallback(async (personaData: PersonaRequest): Promise<string[]> => {
    try {
      const response: AxiosResponse<MessageResponse> = await axiosInstance.post('/api/messages', personaData);
      return response?.data.messages ?? MessageResponseFactory.random().messages;
    } catch (error) {
      console.log(error);
    }

    return MessageResponseFactory.random().messages;
  }, []);

  return {
    persons,
    fetchPersonas,
    createPerson,
    generatePersona,
    getImages,
    getAnswer,
    getMessages,
  };
}