/**
 * TradingView HTTP Bridge
 *
 * Exposes TradingView chart data over HTTP so the trading backend (Docker)
 * can fetch OHLCV candles via host.docker.internal:3333.
 *
 * Usage: node http-bridge.js
 * Requires: TradingView Desktop running with --remote-debugging-port=9222
 */

import express from 'express';
import * as data from './src/core/data.js';
import * as chart from './src/core/chart.js';
import { getClient } from './src/connection.js';

const app = express();
const PORT = process.env.TV_BRIDGE_PORT || 3333;

app.get('/health', async (req, res) => {
  try {
    await getClient();
    const state = await chart.getState();
    res.json({
      success: true,
      connected: true,
      symbol: state.symbol,
      resolution: state.resolution,
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      connected: false,
      error: err.message,
    });
  }
});

app.get('/ohlcv', async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const timeframe = req.query.timeframe;
    const count = parseInt(req.query.count) || 200;

    // Get current state to check if we need to switch
    const currentState = await chart.getState();

    // Switch symbol if needed
    if (symbol && !currentState.symbol?.toUpperCase().includes(symbol.toUpperCase().replace('NSE:', ''))) {
      await chart.setSymbol({ symbol });
    }

    // Switch timeframe if needed
    if (timeframe && currentState.resolution !== String(timeframe)) {
      await chart.setTimeframe({ timeframe: String(timeframe) });
    }

    // Fetch OHLCV
    const result = await data.getOhlcv({ count });

    res.json({
      success: true,
      symbol: symbol || currentState.symbol,
      timeframe: timeframe || currentState.resolution,
      count: result.bars?.length || 0,
      bars: result.bars || [],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`TradingView HTTP Bridge running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`OHLCV:  http://localhost:${PORT}/ohlcv?symbol=NSE:NIFTY&timeframe=5&count=200`);
});
