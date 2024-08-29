const Discussion = require("../models/diskusiModel");
const User = require("../models/userModel");

const createDiscussion = async (req, res) => {
  const { title, description, category } = req.body;
  let imagePath = null;
  if (req.file) {
    imagePath = req.file.filename;
  }
  try {
    const newDiscussion = new Discussion({
      title,
      created_by: req.user.id,
      description,
      image: imagePath ? `/uploads/${imagePath}` : null,
      category,
      users: [],
    });

    await newDiscussion.save();
    res
      .status(201)
      .json({ data: newDiscussion, message: "Diskusi berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat diskusi", error });
  }
};

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate("category", "name")
      .populate("users", "name email")
      .populate("created_by", "name email");
    res
      .status(200)
      .json({ data: discussions, message: "Berhasil mengambil semua diskusi" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data diskusi", error });
  }
};

const getDiscussionById = async (req, res) => {
  const { id } = req.params;
  try {
    const discussion = await Discussion.findById(id)
      .populate("category", "name")
      .populate("users", "name email")
      .populate({
        path: "messages.sender",
        select: "name email",
      })
      .populate("created_by", "name email");

    if (!discussion) {
      return res.status(404).json({ message: "Diskusi tidak ditemukan" });
    }

    res
      .status(200)
      .json({ data: discussion, message: "Berhasil mengambil detail diskusi" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail diskusi", error });
  }
};

const joinDiscussion = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: "Diskusi tidak ditemukan" });
    }

    if (discussion.users.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Anda sudah bergabung dalam diskusi ini" });
    }
    discussion.users.push(userId);
    await discussion.save();
    res
      .status(200)
      .json({ data: discussion, message: "Berhasil bergabung dalam diskusi" });
  } catch (error) {
    res.status(500).json({ message: "Gagal bergabung dalam diskusi", error });
  }
};

const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const sender = req.user.id;

  try {
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: "Diskusi tidak ditemukan" });
    }

    if (!discussion.users.includes(sender)) {
      return res
        .status(403)
        .json({ message: "Anda tidak terdaftar dalam diskusi ini" });
    }

    const message = {
      sender,
      content,
    };

    discussion.messages.push(message);
    await discussion.save();

    res.status(201).json({ data: message, message: "Pesan berhasil dikirim" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengirim pesan", error });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findByIdAndDelete(id);
    if (!discussion) {
      return res.status(404).json({ message: "Diskusi tidak ditemukan" });
    }
    return res.status(200).json({ message: "Diskusi berhasil dihapus" });
  } catch (error) {
    return res.status(404).json({ message: "Diskusi tidak ditemukan" });
  }
};

module.exports = {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  joinDiscussion,
  sendMessage,
  deleteDiscussion,
};
