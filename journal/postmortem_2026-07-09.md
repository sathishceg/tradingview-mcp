# Postmortem — 2026-07-09

## Prediction — 09:45 IST (RETRACTED)
- Retracted at 09:47 IST — failed self-check (volume declining, no pullback confirmation, strikes too close given yesterday's 400-pt range)

## Prediction — 10:05 IST
- Spot: 24,055
- Bias: Bullish
- Confidence: High (95%)
- Reasoning: 11 bars of higher lows since open. Pullback to 24,031 tested and held (bar 9), then pushed to new high 24,077 (bar 10). 24,000 floor confirmed by both price action and massive 9.83M PE OI. Strikes placed beyond yesterday's full 400-pt crash range.
- OI snapshot (ATM ± 3):
  | Strike | CE OI | PE OI |
  |--------|-------|-------|
  | 23950 | 1.40M | 3.31M |
  | 24000 | 7.39M | 9.83M |
  | 24050 | 3.25M | 3.27M |
  | 24100 | 5.66M | 3.83M |
  | 24150 | 2.33M | 1.12M |
  | 24200 | 9.32M | 3.91M |
- Strikes suggested:
  - Primary: 23700 PE @ ₹39, SL 25%
  - Protection: 24400 CE @ ₹31, SL 12.5%

## Hourly Review — 10:15 IST

**Too early to assess** (signal only 10 minutes old)

Price action since entry at 24,055:
- Session high: 24,077 (+22 pts, +0.09%)
- Session low: 24,031 (-24 pts, -0.10%)
- Current spot: 24,052 (-3 pts from entry, stable)

Max adverse move: 24 pts downside (well within tolerance for this timeframe). Bullish structure intact. Next review at 11:00 IST.

## Hourly Review — 11:15 IST

**WHIPSAW TRAP — Both legs stopped out**

User trade execution (vs suggested strikes):
- Suggested: 23700 PE @ ₹39 / 24400 CE @ ₹31 (700-pt span)
- User took: 23850 PE @ ₹71.6 / 24200 CE @ ₹77.8 (350-pt span — too narrow)

Price action 10:05 → 11:15 IST:
- Entry: 24,055
- Consolidation: 24,030-24,070 (30 min)
- Spike: 24,135 @ 10:40 IST (8.1M volume) → **CE stopped at ₹95.9** (loss ₹11,765)
- Reversal: 23,988 @ 11:05 IST → **PE stopped at ₹82.47** (loss ₹7,066)
- Current: 24,017
- **Range: 147 pts in 70 min** (24,135 - 23,988)

Total loss: **-₹19,607**

### What Went Wrong

1. **Direction was correct but incomplete**: Market DID spike bullish to 24,135 (+80 pts) validating the call, but it was a BULL TRAP. The spike was immediately rejected with violent downside.

2. **Strike selection mismatch**: User chose strikes 150 pts closer on each side (23850 vs 23700 PE, 24200 vs 24400 CE). On a day following yesterday's 400-pt crash, this was too tight. The 147-pt whipsaw was sufficient to stop out both legs.

3. **High-vol environment underestimated**: Yesterday's 400-pt move should have been a red flag that volatility was elevated. Strangles need wider wings on high-vol days. Even my suggested 24400 CE would likely have hit SL at the 24,135 spike (265 pts OTM becoming ~250 pts OTM = significant premium expansion).

4. **Entry timing**: The consolidation 24,030-24,070 after signal was a warning sign — not clean follow-through. Should have waited for breakout confirmation above 24,070 OR reconsidered the trade structure.

### Key Learning

**On high-volatility days (prior day range >300 pts), strangles are extremely vulnerable to whipsaws.** Either:
- Use iron condors (define max loss)
- Wait for consolidation to complete and directional breakout to confirm
- Use wider strikes (1.5x-2x normal distance)
- Accept higher entry prices for far OTM strikes

The BULLISH call itself was directionally valid (24,135 was reached), but the structure was wrong for the volatility regime.
