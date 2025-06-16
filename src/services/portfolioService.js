import API from "../API.js";

// POST: Add or update a holding
export const addHolding = (symbol, amount) =>
  API.post("/holdings", { symbol, amount });

// GET: Raw holdings
export const getHoldings = () => API.get("/holdings");

// GET: Portfolio breakdown
export const getPortfolio = () => API.get("/portfolio");

// GET: Price by symbol
export const getPrice = (symbol) => API.get(`/price/${symbol}`);

// GET: Price Chart Trends for a coin
export const getPriceChart = (symbol) => API.get(`/chart/${symbol}`);

//GET: Top trending coins
export const getTrendingCoins = async () => {
  return API.get("/trending");
};
