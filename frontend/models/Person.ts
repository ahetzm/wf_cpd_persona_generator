import { faker } from '@faker-js/faker';
import { ImageResponse, ImageResponseFactory } from './ImageInterface';
import { MessageResponse, MessageResponseFactory } from './MessageInterface';
import { PersonaResponse, PersonaResponseFactory } from './PersonaInterface';

export interface Person extends PersonaResponse, ImageResponse, MessageResponse {
  id: number;
  name: string;
  age: string | number;
  interests: string;
  additional_info: string;
  purpose_context: string;
  imageUri: string;
}

export class PersonFactory {
  static empty(): Person {
    const imageResponse: ImageResponse = ImageResponseFactory.empty();
    const messageResponse: MessageResponse = MessageResponseFactory.empty();
    const personaResponse: PersonaResponse = PersonaResponseFactory.empty();
    const baseData = {
      id: 0,
      name: '',
      age: 0,
      interests: '',
      additional_info: '',
      purpose_context: '',
      imageUri: '',
    };

    return {
      ...baseData,
      ...imageResponse,
      ...messageResponse,
      ...personaResponse,
    }
  }

  static fromObject(obj: Person): Person {
    const imageResponse: ImageResponse = ImageResponseFactory.fromObject(obj);
    const messageResponse: MessageResponse = MessageResponseFactory.fromObject(obj);
    const personaResponse: PersonaResponse = PersonaResponseFactory.fromObject(obj);
    const baseData = {
      id: obj.id,
      name: obj.name,
      age: obj.age,
      interests: obj.interests,
      additional_info: obj.additional_info,
      purpose_context: obj.purpose_context,
      imageUri: obj.imageUri,
    };

    return {
      ...baseData,
      ...imageResponse,
      ...messageResponse,
      ...personaResponse,
    }
  }

  static random(): Person {
    const imageResponse: ImageResponse = ImageResponseFactory.random();
    const messageResponse: MessageResponse = MessageResponseFactory.random();
    const personaResponse: PersonaResponse = PersonaResponseFactory.random();
    const baseData = {
      id: faker.datatype.number({ min: 1, max: 100 }),
      name: faker.name.fullName(),
      age: faker.datatype.number({ min: 18, max: 65 }),
      interests: faker.lorem.words(3),
      additional_info: faker.lorem.words(5),
      purpose_context: faker.helpers.arrayElement(['Product development', 'Marketing', 'Customer support', 'Sales', 'Human resources']),
      imageUri: faker.image.avatar(),
    };

    return {
      ...baseData,
      ...imageResponse,
      ...messageResponse,
      ...personaResponse,
    }
  }

}