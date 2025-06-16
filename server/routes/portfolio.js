const express = require("express");
const axios = require("axios");
const { FILE_PATH, SYMBOL_TO_ID, loadHoldings } = require("../data/constants");

const router = express.Router();

router.get("/", async (req, res) => {
  const holdings = loadHoldings(FILE_PATH);
  const coinList = Object.entries(holdings)
    .map(([symbol]) => SYMBOL_TO_ID[symbol])
    .filter(Boolean);

  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinList.join(
      ","
    )}`;

    const response = await axios.get(url);

    let total_value = 0;

    const breakdown = response.data.map((coin) => {
      const amount = holdings[coin.symbol.toUpperCase()];
      const value = coin.current_price * amount;
      total_value += value;

      return {
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        amount,
        value,
        logo: coin.image,
      };
    });

    return res.json({ total_value, breakdown });
  } catch (err) {
    console.error("Error reading holdings:", err.message);
    return res.status(500).json({ error: "Failed to access the holdings." });
  }
});

module.exports = router;
