export interface ImageResponse {
    data: {
      url: string;
    }[];
  }
  
 export class ImageResponseFactory {
    static empty(): ImageResponse {
      return { data: [] };
    }
  
    static fromObject(obj: any): ImageResponse {
      const data = obj.data.map((item: any) => ({ url: item.url }));
      return { data };
    }
  }
  