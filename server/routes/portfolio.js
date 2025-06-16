const express = require("express");
const axios = require("axios");
const { FILE_PATH, SYMBOL_TO_ID, loadHoldings } = require("../data/constants");

const router = express.Router();

router.get("/", async (req, res) => {
  let coinList = [];

  const holdings = loadHoldings(FILE_PATH);

  for (const [symbol, quantity] of Object.entries(holdings)) {
    const id = SYMBOL_TO_ID[symbol];
    coinList.push(id);
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinList}&vs_currencies=usd`;

    const response = await axios.get(url);
    const data = response.data;

    let breakdown = [];
    let total_value = 0;

    for (const [symbol, amount] of Object.entries(holdings)) {
      const id = SYMBOL_TO_ID[symbol];
      const price = data[id]?.usd;
      if (!price) continue;

      const value = amount * price;
      breakdown.push({ symbol, amount, price, value });
      total_value += value;
    }

    return res.json({ total_value, breakdown });
  } catch (err) {
    console.error("Error reading holdings:", err.message);
    return res.status(500).json({ error: "Failed to access the holdings." });
  }
});

module.exports = router;
