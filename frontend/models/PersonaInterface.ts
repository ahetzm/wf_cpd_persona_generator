import { faker } from '@faker-js/faker';

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
      demographics: Demographics;
      psychographics: Psychographics;
      behaviors: Behaviors;
      pain_points: PainPoints;
      goals: Goals;
      motivations: Motivations;
      communication_preferences: CommunicationPreferences;
  }

  export interface PersonaRequest {
    purpose_context: string;
    name: string;
    age: string;
    interests: string;
    goals: string;
    additional_info: string;
  }
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

    static random(): PersonaRequest {
        return {
            purpose_context: faker.helpers.arrayElement(['Product development', 'Marketing', 'Customer support', 'Sales', 'Human resources']),
            name: faker.name.fullName(),
            age: faker.datatype.number({ min: 18, max: 65 }).toString(),
            interests: faker.lorem.words(3),
            goals: faker.lorem.words(3),
            additional_info: faker.lorem.words(5),
        };
    }
  }
  
  export class PersonaResponseFactory {
    static empty(): PersonaResponse {
      return {
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
      };
    }
  
    static fromObject(obj: any): PersonaResponse {
      return {
          demographics: obj.demographics,
          psychographics: obj.psychographics,
          behaviors: obj.behaviors,
          pain_points: obj.pain_points,
          goals: obj.goals,
          motivations: obj.motivations,
          communication_preferences: obj.communication_preferences,
      };
    }

    static random(): PersonaResponse {
        const personalityTraits = ['Creative', 'Analytical', 'Independent', 'Curious', 'Innovative'];
        const values = ['Autonomy', 'Personal development', 'Learning', 'Freedom', 'Creativity'];
        const interests = ['Skiing', 'Hiking', 'Cycling', 'Coding Challenges', 'Reading'];
        const hobbies = ['Reading tech blogs', 'Attending web development meetups', 'Playing video games', 'Watching movies', 'Playing sports'];
        const toneOfVoice = ['Concise and straightforward', 'Friendly and informal', 'Professional and polite', 'Casual and humorous', 'Authoritative and formal'];
    
        return {
            demographics: {
              name: faker.name.fullName(),
              age: faker.datatype.number({ min: 18, max: 65 }),
              gender: faker.helpers.arrayElement(['Male', 'Female', 'Non-binary']),
              location: faker.address.city() + ', ' + faker.address.country(),
              education: faker.helpers.arrayElement([
                "Bachelor's degree in Computer Science",
                "Master's degree in Software Engineering",
                "Self-taught programmer",
                "Bootcamp graduate",
              ]),
              income: faker.helpers.arrayElement([
                'Entry-level salary in web development',
                'Average salary for web developers in the region',
                'High-paying job in tech industry',
              ]),
              marital_status: faker.helpers.arrayElement(['Single', 'Married', 'In a relationship']),
            },
            psychographics: {
              personality_traits: [
                faker.helpers.arrayElement(personalityTraits),
                faker.helpers.arrayElement(personalityTraits),
                faker.helpers.arrayElement(personalityTraits),
              ],
              values: [faker.helpers.arrayElement(values), faker.helpers.arrayElement(values)],
              interests: [
                faker.helpers.arrayElement(interests),
                faker.helpers.arrayElement(interests),
                faker.helpers.arrayElement(interests),
              ],
              hobbies: [
                faker.helpers.arrayElement(hobbies),
                faker.helpers.arrayElement(hobbies),
                faker.helpers.arrayElement(hobbies),
              ],
              lifestyle: faker.lorem.sentence(),
              additional_funfact: faker.lorem.sentence(),
            },
            behaviors: {
              purchase_behavior: faker.lorem.sentence(),
              usage_behavior: faker.lorem.sentence(),
              brand_loyalty: faker.lorem.sentence(),
              product_preferences: faker.lorem.sentence(),
              additional_funfact: faker.lorem.sentence(),
            },
            pain_points: {
              challenges: faker.lorem.sentence(),
              additional_funfact: faker.lorem.sentence(),
            },
            goals: {
              career_objectives: faker.lorem.sentence(),
              personal_goals: faker.lorem.sentence(),
              life_ambitions: faker.lorem.sentence(),
            },
            motivations: {
              desires: faker.lorem.sentence(),
              fears: faker.lorem.sentence(),
              passions: [
                faker.helpers.arrayElement(interests),
                faker.helpers.arrayElement(interests),
                faker.helpers.arrayElement(interests),
              ],
            },
            communication_preferences: {
              preferred_channels: [
                faker.helpers.arrayElement(['Email', 'Slack', 'In-person meetings']),
                faker.helpers.arrayElement(['Email', 'Slack', 'In-person meetings']),
              ],
              tone_of_voice: faker.helpers.arrayElement(toneOfVoice),
              preferred_format: faker.helpers.arrayElement(['Written communication', 'Visual aids']),
          },
        };
      }
  }