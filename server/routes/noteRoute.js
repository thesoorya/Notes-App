const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/protectroute");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.post("/", protectRoute, createNote);
router.get("/", protectRoute, getNotes);
router.put("/:id", protectRoute, updateNote);
router.delete("/:id", protectRoute, deleteNote);

module.exports = router;
