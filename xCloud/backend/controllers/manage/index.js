const { Login } = require("../../data");

module.exports.renderManage = async (req, res) => {
  try {
    if (!Login.status) {
      return res.redirect("/login");
    }

    res.render("manage", { username: Login.data.username || "User" });
  } catch (error) {
    return res.status(400).json({
      error: "Error while logging in",
    });
  }
};

module.exports.addProject = async (req, res) => {
  try {
    console.log(req);

    return res.status(400).json({ asdf: "asdf" });
  } catch (error) {
    return res.status(400).json({
      error: "Error while logging in",
    });
  }
};
