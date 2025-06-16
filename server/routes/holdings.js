const express = require("express");
const fs = require("fs");
const { FILE_PATH, loadHoldings, SYMBOL_TO_ID } = require("../data/constants");
const router = express.Router();

// POST /api/holdings
router.post("/", async (req, res) => {
  let { symbol, amount } = req.body;

  if (typeof symbol !== "string" || typeof amount !== "number") {
    return res.status(400).json({ error: "Invalid symbol or amount." });
  }

  symbol = symbol.toUpperCase();

  if (!SYMBOL_TO_ID[symbol]) {
    return res
      .status(400)
      .json({ error: `Symbol "${symbol}" is not supported.` });
  }

  const holdings = loadHoldings(FILE_PATH);
  holdings[symbol] = amount;

  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(holdings, null, 2));
    res.status(201).json({ message: "Holding saved successfully." });
  } catch (err) {
    console.error("Error saving holding:", err.message);
    res.status(500).json({ error: "Failed to save holding." });
  }
});

// GET /api/holdings
router.get("/", async (req, res) => {
  try {
    const holdings = loadHoldings(FILE_PATH);
    res.json(holdings);
  } catch (err) {
    console.error("Error reading holdings:", err.message);
    return res.status(500).json({ error: "Failed to access the holdings." });
  }
});

module.exports = router;
