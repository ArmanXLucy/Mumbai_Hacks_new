import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_KEY = "d3nqqvhr01qtm4jdu03gd3nqqvhr01qtm4jdu040"; 
export default function LiveTicker() {
  const [quotes, setQuotes] = useState({});

  const fetchData = async () => {
    const symbols = {
      BTCUSD: "BINANCE:BTCUSDT",
      ETHUSD: "BINANCE:ETHUSDT",
      EURUSD: "OANDA:EUR_USD",
      GBPUSD: "OANDA:GBP_USD",
      AAPL: "AAPL",
      MSFT: "MSFT",
    };

    const results = {};
    for (const [key, value] of Object.entries(symbols)) {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${value}&token=${API_KEY}`
        );
        const data = await res.json();
        results[key] = data;
      } catch (err) {
        console.error("Error fetching", key, err);
      }
    }
    setQuotes(results);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  const items = Object.entries(quotes)
    .map(([symbol, data]) => {
      if (!data) return null;
      const change = data.dp || 0;
      const color = change >= 0 ? "#00ff6a" : "#ff4040";
      return (
        <div key={symbol} className="flex items-center gap-2 px-6">
          <span className="text-yellow-400 font-semibold">{symbol}</span>
          <span className="text-white">${data.c?.toFixed(2)}</span>
          <span style={{ color }}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
          </span>
        </div>
      );
    })
    .filter(Boolean);

  return (
    <div className="relative w-full overflow-hidden bg-black border-b border-yellow-400/30 py-2 shadow-lg">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {items}
        {items}
        {items}
      </motion.div>
    </div>
  );
}