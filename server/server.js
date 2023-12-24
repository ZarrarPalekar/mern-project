require("dotenv").config();
const app = require("./config/middleware");
const healthRoutes = require("./routes/healthRoute");
const dataRoutes = require("./routes/dataRoute");
require("./config/db");

const PORT = process.env.PORT || 5000;

/**
 * @description health check route
 * @route http://localhost:5000/api/health/
 */
app.use("/api/health", healthRoutes);

/**
 * @description data routes for crud purpose
 * @route http://localhost:5000/api/health/
 */
app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
