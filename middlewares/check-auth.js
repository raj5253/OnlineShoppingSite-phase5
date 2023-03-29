function checkAuthStatus(req, res, next) {
  const uid = req.session.uid; //if user not logedin, i.e., unauthenticated, then uid will be undefined

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;

// use this in app.js
