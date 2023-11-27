const { Login } = require("../../data");
const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.login = async (req, res) => {
  try {
    const checkUser = await db.query(
      `SELECT * FROM account WHERE username = '${req.body.username}';`,
    );
    console.log(checkUser);
    if (checkUser.rowCount === 0) {
      return res.render("account/login", {
        message: "User doesn't exist!",
      });
    }

    bcrypt
      .compare(req.body.password, checkUser.rows[0].password)
      .then((isEqual) => {
        if (isEqual) {
          Login.status = true;
          Login.data = {
            _id: checkUser.rows[0]._id,
            username: checkUser.rows[0].username,
          };
          return res.redirect("/manage");
        } else
          return res.render("account/login", {
            message: "Password doesn't match!",
          });
      })
      .catch((err) => console.error(err.message));
  } catch (error) {
    return res.status(400).json({
      error: "Error while logging in",
    });
  }
};

module.exports.register = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT username FROM account WHERE username = '${req.body.username}';`,
    );
    if (result.rowCount !== 0) {
      return res.render("account/register", {
        message: "User already exists!",
      });
    }

    let passHash = "";
    let secretAnsHash = "";

    await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(req.body.password, salt);
      })
      .then((hash) => {
        passHash = hash;
      })
      .catch((err) => console.error(err.message));
    await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(req.body.secretAnswer, salt);
      })
      .then((hash) => {
        secretAnsHash = hash;
      })
      .catch((err) => console.error(err.message));

    await db.query(
      `INSERT INTO account(username, password, secretQuestion, secretAnswer) VALUES ('${req.body.username}', '${passHash}', '${req.body.secretQuestion}', '${secretAnsHash}');`,
    );

    return res.status(200).redirect("/login");
  } catch (error) {
    return res.status(400).json({
      error: "Error while registring",
    });
  }
};
