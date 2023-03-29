// this middleware is for deafult error handler,  to be added in app.js

function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code === 404) {
    return res.status(404).render("shared/404");
  }
  res.status(500).render("shared/500.ejs");
}

module.exports = handleErrors;
//500 : some error on sever side
// 404 : server has accepted the req, but couldn;t find the requested resources on srverside
