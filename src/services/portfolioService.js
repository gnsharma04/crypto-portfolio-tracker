import API from "../API.js";

// POST: Add or update a holding
export const addHolding = (symbol, amount) =>
  API.post("/holdings", { symbol, amount });

// GET: Raw holdings
export const getHoldings = () => API.get("/holdings");

// GET: Portfolio breakdown
export const getPortfolio = () => API.get("/portfolio");
