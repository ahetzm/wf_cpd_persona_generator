import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import { Configuration, OpenAIApi } from 'openai';
import { errorHandling, errorLogger, invalidPathHandler, wrap } from './middleware/error.js';


// Init Express
const app = express();
const morganLogFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent"';
app.use(morgan(morganLogFormat));
// app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

// Init OpenAI
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

function createPersonaPrompt(personaData = {
    purpose: '',
    name: '',
    age: '',
    interests: [],
    goals: [],
}) {

}

/*
Demographics: Age, gender, location, education, income, marital status, and other relevant demographic information.

Psychographics: Personality traits, values, interests, hobbies, lifestyle, and other psychographic variables.

Behaviors: Purchase behavior, usage behavior, brand loyalty, product preferences, and other relevant behaviors.

Pain points: Identify the challenges and problems that the persona faces while using your product or service.

Goals: Identify the goals, aspirations, and desires of the persona, such as their career objectives, personal goals, and life ambitions.

Motivations: Identify what drives the persona, such as their desires, fears, and passions.

Communication preferences: Identify how the persona prefers to communicate and interact with brands, such as through social media, email, or face-to-face meetings.

{
  "demographics": {
    "age": "",
    "gender": "",
    "location": "",
    "education": "",
    "income": "",
    "marital_status": ""
  },
  "psychographics": {
    "personality_traits": [],
    "values": [],
    "interests": [],
    "hobbies": [],
    "lifestyle": ""
  },
  "behaviors": {
    "purchase_behavior": "",
    "usage_behavior": "",
    "brand_loyalty": "",
    "product_preferences": ""
  },
  "pain_points": {
    "challenges": [],
    "problems": []
  },
  "goals": {
    "career_objectives": "",
    "personal_goals": "",
    "life_ambitions": ""
  },
  "motivations": {
    "desires": [],
    "fears": [],
    "passions": []
  },
  "communication_preferences": {
    "preferred_channels": [],
    "tone_of_voice": "",
    "preferred_format": ""
  },
  "buying_journey": {
    "awareness": "",
    "consideration": "",
    "decision": "",
    "loyalty": ""
  }
}

 */

// Routes
app.get('/', wrap(async (req, res, next) => {
    console.log(req.protocol + "://" + req.headers.host);
    const routes = []
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            routes.push({ path: r.route.path, method: r.route.methods });
        }
    })
    return res.json({ message: 'Persona Generator Backend', routes: routes });
}));

app.get('/api/persona', wrap(async (req, res, next) => {
    const answer = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: createPersonaPrompt(req.body),
            }
        ],
    });
    res.json({ answer: answer.data.choices[0].message });
}));

// Error Handling
app.use(errorLogger);
app.use(errorHandling);
app.use(invalidPathHandler);

// Start listening
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log('🧏 ' + new Date().toISOString() + ' - listening on port =', port);
    console.log('--- Successfully Initialised NodeJS Backend ---');
});