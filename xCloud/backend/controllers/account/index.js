const bcrypt = require("bcrypt");
const { getToken } = require("../../common/Auth");
const { query } = require("../../db");
const saltRounds = 10;

module.exports.login = async (req, res) => {
  try {
    // query user by username
    const checkUser = await query(
      `SELECT * FROM account WHERE username = '${req.body.username}';`,
    );
    // return if user doesn't exist
    if (checkUser.rowCount === 0) {
      return res.status(201).json({
        msg: "User doesn't exist!",
      });
    }

    // check if the password is correct
    await bcrypt
      .compare(req.body.password, checkUser.rows[0].password)
      .then(async (isEqual) => {
        if (isEqual) {
          // generate access token
          const accessToken = await getToken({
            _id: checkUser.rows[0]._id,
          });

          // update jwt token
          await query(
            `UPDATE account SET token = '${accessToken}' WHERE username = '${req.body.username}';`,
          );

          // create data that is to sent to frontend
          const rawdata = await query(
            `SELECT * FROM account WHERE username = '${req.body.username}';`,
          );
          // delete critical data
          const data = rawdata.rows[0];
          delete data.password;
          delete data.secretquestion;
          delete data.secretanswer;

          // return sucessfull response with user data
          return res
            .status(200)
            .json({ user: data, msg: "Login sucessfull", status: "SUCESS" });
        } else
          return res.status(201).json({
            msg: "Password doesn't match!",
            status: "FAILED",
          });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(400).json({
          msg: "Login failed",
          status: "FAILED",
        });
      });
  } catch (error) {
    return res.status(400).json({
      error: "Error while logging in",
    });
  }
};

module.exports.register = async (req, res) => {
  try {
    const result = await query(
      `SELECT username FROM account WHERE username = '${req.body.username}';`,
    );
    if (result.rowCount !== 0) {
      return res.status(200).json({
        msg: "User already exists!",
        status: "FAILED",
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
        return bcrypt.hash(req.body.secretanswer, salt);
      })
      .then((hash) => {
        secretAnsHash = hash;
      })
      .catch((err) => console.error(err.message));

    await query(
      `INSERT INTO account(username, password, secretquestion, secretanswer, token) VALUES ('${req.body.username}', '${passHash}', '${req.body.secretquestion}', '${secretAnsHash}', '');`,
    );

    return res
      .status(200)
      .json({ msg: "Registered sucessfully", status: "SUCESS" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Error while registring",
      status: "FAILED",
    });
  }
};

module.exports.forgot_password = async (req, res) => {
  try {
    // query user by username
    const checkUser = await query(
      `SELECT * FROM account WHERE username = '${req.body.username}';`,
    );
    // return if user doesn't exist
    if (checkUser.rowCount === 0) {
      return res.status(201).json({
        msg: "User doesn't exist!",
      });
    }

    // check if the secretanswer is correct
    await bcrypt
      .compare(req.body.secretanswer, checkUser.rows[0].secretanswer)
      .then(async (isEqual) => {
        if (isEqual) {
          // set new password
          let passHash = "";

          await bcrypt
            .genSalt(saltRounds)
            .then((salt) => {
              return bcrypt.hash(req.body.password, salt);
            })
            .then((hash) => {
              passHash = hash;
            })
            .catch((err) => console.error(err.message));

          await query(
            `UPDATE account SET password = '${passHash}' WHERE username = '${req.body.username}';`,
          );

          // return sucessfull response with user data
          return res
            .status(200)
            .json({ msg: "Password changed sucessfully", status: "SUCESS" });
        } else
          return res.status(201).json({
            msg: "Secret answer doesn't match!",
            status: "FAILED",
          });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(400).json({
          msg: "Password changing failed",
          status: "FAILED",
        });
      });
  } catch (error) {
    return res.status(400).json({
      error: "Error while registring",
      status: "FAILED",
    });
  }
};
