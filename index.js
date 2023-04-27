import dotenv from "dotenv";
import express from "express";
// import cors from 'cors';
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
// app.use(cors());
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

function createPersonaPrompt(personaData) {}

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

app.get(
  "/api/persona",
  wrap(async (req, res, next) => {
    const answer = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: createPersonaPrompt(req.body),
        },
      ],
    });
    res.json({ answer: answer.data.choices[0].message });
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
