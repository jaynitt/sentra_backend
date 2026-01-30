const handleImageInput = (imageFile) => {
  if (!imageFile) return null;

  return {
    path: imageFile.path,
    type: imageFile.mimetype,
    note: "Image will be sent directly to Gemini",
  };
};

module.exports = {
  handleImageInput,
};
