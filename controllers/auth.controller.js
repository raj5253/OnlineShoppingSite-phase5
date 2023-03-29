const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      street: "",
      postal: "",
      city: "",
    }; //if made null, validation becomes more complex
  }

  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  //validate the signup-form
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    validation.emailIsConfirmed(req, req.body.email, req.body["confirm-email"])
  ) {
    //flash error msg
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be 6 chars long, postal code shold be 6 chars long",
        ...enteredData, //passing wrongly-previous-entered data to the user in the page again
      },
      () => {
        res.redirect("/signup"); //action
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();

    //if user exits=> redirect + flash error msg
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User exists Already! Try login instead!",
          ...enteredData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signup(); //as signup is async //******  the Actual task
  } catch (error) {
    next(error); //next makes default errorhandler middleware active, ie,render 500
    return;
  }
  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("customer/auth/login", { inputData: sessionData }); //render + send sessionData to the view
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  //find user with this email
  let existingUser;
  try {
    existingUser = await user.getUserwithSameEmail(); //existingUser is a promise,not User instance
  } catch (error) {
    next(error);
    returns;
  }

  // if not found=> redirect + flash error msg
  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "User doesnot exists - please check your email",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  // when user exists => match passwords
  // console.log(existingUser);
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  // if incorrect password => redirect + flash error msg
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Incorrect password - please check your password",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
  }
  //password correct => create session for user //the main part
  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
}

async function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
