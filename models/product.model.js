const db = require("../database/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title; //same name as  in form
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; //the name of the image file.
    this.imageUrl = productData.imageUrl; //cloudinary secure_url
    if (productData._id) {
      this.id = productData._id.toString(); //used while rendering all products uniquely, findAll()
    }
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
      imageUrl: this.imageUrl,
    };

    if (this.id) {
      //update existing  product
      const prodId = new mongodb.ObjectId(this.id);
      if (!this.image) {
        //no new image uploaded, then prevent exsisting to be overwritten by undefined
        delete productData.image; //delete the keypair
        delete productData.imageUrl;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: prodId }, { $set: productData });
    } else {
      //save for first time
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (productData) {
      return new Product(productData);
    });
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      console.log("error id not generted");
      throw error;
    }

    const product = await db //a promise
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Could not find product with provided id.");
      error.code = 404;
      throw error;
    }
    return new Product(product); //you return a class
  }

  async replaceImage(newImage, newUrl) {
    this.image = newImage;
    this.imageUrl = newUrl;
    // this.updateImageData();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  } // it wont delete the product-image

  static async findMultiple(ids) {
    //used in updating the cart item prices as per new prices of product.
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
}

module.exports = Product;

/* the name of new image is different from existing image. Both of them are there. 
IF want, you can write logic to extract name of existing image, assign that name to new image, which results in overwrite of image. */
