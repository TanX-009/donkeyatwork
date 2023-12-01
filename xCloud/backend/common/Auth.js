const jwt = require("jsonwebtoken");
const { query } = require("../db");

module.exports.getToken = async (data) =>
  jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });

module.exports.verifyToken = (token) =>
  jwt.verify(token, process.env.SECRET_KEY);

module.exports.verifyUser = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");

    const decoded = this.verifyToken(token);

    const checkUser = await query(
      `SELECT * FROM account WHERE username = '${req.body.username}';`,
    );
    // const doc = await Model.Farmer.Farmer.findOne({
    //   _id: decoded._id,
    //   accessToken: token,
    // }).lean();

    // if (!doc) throw new Error("INVALID_TOKEN");

    // req.user = doc;
    next();
  } catch (error) {
    console.error(error);
    const message =
      String(error.name).toLowerCase() === "error"
        ? error.message
        : "UNAUTHORIZED_ACCESS";
    return res.status(401).json({ message });
  }
};

module.exports.verifyUserSession = async (req, res) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");

    const decoded = this.verifyToken(token);

    // const doc = await Model.Farmer.Farmer.findOne({
    //   _id: decoded._id,
    //   accessToken: token,
    // }).lean();
    // if (!doc) {
    //   res.status(200).json({ msg: "Session Invalid" });
    // } else
    //   return res.status(200).json({ msg: "Session Verified Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Failed to verify session" });
  }
};
