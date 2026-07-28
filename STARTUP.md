# Starting TradingView with the MCP

Quick daily-startup guide. Assumes the MCP server is already installed and added to your Claude Code config (see [SETUP_GUIDE.md](SETUP_GUIDE.md) if not).

## The two-step flow

In Claude Code, just say:

> Launch TradingView and verify the MCP connection.

Claude runs:

1. **`tv_launch`** — auto-detects TradingView Desktop and starts it with the CDP debug port (9222) enabled.
2. **`tv_health_check`** — confirms the connection. Wait until `api_available: true` (the chart takes a few seconds to load).

A healthy response looks like:

```json
{
  "success": true,
  "cdp_connected": true,
  "chart_symbol": "NSE:MOSCHIP",
  "chart_resolution": "1D",
  "api_available": true
}
```

If `api_available` is `false`, the chart is still loading — re-run `tv_health_check` after a few seconds.

## Manual launch (if `tv_launch` fails)

**Mac:**
```bash
/Applications/TradingView.app/Contents/MacOS/TradingView --remote-debugging-port=9222
```

**Windows:**
```bash
%LOCALAPPDATA%\TradingView\TradingView.exe --remote-debugging-port=9222
```

**Linux:**
```bash
/opt/TradingView/tradingview --remote-debugging-port=9222
```

The key flag is always `--remote-debugging-port=9222`.

## Or use the CLI

```bash
tv launch     # start TradingView with the debug port
tv status     # verify the connection
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `cdp_connected: false` | TradingView isn't running with `--remote-debugging-port=9222` — run `tv_launch`. |
| `api_available: false` | Chart still loading — wait a few seconds, re-run `tv_health_check`. |
| `tv_launch` can't find the app | Launch manually with the platform command above. |
| Port 9222 in use / stale instance | `tv_launch` kills existing instances by default (`kill_existing: true`). |
