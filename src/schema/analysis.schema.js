const { z } = require("zod");

const AnalysisSchema = z.object({
  summary: z.string().min(1),

  key_insights: z
    .array(z.string().min(1))
    .min(1)
    .max(10),

  sentiment: z.enum([
    "very_negative",
    "negative",
    "neutral",
    "positive",
    "very_positive",
  ]),

  sentiment_score: z
    .number()
    .int()
    .min(0)
    .max(100),
});

module.exports = {
  AnalysisSchema,
};
