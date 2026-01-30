const fs = require("fs/promises");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const safeDeleteFile = async (filePath) => {
  if (!filePath) return;

  try {
    // Small delay to release file handles (Windows fix)
    await sleep(100);

    await fs.unlink(filePath);
    console.log("🗑️ Deleted file:", filePath);
  } catch (err) {
    console.error("❌ Failed to delete file:", filePath, err.message);
  }
};

const cleanupUploadedFiles = async (files = {}) => {
  const deletions = [];

  if (files.image?.[0]?.path) {
    deletions.push(safeDeleteFile(files.image[0].path));
  }

  if (files.document?.[0]?.path) {
    deletions.push(safeDeleteFile(files.document[0].path));
  }

  await Promise.all(deletions);
};

module.exports = {
  cleanupUploadedFiles,
};
