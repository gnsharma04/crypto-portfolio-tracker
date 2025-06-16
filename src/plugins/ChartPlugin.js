// plugins/priceChartPlugin.js
import { getPriceChart } from "../services/portfolioService";

const chartPlugin = {
  name: "chart",
  command: "/chart",
  execute: async (symbol) => {
    try {
      const response = await getPriceChart(symbol.toUpperCase());

      const data = response.data.data;

      const series = [
        {
          name: symbol.toUpperCase(),
          data: data.map(([timestamp, price]) => ({
            x: new Date(timestamp),
            y: price,
          })),
        },
      ];

      const options = {
        chart: {
          type: "line",
          height: 300,
          toolbar: { show: false },
        },
        xaxis: {
          type: "datetime",
          labels: { format: "dd MMM" },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              if (val >= 1_000_000_000)
                return `$${(val / 1_000_000_000).toFixed(2)}B`;
              if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
              if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
              return `$${val.toFixed(2)}`;
            },
          },
        },
        tooltip: {
          x: { format: "dd MMM HH:mm" },
        },
      };

      return {
        pluginName: "chart",
        type: "chart",
        symbol,
        options,
        series,
      };
    } catch (error) {
      return {
        pluginName: "chart",
        pluginData: {
          error: "❌ Failed to load chart data.",
        },
      };
    }
  },
};

export default chartPlugin;
