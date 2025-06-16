const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🟢 Crypto Assistant API is running!");
});

//Routes
app.use("/api/price", require("./routes/price"));

app.use("/api/trending", require("./routes/trending"));

app.use("/api/stats", require("./routes/stats"));

app.use("/api/chart", require("./routes/chart"));

app.use("/api/holdings", require("./routes/holdings"));

app.use("/api/portfolio", require("./routes/portfolio"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
