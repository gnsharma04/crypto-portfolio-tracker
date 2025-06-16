import { getPortfolio } from "../services/portfolioService";

const portfolioPlugin = {
  name: "portfolio",
  command: "/portfolio",
  execute: async () => {
    try {
      const { data } = await getPortfolio();

      const result = data.breakdown.map((coin) => ({
        symbol: coin.symbol,
        name: coin.name,
        amount: coin.amount,
        price: coin.price,
        value: coin.value.toFixed(2),
        logo: coin.logo,
      }));

      return {
        pluginName: "portfolio",
        pluginData: {
          type: "portfolio",
          breakdown: result,
          total: data.total_value.toFixed(2),
        },
      };
    } catch {
      return { error: "❌ Failed to fetch portfolio." };
    }
  },
};

export default portfolioPlugin;
