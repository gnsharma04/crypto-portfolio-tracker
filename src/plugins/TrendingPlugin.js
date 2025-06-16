import { getTrendingCoins } from "../services/portfolioService";

const trendingPlugin = {
  name: "trending",
  command: "/trending",
  execute: async () => {
    try {
      const { data } = await getTrendingCoins();

      return {
        pluginName: "trending",
        coins: data.trending,
      };
    } catch {
      return {
        pluginName: "trending",
        pluginData: {
          error: "❌ Failed to load trending coins.",
        },
      };
    }
  },
};

export default trendingPlugin;
