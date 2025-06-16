import { addHolding } from "../services/portfolioService";

const addPlugin = {
  name: "AddHolding",
  command: "/add",
  execute: async (argsLine) => {
    const match = argsLine.match(/^(\w+)\s+([\d.]+)$/);
    if (!match) {
      return {
        error: "Usage: /add SYMBOL AMOUNT\nExample: /add BTC 0.5",
      };
    }

    const [, symbol, amountStr] = match;
    const amount = parseFloat(amountStr);

    try {
      await addHolding(symbol, amount);
      return { success: `✅ Added ${amount} ${symbol.toUpperCase()}` };
    } catch (err) {
      return {
        error: err.response?.data?.error || "Failed to add holding.",
      };
    }
  },
};

export default addPlugin;
