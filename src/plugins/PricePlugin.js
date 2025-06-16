import { getPrice } from "../services/portfolioService"; // your own API wrapper

const pricePlugin = {
  name: "price",
  command: "/price",

  execute: async (argsLine) => {
    const symbol = argsLine.trim().toLowerCase();
    if (!symbol) {
      return {
        error: "Usage: /price SYMBOL\nExample: /price BTC",
      };
    }

    try {
      const response = await getPrice(symbol);
      const res = response.data;
      return {
        name: res.name,
        symbol: res.symbol,
        price: res.price,
        logo: res.logo,
        coinId: res.coinId,
        currency: res.currency,
      };
    } catch (err) {
      return {
        error: err.response?.data?.error || "Failed to fetch price.",
      };
    }
  },
};

export default pricePlugin;
