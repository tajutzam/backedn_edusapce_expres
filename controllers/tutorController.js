const Tutor = require("../models/tutorModel");
const path = require("path");

const createTutor = async (req, res) => {
  const { title, description, jadwal, price, expert, category, facilities } =
    req.body;
  let imagePath = null;

  console.log(facilities);

  if (req.file) {
    imagePath = req.file.filename;
  }

  if (typeof facilities === "string") {
    facilities = facilities.split(",");
  }

  try {
    const newTutor = new Tutor({
      title,
      description,
      jadwal,
      price,
      image: imagePath ? `/uploads/${imagePath}` : null, // Path to image
      expert,
      category,
      facilities: facilities, // Split comma-separated facilities if they are sent as a string
    });
    await newTutor.save();
    res.status(201).json(newTutor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating tutor", error });
  }
};

// Update tutor
const updateTutor = async (req, res) => {
  const { id } = req.params;
  const { title, description, jadwal, price, expert, category, facilities } =
    req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.filename;
  }

  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      {
        title,
        description,
        jadwal,
        price,
        image: imagePath ? `/uploads/${imagePath}` : undefined,
        expert,
        category,
        facilities: facilities ? facilities.split(",") : [],
      },
      { new: true, runValidators: true }
    );
    if (!updatedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json(updatedTutor);
  } catch (error) {
    res.status(500).json({ message: "Error updating tutor", error });
  }
};

// Get all tutors
const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find().populate("expert").populate("category");
    res
      .status(200)
      .json({ data: tutors, message: "success fetch data tutors" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tutors", error });
  }
};

// Get tutor by ID
const getTutorById = async (req, res) => {
  const { id } = req.params;
  try {
    const tutor = await Tutor.findById(id)
      .populate("expert")
      .populate("category");
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json({ data: tutor, message: "success get tutor" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tutor", error });
  }
};

// Delete tutor
const deleteTutor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTutor = await Tutor.findByIdAndDelete(id);
    if (!deletedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tutor", error });
  }
};

module.exports = {
  getAllTutors,
  getTutorById,
  createTutor,
  deleteTutor,
  updateTutor,
};
