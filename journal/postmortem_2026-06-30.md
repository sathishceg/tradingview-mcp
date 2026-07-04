# Postmortem — 30 Jun 2026

## Prediction — 9:25 IST
- Spot: 23901
- Bias: Bearish
- Confidence: High (96%)
- Reasoning: Gap-up from 23978→24032 violently rejected. 3 consecutive lower-low bars. 22.4M fresh CE OI written at 24000 strike today — massive resistance. Multi-day downtrend (24200→23900 over 3 sessions).
- OI snapshot (ATM ± 3):
  | Strike | CE OI | PE OI |
  |--------|-------|-------|
  | 23800 | 4.3M | 14.9M |
  | 23850 | 2.9M | 8.0M |
  | 23900 | 12.9M | 15.1M |
  | 23950 | 17.7M | 7.7M |
  | 24000 | 39.6M | 14.1M |
  | 24050 | 16.9M | 2.8M |
  | 24100 | 24.7M | 5.0M |
- Strikes suggested:
  - Primary: 24000 CE @ 34.8, SL 25% (→43.5)
  - Protection: 23700 PE @ 9.85, SL 12.5% (→11.1)

## Hourly Review — 10:15 IST
- **Actual entry (9:40 IST):** 23950 CE @ ₹42 (SL ₹52.5) + 23700 PE @ ₹13 (SL ₹14.6)
- **Current spot:** 23885 (−16 pts from signal)
- **Max adverse move:** +15 pts (23901→23916 bounce at 10:05 IST, quickly rejected)
- **Max favorable move:** −49 pts (23901→23852 at 9:50 IST)
- **P&L:** 23950 CE +₹2,070 | 23700 PE +₹1,875 | **Total +₹3,945**
- **Direction assessment:** CORRECT — Price trending lower (23952 at entry → 23885 current). No sustained upside. Gap rejection thesis validated.
- **Timing assessment:** CORRECT — Entry near intraday high (23901 signal, max 23916 bounce). Sold into resistance, now consolidating 15-50pt band below entry.
- **Risk:** No SL triggered. Protection leg (23700 PE) acting as intended against 23916 spike. Bias holding through first hour.

## Hourly Review — 11:15 IST
- **Current spot:** 23930 (+29 pts from signal @ 23901)
- **Day range (so far):** 23852–23943 (session high, +42 adverse move)
- **P&L snapshot:** 23950 CE −₹450 | 23700 PE +₹2,985 | **Total +₹2,535**
- **Direction assessment:** PARTIALLY CORRECT → First hour thesis held (23901→23852 selloff), but second hour saw range expansion and shift higher (23916→23943). New session high just posted; short-lived bearish move followed by consolidation/grind up.
- **Timing assessment:** TIMING WRONG → Entry spot was excellent (23901 near intraday high), but expected sustained lower-close has not materialized. NIFTY formed higher-low (23852→23930) instead of continued decline. Sold the spike correctly but market pivoted to accumulation instead of breakdown.
- **Strike pressure:** 23950 CE under pressure; came within 7 pts of strike. SL (₹52.5) not triggered but margin of safety shrinking. OI walls (24000, 23950) holding for now. PE significantly ITM (₹3.05), protecting against further upside.
- **Assessment:** Direction call was correct intraday but lacked sustain. Timing was precise but market structure shifted. Position profitable but now in "defend and exit on relief" mode rather than "ride the breakout" mode.

## Hourly Review — 12:15 IST (POSTMORTEM)
- **Current spot:** 23925 (−76 pts from signal @ 23901)
- **Day range (final):** 23852–23998 (true intraday extremes)
- **P&L final:**
  - 23950 CE exited at ₹88 (entry ₹42) → **-₹20,700 loss**
  - 23700 PE held to expiry → **+₹3,900 gain** (expires worthless)
  - **Net session loss: −₹16,800**
- **What went wrong:**
  - 10:15–11:15: Slow grind from 23880→23943 (higher lows, +63 pts) was the warning sign. Each 5-min bar made higher lows; SL gap risk escalating.
  - 11:15–11:20: GAMMA SQUEEZE — NIFTY exploded 23943→23998 (+55 pts in ONE bar). CE went 44→88, SL ₹52.5 breached without exit opportunity. Exit forced at severe loss.
  - Post-squeeze: NIFTY pulled back to 23920–23950 range by 12:15 IST.
- **Direction assessment:** BEARISH bias was CORRECT for first hour (23901→23852, −49 pts), but WRONG for the session overall. NIFTY reversed to Friday close and reclaimed mid-range.
- **Timing assessment:** WRONG — Entry was placed, but did not account for slow grind as gap event warning. Should have exited CE proactively at 23943 (15 pts from strike) instead of waiting for SL touch, knowing gap risk was high.
- **Key lesson:** Slow grinding toward strike with higher-low pattern (10:15–11:15) = gap imminent. Exit proactively on the grind, don't wait for SL hit. PE protection worked as designed (limited max loss), but CE exit was forced at a catastrophic level.
