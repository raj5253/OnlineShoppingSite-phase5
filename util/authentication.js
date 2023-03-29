function createUserSession(req, user, action) {
  req.session.uid = user._id.toString(); //MongoDb id
  req.session.isAdmin = user.isAdmin;
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  req.session.uid = null;
  // req.session.save(); //required when action needed .else expression-session  save automatically.
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};

//Remember: csrfTokens are stored in res.locals.csrfTokens
//              session is stored in res.session
//  we had created expression-session.
//  Now we create user session in that session. i.e, store user data in the session.

//perfrom action after session is stored
