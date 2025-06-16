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
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );

    const data = response.data;
    const price = data.market_data?.current_price?.usd;
    const name = data.name;
    const logo = data.image?.thumb || data.image?.small || data.image?.large;

    if (!price) {
      return res.status(404).json({ error: "Price data not found." });
    }

    return res.json({
      symbol,
      coinId,
      name,
      price,
      logo,
      currency: "USD",
    });
  } catch (err) {
    console.error("API error:", err.message);
    return res.status(500).json({ error: "Failed to fetch coin data." });
  }
});

module.exports = router;
