const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: "product-data/images", //you should create this directory
    filename: function (req, file, cb) {
      cb(null, uuid() + file.originalname);
    },
  }),
}); //certain configurations

const configuredMulterMiddleware = upload.single("image"); //'image' is dom-name of element in form, which stored file.

module.exports = configuredMulterMiddleware;

//this middleware wil be used in admin.routes.js
//this middleware will not be used in app.js .
