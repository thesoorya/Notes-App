const User = require("../model/userModel");

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user._id;

  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ status: false, message: "Title and content are required" });
    }

    const note = {
      title,
      content
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { notes: note } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Note created successfully",
        notes: user.notes, 
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.editNote = async (req, res) => {
  const { noteId, title, content } = req.body;
  const userId = req.user._id;

  try {
    if (!noteId || !title || !content) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Note ID, title, and content are required",
        });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, 'notes._id': noteId },
      { $set: { 'notes.$.title': title, 'notes.$.content': content } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or note not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Note updated successfully",
        notes: user.notes,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  const { noteId } = req.body;
  const userId = req.user._id;

  try {
    if (!noteId) {
      return res
        .status(400)
        .json({ status: false, message: "Note ID is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Note deleted successfully",
        notes: user.notes,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.getNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, notes: user.notes }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
