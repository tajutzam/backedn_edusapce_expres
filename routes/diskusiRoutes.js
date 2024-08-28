const express = require("express");
const discussionController = require("../controllers/diskusiController");
const upload = require("../config/upload");

const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  validateDiscussionUpload,
  validateMessage,
} = require("../middlewares/validationMiddleware");
const {
  handleValidationErrors,
} = require("../middlewares/handleValidationError");

const router = express.Router();

// Create a new discussion
router.post(
  "/",
  upload.single("image"),
  authenticateToken,
  validateDiscussionUpload,
  handleValidationErrors,
  discussionController.createDiscussion
);

// Get all discussions
router.get("/", discussionController.getAllDiscussions);

// Get discussion by ID
router.get("/:id", discussionController.getDiscussionById);

// Join a discussion
router.post(
  "/:id/join",
  authenticateToken,
  discussionController.joinDiscussion
);

router.post(
  "/:id/sendMessage",
  authenticateToken,
  validateMessage,
  handleValidationErrors,
  discussionController.sendMessage
);

module.exports = router;
