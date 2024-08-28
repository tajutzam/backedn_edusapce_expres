const { body } = require("express-validator");

const validateCategory = [
  body("name")
    .isString()
    .withMessage("Nama harus berupa string!")
    .notEmpty()
    .withMessage("Nama kategori tidak boleh kosong!"),
];

const validateRegister = [
  body("name")
    .isString()
    .withMessage("Nama harus berupa string!")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong!"),

  body("email")
    .isEmail()
    .withMessage("Format email tidak valid!")
    .notEmpty()
    .withMessage("Email tidak boleh kosong!"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password harus memiliki minimal 6 karakter!")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!"),

  body("role")
    .isIn(["admin", "user"])
    .withMessage('Role harus berupa "admin" atau "user"!')
    .notEmpty()
    .withMessage("Role tidak boleh kosong!"),
];

const validateExpertUpload = [
  body("name")
    .isString()
    .withMessage("Nama harus berupa string!")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong!"),

  // Validate specialization
  body("specialization")
    .isString()
    .withMessage("Spesialisasi harus berupa string!")
    .notEmpty()
    .withMessage("Spesialisasi tidak boleh kosong!"),

  // Custom validation for file upload
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("File gambar tidak boleh kosong!");
    }
    // Check file type
    const allowedExtensions = /jpeg|jpg|png/;
    const extension = req.file.mimetype.split("/")[1];
    if (!allowedExtensions.test(extension)) {
      throw new Error(
        "Format file tidak valid! Hanya gambar jpeg, jpg, dan png yang diperbolehkan."
      );
    }
    return true;
  }),
];

const validateTutorUpload = [
  body("title")
    .isString()
    .withMessage("Judul harus berupa string!")
    .notEmpty()
    .withMessage("Judul tidak boleh kosong!"),

  body("description")
    .isString()
    .withMessage("Deskripsi harus berupa string!")
    .notEmpty()
    .withMessage("Deskripsi tidak boleh kosong!"),

  body("jadwal")
    .isString()
    .withMessage("Jadwal harus berupa string!")
    .notEmpty()
    .withMessage("Jadwal tidak boleh kosong!"),

  body("price")
    .isNumeric()
    .withMessage("Harga harus berupa angka!")
    .notEmpty()
    .withMessage("Harga tidak boleh kosong!"),

  body("expert")
    .isMongoId()
    .withMessage("Expert ID harus berupa ID MongoDB yang valid!")
    .notEmpty()
    .withMessage("Expert ID tidak boleh kosong!"),

  body("category")
    .isMongoId()
    .withMessage("Category ID harus berupa ID MongoDB yang valid!")
    .notEmpty()
    .withMessage("Category ID tidak boleh kosong!"),

  body("facilities")
    .optional() // fasilitas bisa kosong
    .isArray()
    .withMessage("Fasilitas harus berupa array string!")
    .custom((facilities) => {
      return facilities.every((facility) => typeof facility === "string");
    })
    .withMessage("Setiap fasilitas harus berupa string!"),
];

const validateDiscussionUpload = [
  body("title")
    .isString()
    .withMessage("Judul harus berupa string!")
    .notEmpty()
    .withMessage("Judul tidak boleh kosong!"),

  body("description")
    .isString()
    .withMessage("Deskripsi harus berupa string!")
    .notEmpty()
    .withMessage("Deskripsi tidak boleh kosong!"),

  body("category")
    .isMongoId()
    .withMessage("Category ID harus berupa ID MongoDB yang valid!")
    .notEmpty()
    .withMessage("Category ID tidak boleh kosong!"),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("File gambar tidak boleh kosong!");
    }
    // Check file type
    const allowedExtensions = /jpeg|jpg|png/;
    const extension = req.file.mimetype.split("/")[1];
    if (!allowedExtensions.test(extension)) {
      throw new Error(
        "Format file tidak valid! Hanya gambar jpeg, jpg, dan png yang diperbolehkan."
      );
    }
    return true;
  }),
];

const validateMessage = [
  body("content").notEmpty().withMessage("Pesan tidak boleh kosong"),
];

module.exports = {
  validateCategory,
  validateRegister,
  validateExpertUpload,
  validateTutorUpload,
  validateDiscussionUpload,
  validateMessage,
};
