# 💬 Crypto Chatbot with Plugins

A plugin-based chatbot built with **React** and **Node.js** that supports real-time cryptocurrency features like live price, charts, portfolio breakdown, and trending coins using the CoinGecko API.

---

## ⚙️ Features

| Command      | What it does                     |
| ------------ | -------------------------------- |
| `/price btc` | Shows current price of BTC       |
| `/chart eth` | Displays 7-day price chart       |
| `/portfolio` | Displays total value of holdings |
| `/holdings`  | Shows raw holdings as text       |
| `/trending`  | Lists top trending coins         |

---

## 🧱 Tech Stack

- **Frontend**: React + Vite + SCSS + ApexCharts
- **Backend**: Node.js + Express
- **API**: CoinGecko (price, chart, trending)
- **Storage**: Local JSON file for portfolio data

---

## 🔧 Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/yourusername/crypto-chatbot.git
cd crypto-chatbot
```

### 2. Backend Setup

cd server
npm install
npm run dev

# Server runs at http://localhost:5000

### 3. Frontend Setup

cd src
npm install
npm run dev

# Server runs at http://localhost:3000
