#!/bin/bash
#
# TradingView HTTP Bridge - Management Script
#
# This runs a lightweight HTTP server (port 3333) that exposes TradingView
# chart data (OHLCV candles) to the trading backend via REST API.
#
# Prerequisites:
#   - TradingView Desktop must be running with --remote-debugging-port=9222
#   - Node.js installed at /opt/homebrew/bin/node
#   - npm install done in this folder
#
# The bridge auto-starts on login (macOS Launch Agent) and restarts if it crashes.
# Use this script to manually manage it.
#
# Commands:
#   ./bridge.sh status    # Check if running
#   ./bridge.sh start     # Start
#   ./bridge.sh stop      # Stop
#   ./bridge.sh restart   # Restart
#   ./bridge.sh logs      # View logs
#

PLIST=~/Library/LaunchAgents/com.tradingview.http-bridge.plist
URL="http://localhost:3333/health"

case "$1" in
  start)
    launchctl load "$PLIST" 2>/dev/null
    sleep 2
    curl -s "$URL" | python3 -m json.tool
    ;;
  stop)
    launchctl unload "$PLIST" 2>/dev/null
    echo "Bridge stopped"
    ;;
  restart)
    launchctl unload "$PLIST" 2>/dev/null
    sleep 1
    launchctl load "$PLIST" 2>/dev/null
    sleep 2
    curl -s "$URL" | python3 -m json.tool
    ;;
  status)
    curl -s "$URL" | python3 -m json.tool 2>/dev/null || echo "Bridge not running"
    ;;
  logs)
    tail -30 ~/Library/Logs/tradingview-mcp/bridge.log
    ;;
  *)
    echo "Usage: ./bridge.sh [start|stop|restart|status|logs]"
    ;;
esac
