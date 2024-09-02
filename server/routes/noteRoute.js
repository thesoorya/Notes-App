const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/protectroute');

const {
    createNote,
    editNote,
    deleteNote,
    getNotes
} = require('../controllers/noteController');

router.post('/', protectRoute, createNote);
router.get('/', protectRoute, getNotes);
router.put('/', protectRoute, editNote);
router.delete('/', protectRoute, deleteNote);

module.exports = router;
