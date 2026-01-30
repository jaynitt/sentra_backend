const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const {
  analyzeInput,
} = require("../controllers/analyze.controller");

// Accept multiple fields
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  analyzeInput
);

module.exports = router;
