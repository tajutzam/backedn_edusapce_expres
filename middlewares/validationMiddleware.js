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

module.exports = {
  validateCategory,
  validateRegister,
  validateExpertUpload
};
