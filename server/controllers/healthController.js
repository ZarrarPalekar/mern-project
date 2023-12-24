const healthCheck = async (req, res) => {
  try {
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { healthCheck };
