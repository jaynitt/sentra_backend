const cleanText = (text) => {
  if (!text) return "";

  return text
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim();
};

module.exports = {
  cleanText,
};
