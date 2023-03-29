function getSessionData(req) {
  const sessionData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionData;
} //save() will be called  automatically

function flashDataToSession(req, data, action) {
  //this can work for both signup and login

  req.session.flashedData = data;
  req.session.save(action);
}

module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
