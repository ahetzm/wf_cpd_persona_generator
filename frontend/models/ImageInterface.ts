import {faker} from '@faker-js/faker';

export interface ImageResponse {
  urls: string[];
}

export class ImageResponseFactory {
  static empty(): ImageResponse {
    return {urls: []};
  }

  static fromObject(obj: any): ImageResponse {
    return {urls: [...obj.urls]};
  }

  static random(): ImageResponse {
    return {
      urls: [
        faker.image.avatar(),
        faker.image.avatar(),
        faker.image.avatar(),
        faker.image.avatar(),
      ]
    };
  }
}
  