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
