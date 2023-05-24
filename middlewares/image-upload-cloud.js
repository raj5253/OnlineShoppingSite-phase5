const multer = require("multer");

const storage = multer.memoryStorage(); //save the file to memory(ram)

const upload = multer({ storage });
const singleUpload = upload.single("image"); //image is the dom-name of that element

module.exports = singleUpload;
