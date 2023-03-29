function protectRoutes(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }

  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/401");
  }

  next();
}

module.exports = protectRoutes;

//401 : not authenticated
//403 : not authorized
