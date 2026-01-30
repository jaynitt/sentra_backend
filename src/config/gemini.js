const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  const response = await ai.models.generateContent({
    model: "models/gemini-1.0-pro",
    contents: "Explain how AI works in one sentence",
  });

  console.log(response.text);
}

test();
