const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/search/trending";
    const response = await axios.get(url);

    const trendingCoinsList = response.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        symbol: coin.item.symbol,
        market_cap_rank: coin.item.market_cap_rank,
        thumb_img: coin.item.thumb,
      };
    });

    return res.json({
      trending: trendingCoinsList,
    });
  } catch (err) {
    console.error("API error: ", err.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch trending coins list." });
  }
});

module.exports = router;
