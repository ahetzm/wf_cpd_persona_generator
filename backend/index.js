import dotenv from "dotenv";
import express from "express";
import { jsonrepair } from 'jsonrepair'
import cors from 'cors';
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";
import {
    errorHandling,
    errorLogger,
    invalidPathHandler,
    wrap,
} from "./middleware/error.js";

// Init Express
const app = express();
const morganLogFormat =
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent"';
app.use(morgan(morganLogFormat));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

// Init OpenAI
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

function createPersonaPrompt(personaData = {
    purpose_context: '',
    name: '',
    age: '',
    interests: '',
    goals: '',
    additional_info: '',
}) {

    const { purpose_context, name, age, interests, goals, additional_info } = personaData;

    return `
        Create a persona for marketing and product development purposes based on the target audience profile of ${name}.

        Here is some context for about the situation the persona is needed for: ${purpose_context}.
        Here is some additional information about ${name}: ${additional_info}.

        Please provide the following information about the target audience profile of ${name}:

        Interests:
        What are the interests and hobbies of your target audience?
        How do they typically spend their free time?

        Goals:
        What are the career objectives and personal goals of your target audience?
        What are their ambitions and aspirations?

        Demographics:
        What is the name of the persona?
        What is the age of your target audience?
        What is the gender of your target audience?
        Where is the personas location? Where do they live?
        What is the education level of the persona?
        What is the current income level of the persona?
        What is the current marital status of the persona?

        Psychographics:
        What personality traits best describe your target audience?
        What values do they hold?
        What are their interests and hobbies?
        What is their overall lifestyle like?
        Come up with an additional funcat about the psychographics of the persona that makes the persona more interesting and authentic.

        Behaviors:
        What is the typical purchase behavior of your target audience?
        How do they use your product or service?
        Are they loyal to certain brands? If so, which ones?
        What are their preferred product features and functions?
        Come up with an additional funcat of the personas behaviour that makes the persona more interesting and authentic.

        Pain Points:
        What are the main challenges or problems that your target audience faces while using your product or service?
        Come up with an additional funcat about what the persona detests to make the persona more interesting and authentic.

        Motivations:
        What motivates your target audience to use your product or service?
        What are their desires and needs?
        What are their fears and concerns?
        What are their passions and interests?

        Communication Preferences:
        What are the preferred communication channels of your target audience?
        What is the tone of voice that they prefer?
        What is the preferred format of communication?

        Please provide as much detail as possible for each variable while respecting your token limit to create a comprehensive persona that represents your target audience accurately based on the profile of ${name} who is a ${age} year-old who is interested in ${interests} and aspires to ${goals}. Also take into account the situation the persona is needed for: ${purpose_context} and the possible additional information about ${name}: ${additional_info}.
        Format the response as a valid JSON object with the following structure and without any unnecessary spaces or line breaks between the data. Only output the JSON as response:
        {
            "demographics": {
                "name": "",
                "age": "",
                "gender": "",
                "location": "",
                "education": "",
                "income": "",
                "marital_status": "",
            },
            "psychographics": {
                "personality_traits": [],
                "values": [],
                "interests": [],
                "hobbies": [],
                "lifestyle": "",
                "additional_funfact": ""
            },
            "behaviors": {
                "purchase_behavior": "",
                "usage_behavior": "",
                "brand_loyalty": "",
                "product_preferences": "",
                "additional_funfact": ""
            },
            "pain_points": {
                "challenges": "",
                "additional_funfact": ""
            },
            "goals": {
                "career_objectives": "",
                "personal_goals": "",
                "life_ambitions": "",
            },
            "motivations": {
                "desires": "",
                "fears": "",
                "passions": "",
            },
            "communication_preferences": {
                "preferred_channels": [],
                "tone_of_voice": "",
                "preferred_format": ""
            }
        }
    `;

}

/*
  "buying_journey": {
    "awareness": "",
    "consideration": "",
    "decision": "",
    "loyalty": ""
  }
}
 */

function createImagePrompt(personaData = {
    name: '',
    age: '',
    interests: '',
}) {
    const { name, age, interests } = personaData;

    if (!typeof interests === 'string') {
        interests = interests.join(', ');
    }

    return `Generate a photo-realistic image of a ${age} years old persona named ${name} with interests in ${interests}.`;
}

function createAskQuestionPrompt(question, personaData) {
    return `I provide you with data of a persona in JSON format:

    ${JSON.stringify(personaData)}
    
    Act like the persona i provided you with. Answer in an authentic way, as If you are being interviewed to the following question: ${question}`
}

function createMessagesPrompt(personaData) {
    return `I provide you with data of a persona in JSON format:

    ${JSON.stringify(personaData)}
    
    Act like the persona i provided you with. Come up with 10 funny and authentic chat messages this persona might send a good friend to tease them, taking into account the special characteristics and fun facts of the persona. Format the 'messages' in  JSON format. Only output the valid JSON.`
}

// Routes
app.get(
    "/",
    wrap(async (req, res, next) => {
        console.log(req.protocol + "://" + req.headers.host);
        const routes = [];
        app._router.stack.forEach(function (r) {
            if (r.route && r.route.path) {
                routes.push({ path: r.route.path, method: r.route.methods });
            }
        });
        return res.json({ message: "Persona Generator Backend", routes: routes });
    })
);

app.post(
    "/api/persona",
    wrap(async (req, res, next) => {
        console.log("creating persona");
        const answer = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: createPersonaPrompt(req.body),
                },
            ],
        });

        const repaired = jsonrepair(answer.data.choices[0].message.content);
        const parsed = JSON.parse(repaired);
        console.log(parsed);
        res.json(parsed);
    })
);

app.post(
    "/api/image",
    wrap(async (req, res, next) => {
        console.log('creating image');

        const prompt = createImagePrompt(req.body).toString();

        const response = await openai.createImage({
            prompt: prompt,
            n: 4,
            size: "1024x1024",
        });

        res.json({ urls: response.data.data.map((image) => image.url) });
    })
);

app.post(
    "/api/ask",
    wrap(async (req, res, next) => {
        console.log('asking question');
        const prompt = createAskQuestionPrompt(req.body.question, req.body.data).toString();
        console.log(prompt);
        const answer = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        res.json({ answer: answer.data.choices[0].message.content });
    })
);

app.post(
    "/api/messages",
    wrap(async (req, res, next) => {
        console.log('creating messages');
        const prompt = createMessagesPrompt(req.body).toString();
        console.log(prompt);
        const answer = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const repaired = jsonrepair(answer.data.choices[0].message.content);
        const parsed = JSON.parse(repaired);
        console.log(parsed);
        res.json(parsed);
    })
);

// Error Handling
app.use(errorLogger);
app.use(errorHandling);
app.use(invalidPathHandler);

// Start listening
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(
        "🧏 " + new Date().toISOString() + " - listening on port =",
        port
    );
    console.log("--- Successfully Initialised NodeJS Backend ---");
});

