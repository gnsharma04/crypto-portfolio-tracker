const express = require("express");
const axios = require("axios");
const { SYMBOL_TO_ID } = require("../data/constants");

const router = express.Router();

router.get("/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const coinId = SYMBOL_TO_ID[symbol];

  if (!coinId) {
    return res.status(400).json({ error: `Unsupported symbol: ${symbol}` });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price`;
    const response = await axios.get(url, {
      params: {
        ids: coinId,
        vs_currencies: "usd",
      },
    });

    const price = response.data[coinId]?.usd;

    if (!price) {
      return res.status(404).json({ error: "Price data not found." });
    }

    return res.json({
      symbol,
      coinId,
      price,
      currency: "USD",
    });
  } catch (err) {
    console.error("API error:", err.message);
    return res.status(500).json({ error: "Failed to fetch price." });
  }
});

module.exports = router;
