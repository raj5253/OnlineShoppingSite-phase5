const path = require("path");
const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const authRoutes = require("./routes/auth.routes");
const db = require("./database/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-tokens");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const createSessionConfig = require("./config/session");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const adminRoutes = require("./routes/admin.routes");
const protectRoutes = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");
const updateCartPrices = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");
const app = express();

const sessionConfig = createSessionConfig();

app.set("view engine", "ejs"); //set veiw engine as ejs
app.set("views", path.join(__dirname, "views")); //make contents of view folder aviable public. Now they can be accessed in rotuers->controllers

app.use(express.static("public")); //make public folder accessible
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false })); //send data from ejs-froms to backend
app.use(express.json()); // for sending json data to backend, fetch in cart

app.use(expressSession(sessionConfig)); //  created session after csrf and csrf is dependent on session
app.use(csrf());
app.use(cartMiddleware); //creating the cart
app.use(updateCartPrices);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
// app.use(protectRoutes);
app.use("/orders", protectRoutes, ordersRoutes); //only to auth users
app.use("/admin", protectRoutes, adminRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); //makes the task easy for error indentification

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database!");
    console.log(error);
  });

// app.listen(3000);

// path.join( args)  creates an absolute path, by concatenating all the args

// connectToDatabase() is async func , and returna promise
