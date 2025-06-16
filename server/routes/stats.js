const express = require("express");
const axios = require("axios");
const SYMBOL_TO_ID = require("../data/constants");

const router = express.Router();

router.get("/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const coinId = SYMBOL_TO_ID[symbol];

  if (!coinId) {
    return res.status(400).json({ error: `Unsupported symbol: ${symbol}` });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const response = await axios.get(url);

    const coinData = response.data;

    return res.json({
      symbol: symbol,
      market_cap: coinData.market_data.market_cap.usd,
      change_percentage: coinData.market_data.price_change_percentage_24h,
      description: coinData.description.en.split(".")[0] + ".",
    });
  } catch (err) {
    console.error("API error:", err.message);
    return res.status(500).json({ error: "Failed to fetch description." });
  }
});

module.exports = router;
