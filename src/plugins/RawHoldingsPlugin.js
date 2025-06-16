import { getHoldings } from "../services/portfolioService";

const rawHoldingsPlugin = {
  name: "holdings",
  command: "/holdings",
  execute: async () => {
    try {
      const response = await getHoldings();
      const holdings = response.data;

      if (!Object.keys(holdings).length) {
        return { error: "No holdings found." };
      }

      const list = Object.entries(holdings).map(
        ([symbol, amount]) => `${symbol.toUpperCase()}: ${amount}`
      );

      return {
        type: "holdings",
        list,
      };
    } catch (error) {
      return {
        error: "Failed to fetch holdings.",
        details: error.message,
      };
    }
  },
};

export default rawHoldingsPlugin;
