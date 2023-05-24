const cloudinary = require("cloudinary").v2;

// configuration
function cloudConfig(req, res, next) {
  cloudinary.config({
    cloud_name: "ddgpjpaub",
    api_key: "532171226851372",
    api_secret: "zjY3t-B4HjZiQ362mKfHReTXAOo",
  });
  next();
}

//waise, this file should be in middleware folder. bc app.use(accepts only middleware fucntions)
// dont forget next, else page kabhi kulega hi nahi
module.exports = cloudConfig;
