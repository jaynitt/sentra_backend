const { cleanText } = require("../services/preprocessing/text.service");
const {
  extractTextFromPDF,
} = require("../services/preprocessing/document.service");
const {
  analyzeTextWithGemini,
} = require("../services/ai/gemini.service");
const {
  cleanupUploadedFiles,
} = require("../utils/fileCleanup");

const analyzeInput = async (req, res, next) => {
  try {
    let combinedText = "";

    if (req.body.text) {
      combinedText += cleanText(req.body.text) + "\n";
    }

    if (req.files?.document?.[0]) {
      const pdfText = await extractTextFromPDF(
        req.files.document[0].path
      );
      combinedText += cleanText(pdfText) + "\n";
    }

    if (!combinedText.trim()) {
      return res.status(400).json({
        success: false,
        message: "No analyzable text provided",
      });
    }

    const insights = await analyzeTextWithGemini(combinedText);

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    next(error);
  } finally {
    // 🔥 ALWAYS cleanup files
    cleanupUploadedFiles(req.files);
  }
};

module.exports = {
  analyzeInput,
};
