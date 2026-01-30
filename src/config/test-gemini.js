const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

// Ensure this path matches where your .env is located
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeSentiment() {
  try {
    // 1. Initialize the model with a System Instruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite", // This is the high-quota model for 2026
      systemInstruction: "You are a sentiment analyzer. Respond only in valid JSON with 'sentiment' (Positive/Negative/Neutral) and 'score' (0-1)."
    });

    const textToAnalyze = "I'm so happy the new API key worked, but I'm nervous about the quota limits.";

    // 2. Request JSON mode specifically
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: textToAnalyze }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = result.response.text();
    const data = JSON.parse(response);

    console.log("--- Sentiment Analysis ---");
    console.log(`Sentiment: ${data.sentiment}`);
    console.log(`Confidence: ${Math.round(data.score * 100)}%`);

  } catch (error) {
    if (error.status === 429) {
      console.error("Quota still says 0. This might be a regional block on your IP.");
    } else {
      console.error("Error:", error.message);
    }
  }
}

analyzeSentiment();