function notFoundHandler(req, res) {
  res.render("shared/404");
}
// to be used when the requested url is not found.
// use it just before deafult ErrorHandlerMiddleware in app.js

module.exports = notFoundHandler;
