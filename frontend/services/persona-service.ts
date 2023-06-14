import axios, {AxiosInstance, AxiosResponse} from "axios";
import {useCallback, useState} from 'react';
import {Person} from "../models/Person";
import {
  PersonaRequest,
  PersonaRequestFactory,
  PersonaResponse,
  PersonaResponseFactory
} from "../models/PersonaInterface";
import {ImageResponse, ImageResponseFactory} from "../models/ImageInterface";
import {AnswerResponse, AnswerResponseFactory, PersonaQuestionRequest} from "../models/AnswerInterface";
import {MessageResponse, MessageResponseFactory} from "../models/MessageInterface";
import {deletePersona, getPersonas, getRandId, savePersona} from "./firebase";


// TODO remove return of fake mock data in case API fails to deliver

export default function usePersonaService(userId: string | undefined) {
  const fakeUserId = '86tgh89zg9';
  const baseUrl = 'https://rpg-backend.caprover.jkoster.com/';
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const fetchPersonas = useCallback(async (userId: string): Promise<Person[]> => {
    const fetchedPersonas = await getPersonas(userId ?? fakeUserId);
    return fetchedPersonas;
  }, []);

  const createPerson = useCallback(async (personaData: PersonaRequest, userId: string): Promise<Person> => {
    if (!personaData.name) {
      personaData = PersonaRequestFactory.random();
    }

    const [personaResponse, imageResponse, messageResponse] = await Promise.all([generatePersona(personaData), getImages(personaData), getMessages(personaData)]);

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
    await savePersona(userId ?? fakeUserId, newPerson);
    console.log('saved persona');

    return newPerson;

  }, []);

  const removePersona = useCallback(async (userId: string, personaId: string): Promise<string> => {
    await deletePersona(userId ?? fakeUserId, personaId);
    return personaId;
  }, []);

  const generatePersona = useCallback(async (personaData: PersonaRequest): Promise<PersonaResponse> => {
    try {
      const response: AxiosResponse<PersonaResponse> = await axiosInstance.post('/api/persona', personaData);
      return PersonaResponseFactory.fromObject(response?.data);
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
    fetchPersonas,
    createPerson,
    generatePersona,
    getImages,
    getAnswer,
    getMessages,
    removePersona,
  };
}