// for managing adminstation related pages.
const Product = require("../models/product.model");
const Order = require("../models/oders.model");
const productImgUpload = require("../util/cloudimgupload");
const getDataUri = require("../util/dataUri");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error); //500
    return;
  }
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  console.log(req.body);
  console.log(req.file);

  const file = req.file; //multer
  const fileUri = getDataUri(file); //DataUriParser  //a uri, which is only in scope of the memory, not the disk
  const imgUploadData = await productImgUpload(
    file.orginalname,
    fileUri.content
  );

  const product = new Product({
    ...req.body,
    image: imgUploadData.public_id,
    imageUrl: imgUploadData.secure_url,
  });

  try {
    await product.save();
  } catch (error) {
    next(error); //triggers error handler-500
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id); //a class object
    res.render("admin/products/update-product.ejs", { product: product });
    // console.log(product);
  } catch (error) {
    next(error);
    return;
  }
}
async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    const file = req.file; //multer
    const fileUri = getDataUri(file); //DataUriParser
    const imgUploadData = await productImgUpload(
      file.orginalname,
      fileUri.content
    );
    // replace the old image info with the new ones
    product.replaceImage(imgUploadData.public_id, imgUploadData.secure_url);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id); //a class object
    await product.remove();
  } catch (error) {
    return next(error);
  }
  // res.redirect("/admin/products");
  res.json({ message: "Deleted Product successfully" });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  deleteProduct: deleteProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
