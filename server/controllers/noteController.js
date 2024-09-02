const Note = require("../model/noteModel");
const User = require("../model/userModel");

exports.createNote = async (req, res) => {
    const { title, content } = req.body;

    try {
        if (!title || !content) {
            return res.status(400).json({ status: false, message: "Title and content are required" });
        }

        const newNote = new Note({
            title,
            content,
            userId: req.user._id
        });

        await newNote.save();
        res.status(201).json({ success: true, note: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const note = await Note.findOne({ _id: id, userId: req.user._id });
        if (!note) {
            return res.status(404).json({ status: false, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;

        await note.save();
        res.status(200).json({ success: true, note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!note) {
            return res.status(404).json({ status: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, message: "Note deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};
