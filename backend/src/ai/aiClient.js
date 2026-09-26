import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export default groq;