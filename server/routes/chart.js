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
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;
    const response = await axios.get(url);

    const price_list = response.data.prices;

    return res.json({
      symbol: symbol,
      data: price_list,
    });
  } catch (err) {
    console.error("API error:", err.message);
    return res
      .status(err.status)
      .json({ error: "Failed to fetch description." });
  }
});

module.exports = router;
