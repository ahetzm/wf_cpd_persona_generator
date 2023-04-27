interface Demographics {
    name: string;
    age: number;
    gender: string;
    location: string;
    education: string;
    income: string;
    marital_status: string;
  }
  
  interface Psychographics {
    personality_traits: string[];
    values: string[];
    interests: string[];
    hobbies: string[];
    lifestyle: string;
    additional_funfact: string;
  }
  
  interface Behaviors {
    purchase_behavior: string;
    usage_behavior: string;
    brand_loyalty: string;
    product_preferences: string;
    additional_funfact: string;
  }
  
  interface PainPoints {
    challenges: string;
    additional_funfact: string;
  }
  
  interface Goals {
    career_objectives: string;
    personal_goals: string;
    life_ambitions: string;
  }
  
  interface Motivations {
    desires: string;
    fears: string;
    passions: string[];
  }
  
  interface CommunicationPreferences {
    preferred_channels: string[];
    tone_of_voice: string;
    preferred_format: string;
  }
  
  export interface PersonaResponse {
    data: {
      demographics: Demographics;
      psychographics: Psychographics;
      behaviors: Behaviors;
      pain_points: PainPoints;
      goals: Goals;
      motivations: Motivations;
      communication_preferences: CommunicationPreferences;
    };
  }

  export interface PersonaRequest {
    purpose_context: string;
    name: string;
    age: string;
    interests: string;
    goals: string;
    additional_info: string;
  }

  export interface Persona extends PersonaRequest, PersonaResponse {}

  export class PersonaRequestFactory {
    static empty(): PersonaRequest {
      return {
        purpose_context: '',
        name: '',
        age: '',
        interests: '',
        goals: '',
        additional_info: '',
      };
    }
  
    static fromObject(obj: PersonaRequest): PersonaRequest {
      return {
        purpose_context: obj.purpose_context || '',
        name: obj.name || '',
        age: obj.age || '',
        interests: obj.interests || '',
        goals: obj.goals || '',
        additional_info: obj.additional_info || '',
      };
    }
  }
  
  export class PersonaResponseFactory {
    static empty(): PersonaResponse {
      return {
        data: {
          demographics: {
            name: "",
            age: 0,
            gender: "",
            location: "",
            education: "",
            income: "",
            marital_status: "",
          },
          psychographics: {
            personality_traits: [],
            values: [],
            interests: [],
            hobbies: [],
            lifestyle: "",
            additional_funfact: "",
          },
          behaviors: {
            purchase_behavior: "",
            usage_behavior: "",
            brand_loyalty: "",
            product_preferences: "",
            additional_funfact: "",
          },
          pain_points: {
            challenges: "",
            additional_funfact: "",
          },
          goals: {
            career_objectives: "",
            personal_goals: "",
            life_ambitions: "",
          },
          motivations: {
            desires: "",
            fears: "",
            passions: [],
          },
          communication_preferences: {
            preferred_channels: [],
            tone_of_voice: "",
            preferred_format: "",
          },
        },
      };
    }
  
    static fromObject(obj: any): PersonaResponse {
      return {
        data: {
          demographics: obj.data.demographics,
          psychographics: obj.data.psychographics,
          behaviors: obj.data.behaviors,
          pain_points: obj.data.pain_points,
          goals: obj.data.goals,
          motivations: obj.data.motivations,
          communication_preferences: obj.data.communication_preferences,
        },
      };
    }
  }
  