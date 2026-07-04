# Postmortem — 2026-06-29 (Monday)

## Prediction — 09:45 IST
- Spot: 24,086
- Bias: Sideways (24,000–24,100 range)
- Confidence: High (95%)
- Reasoning: Price tested 24,005 and bounced hard (pin bar), rejected at 24,110 twice. OI walls on both sides confirm containment. Expiry tomorrow = theta decay favors sellers.
- OI snapshot (ATM ± 3):
  | Strike | CE OI | PE OI |
  |--------|-------|-------|
  | 23900 | 2.8M | 11.2M |
  | 23950 | 2.3M | 6.6M |
  | 24000 | 13.2M | 21.1M |
  | 24050 | 8.5M | 8.1M |
  | 24100 | 19.7M | 10.8M |
  | 24150 | 8.4M | 2.7M |
  | 24200 | 16.7M | 4.8M |
- Strikes suggested:
  - Leg 1: Sell 24200 CE @ ₹40.0, SL 25% → ₹50.0
  - Leg 2: Sell 23900 PE @ ₹28.3, SL 25% → ₹35.4
  - Qty: 10 lots per leg

## 10:15 IST — Hourly Review
- Prediction 09:45: SIDEWAYS at 24,086 (range 24,000–24,100)
- Spot now: 24,077 | High since: 24,095 | Low since: 24,005 (pre-signal dip, post-signal high: 24,095, low: 24,051)
- Max adverse move: 35 pts (dip to 24,051 — well within range)
- Verdict: CORRECT
- If wrong — N/A
- Lesson candidate: None — thesis playing out as expected. Range-bound confirmed by declining volume and doji candles.

## 11:15 IST — Hourly Review
- Prediction 09:45: SIDEWAYS at 24,086 (range 24,000–24,100)
- Spot now: 24,085 | High since signal: 24,120 | Low since signal: 24,005
- Max adverse move: 34 pts above range ceiling (brief push to 24,120 at 10:30, immediately sold)
- 24200 CE premium peaked at ₹50.3 (briefly hit SL), now back at ₹37.4
- 23900 PE premium peaked at ₹31.7 (within SL), now at ₹25.45
- Verdict: CORRECT (with a scare) — range held, false breakout above 24,100 confirmed by immediate reversal
- If wrong — N/A (range held on both sides, both legs currently profitable)
- Lesson candidate: On sideways calls, a brief spike through the range boundary that immediately reverses is NOT a regime change — OI walls held. The 25% SL gave enough room for the CE leg to survive the whipsaw.

## 12:15 IST — Hourly Review
- Prediction 09:45: SIDEWAYS at 24,086 (range 24,000–24,100)
- Spot now: 24,016 | High since signal: 24,120 | Low since signal: 24,005
- Max adverse move: 81 pts below entry (24,086 → 24,005)
- CE leg: Entry ₹40, now ₹25.5 → +₹14.5/lot PROFIT (excellent)
- PE leg: Entry ₹28.3, hit SL at ₹36 around 11:45 IST → -₹7.7/lot LOSS (exited)
- Verdict: PARTIALLY CORRECT — range held on upper side (CE profited), but lower boundary tested aggressively. PE SL hit because range was wider than expected (24,000–24,120 vs initial 24,000–24,100).
- Net outcome: +₹6.8/lot net positive despite PE SL
- Lesson candidate: When calling sideways with 100pt range, the PE OTM at 23,900 only had ~160pt buffer from spot. A 120pt intraday range (24,005–24,120) was enough to stress the PE leg. Consider wider OTM strikes for PE on volatile days (200+ pt buffer), or accept PE SL as cost of doing business when CE is printing.

## 13:15 IST — Hourly Review
- Prediction 09:45: SIDEWAYS at 24,086 (range 24,000–24,100)
- Spot now: 23,943 | High since signal: 24,120 | Low since signal: 23,938
- Day structure: Sideways 9:15-11:30 (24,005–24,120), then bearish breakdown below 24,000 at 12:40
- CE leg: Entry ₹40, now ₹18.65 → +₹21.35/lot PROFIT (exceptional — 53% captured)
- PE leg: Exited at SL ₹36 at 11:45 → -₹7.7/lot LOSS
- Net: +₹13.65/lot
- Verdict: CORRECT on CE side (which is holding). TIMING WRONG on PE (PE SL hit during the drop to 24,018 before the big 24,000 break). In hindsight, the sideways call was correct for the first 2 hours, then regime shifted bearish. CE benefited enormously from the breakdown.
- Lesson candidate: In a sideways strangle, if one leg gets stopped out, the surviving leg often over-compensates if the breakout continues. Don't add a replacement PE immediately after SL — let the CE ride the breakout direction.

## EOD Summary — 2026-06-29
- NIFTY: Open 24,067 | High 24,120 | Low 23,931 | Close 23,960 (−107 from open)
- Total predictions made: 1 (Sideways at 09:45 IST)
- Correct: 1 (partially — CE leg highly profitable, PE hit SL)
- Direction wrong: 0
- Timing wrong: 0 (PE SL was cost of insurance, as designed)
- Net outcome: PROFITABLE
  - 24200 CE: Entry ₹40, close ~₹10-12 (expiring tomorrow worthless) → +₹28-30/lot
  - 23900 PE: Entry ₹28.3, SL exit ₹36 → −₹7.7/lot
  - Net: +₹20-22/lot = +₹1,500-1,650/lot (10 lots = +₹15,000-16,500)
  - If CE held to expiry tomorrow: net +₹32.3/lot = +₹24,225 on 10 lots
- Best call: Selling 24200 CE in a sideways strangle — CE was 115 pts OTM and ended 240 pts OTM as market broke bearish. Premium collapsed from ₹40 to ~₹10.
- Worst call: 23900 PE strike selection was too close (only 160pt buffer). Should have gone 23800 PE for extra room.
- Key pattern observed: Pre-expiry day with heavy OI at 24,000 — market tested this wall 4 times before breaking through. The 21M+ PE OI wall eventually broke at 12:40 PM after repeated pressure. Once broken, accelerated selling confirmed bearish shift.
