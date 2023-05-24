const cloudinary = require("cloudinary").v2;

async function productImgUpload(filename, uri) {
  try {
    const result = await cloudinary.uploader.upload(uri, {
      resource_type: "image",
      public_id: filename,
      upload_preset: "onlineShop",
      folder: "online-shop/products",
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error in cloud-imgupload.js: ", error);
    return;
  }
}

module.exports = productImgUpload;

//make sure the DataUriParser fucntionality is in different module.
