const login = async (req, res) => {
    res.status(200).json({ message: "User logged in successfully" });
  };
  
  module.exports = { login };
  