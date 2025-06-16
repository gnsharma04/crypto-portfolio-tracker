const fs = require("fs");
const path = require("path");

const SYMBOL_TO_ID = {
  BTC: "bitcoin",
  ETH: "ethereum",
  MATIC: "matic-network",
  ADA: "cardano",
  DOGE: "dogecoin",
  BNB: "binancecoin",
  XRP: "ripple",
  SOL: "solana",
  DOT: "polkadot",
  LTC: "litecoin",
};

//JSON file path
const FILE_PATH = path.join(__dirname, "../data/holdings.json");

// Helper: Load holdings safely
function loadHoldings(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    return {};
  }

  const raw = fs.readFileSync(filePath, "utf-8").trim();

  if (raw.length === 0) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Invalid JSON in holdings file. Resetting...");
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    return {};
  }
}

module.exports = {
  SYMBOL_TO_ID,
  FILE_PATH,
  loadHoldings,
};
