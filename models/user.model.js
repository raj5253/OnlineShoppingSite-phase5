const bcrypt = require("bcryptjs");

const db = require("../database/database");
const mongodb = require("mongodb");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postal: postal,
      city: city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword, // ? hashing
      fullname: this.fullname,
      address: this.address, // in SQL, a seprate table for address, and use address_id here. NoSQL is better as allow nested data.
    });
  }

  getUserwithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email }); //returns a promise //its related to db
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword); //returns a promise// hashedPassword is the password entered in login page.
  }

  async existsAlready() {
    const existingUser = await this.getUserwithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }
}

module.exports = User;
