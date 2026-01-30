const { GoogleGenerativeAI } = require("@google/generative-ai");
const { withRetry } = require("../../utils/retry");
const { buildAnalysisPrompt } = require("../../utils/prompt.utils");
const { AnalysisSchema } = require("../../schema/analysis.schema");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

const analyzeTextWithGemini = async (text) => {
  const prompt = buildAnalysisPrompt(text);

  return withRetry(
    async () => {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const raw = result.response.text();
      const parsed = JSON.parse(raw);

      // 🔒 Zod validation
      const validated = AnalysisSchema.parse(parsed);

      return validated;
    },
    {
      retries: 3,
      baseDelay: 800,
      factor: 2,
      retryOn: [429],
    }
  );
};

module.exports = {
  analyzeTextWithGemini,
};
