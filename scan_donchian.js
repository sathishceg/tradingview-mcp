/**
 * Donchian Channel Signal Scanner
 *
 * Scans 200+ NSE stocks for recent Donchian Channel buy/sell signals
 * by reading the indicator's table output via CDP.
 *
 * Prerequisites:
 *   - TradingView Desktop running with CDP enabled (port 9222)
 *   - "Donchian Channel Signals" indicator loaded on the chart
 *   - Indicator must have the info table enabled (Direction + Candles Ago)
 *
 * Usage:
 *   node scan_donchian.js [timeframe] [candles]
 *
 * Arguments:
 *   timeframe  - Chart timeframe (default: 60)
 *   candles    - Look back N candles for signals (default: 2)
 *
 * Timeframes:
 *   1     - 1 minute
 *   5     - 5 minutes
 *   15    - 15 minutes
 *   60    - 1 hour (default)
 *   240   - 4 hours
 *   D     - Daily
 *   W     - Weekly
 *   M     - Monthly
 *
 * Examples:
 *   node scan_donchian.js          # 1H, last 2 candles
 *   node scan_donchian.js 60 3     # 1H, last 3 candles
 *   node scan_donchian.js D 2      # Daily, last 2 candles
 *   node scan_donchian.js 5 3      # 5min, last 3 candles
 *   node scan_donchian.js D        # Daily, last 2 candles (default)
 *   node scan_donchian.js W 4      # Weekly, last 4 candles
 */

import CDP from 'chrome-remote-interface';

const CDP_HOST = process.env.CDP_HOST || 'localhost';
const CDP_PORT = parseInt(process.env.CDP_PORT || '9222');

// Nifty 500 stocks
const NIFTYFIVE = [
  '360ONE', '3MINDIA', 'ABB', 'ACC', 'ACMESOLAR', 'AIAENG', 'APLAPOLLO', 'AUBANK', 'AWL', 
  'AADHARHFC', 'AARTIIND', 'AAVAS', 'ABBOTINDIA', 'ACE', 'ACUTAAS', 'ADANIENSOL', 'ADANIENT', 
  'ADANIGREEN', 'ADANIPORTS', 'ADANIPOWER', 'ATGL', 'ABCAPITAL', 'ABFRL', 'ABLBL', 'ABREL', 
  'ABSLAMC', 'CPPLUS', 'AEGISLOG', 'AEGISVOPAK', 'AFCONS', 'AFFLE', 'AJANTPHARM', 'ALKEM', 
  'ABDL', 'ARE&M', 'AMBER', 'AMBUJACEM', 'ANANDRATHI', 'ANANTRAJ', 'ANGELONE', 'ANTHEM', 
  'ANURAS', 'APARINDS', 'APOLLOHOSP', 'APOLLOTYRE', 'APTUS', 'ASAHIINDIA', 'ASHOKLEY', 
  'ASIANPAINT', 'ASTERDM', 'ASTRAL', 'ATHERENERG', 'ATUL', 'AUROPHARMA', 'AIIL', 'DMART', 
  'AXISBANK', 'BEML', 'BLS', 'BSE', 'BAJAJ-AUTO', 'BAJFINANCE', 'BAJAJFINSV', 'BAJAJHLDNG', 
  'BAJAJHFL', 'BALKRISIND', 'BALRAMCHIN', 'BANDHANBNK', 'BANKBARODA', 'BANKINDIA', 'MAHABANK', 
  'BATAINDIA', 'BAYERCROP', 'BELRISE', 'BERGEPAINT', 'BDL', 'BEL', 'BHARATFORG', 'BHEL', 'BPCL', 
  'BHARTIARTL', 'BHARTIHEXA', 'BIKAJI', 'GROWW', 'BIOCON', 'BSOFT', 'BLUEDART', 'BLUEJET', 
  'BLUESTARCO', 'BBTC', 'BOSCHLTD', 'FIRSTCRY', 'BRIGADE', 'BRITANNIA', 'MAPMYINDIA', 'CCL', 
  'CESC', 'CGPOWER', 'CIEINDIA', 'CRISIL', 'CANFINHOME', 'CANBK', 'CANHLIFE', 'CAPLIPOINT', 
  'CGCL', 'CARBORUNIV', 'CARTRADE', 'CASTROLIND', 'CEATLTD', 'CEMPRO', 'CENTRALBK', 'CDSL', 
  'CHALET', 'CHAMBLFERT', 'CHENNPETRO', 'CHOICEIN', 'CHOLAHLDNG', 'CHOLAFIN', 'CIPLA', 'CUB', 
  'CLEAN', 'COALINDIA', 'COCHINSHIP', 'COFORGE', 'COHANCE', 'COLPAL', 'CAMS', 'CONCORDBIO', 'CONCOR', 
  'COROMANDEL', 'CRAFTSMAN', 'CREDITACC', 'CROMPTON', 'CUMMINSIND', 'CYIENT', 'DCMSHRIRAM', 'DLF', 
  'DOMS', 'DABUR', 'DALBHARAT', 'DATAPATTNS', 'DEEPAKFERT', 'DEEPAKNTR', 'DELHIVERY', 'DEVYANI', 
  'DIVISLAB', 'DIXON', 'LALPATHLAB', 'DRREDDY', 'EIDPARRY', 'EIHOTEL', 'EICHERMOT', 'ELECON', 'ELGIEQUIP', 
  'EMAMILTD', 'EMCURE', 'EMMVEE', 'ENDURANCE', 'ENGINERSIN', 'ERIS', 'ESCORTS', 'ETERNAL', 'EXIDEIND', 
  'NYKAA', 'FEDERALBNK', 'FACT', 'FINCABLES', 'FSL', 'FIVESTAR', 'FORCEMOT', 'FORTIS', 'GAIL', 'GVT&D', 
  'GMRAIRPORT', 'GABRIEL', 'GALLANTT', 'GRSE', 'GICRE', 'GILLETTE', 'GLAND', 'GLAXO', 'GLENMARK', 
  'MEDANTA', 'GODIGIT', 'GPIL', 'GODFRYPHLP', 'GODREJCP', 'GODREJIND', 'GODREJPROP', 'GRANULES', 
  'GRAPHITE', 'GRASIM', 'GRAVITA', 'GESHIP', 'FLUOROCHEM', 'GMDCLTD', 'HEG', 'HBLENGINE', 'HCLTECH', 
  'HDBFS', 'HDFCAMC', 'HDFCBANK', 'HDFCLIFE', 'HFCL', 'HAVELLS', 'HEROMOTOCO', 'HEXT', 'HSCL', 'HINDALCO', 
  'HAL', 'HINDCOPPER', 'HINDPETRO', 'HINDUNILVR', 'HINDZINC', 'POWERINDIA', 'HOMEFIRST', 'HONASA', 'HONAUT', 
  'HUDCO', 'HYUNDAI', 'ICICIBANK', 'ICICIGI', 'ICICIAMC', 'ICICIPRULI', 'IDBI', 'IDFCFIRSTB', 'IFCI', 'IIFL', 
  'IRB', 'IRCON', 'ITCHOTELS', 'ITC', 'ITI', 'INDGN', 'INDIACEM', 'INDIAMART', 'INDIANB', 'IEX', 'INDHOTEL', 
  'IOC', 'IOB', 'IRCTC', 'IRFC', 'IREDA', 'IGL', 'INDUSTOWER', 'INDUSINDBK', 'NAUKRI', 'INFY', 'INOXWIND', 
  'INTELLECT', 'INDIGO', 'IGIL', 'IKS', 'IPCALAB', 'JBCHEPHARM', 'JKCEMENT', 'JBMA', 'JKTYRE', 'JMFINANCIL', 
  'JSWCEMENT', 'JSWDULUX', 'JSWENERGY', 'JSWINFRA', 'JSWSTEEL', 'JAINREC', 'JPPOWER', 'J&KBANK', 'JINDALSAW', 
  'JSL', 'JINDALSTEL', 'JIOFIN', 'JUBLFOOD', 'JUBLINGREA', 'JUBLPHARMA', 'JWL', 'JYOTICNC', 'KPRMILL', 'KEI', 
  'KPITTECH', 'KAJARIACER', 'KPIL', 'KALYANKJIL', 'KARURVYSYA', 'KAYNES', 'KEC', 'KFINTECH', 'KIRLOSENG', 
  'KOTAKBANK', 'KIMS', 'LTF', 'LTTS', 'LGEINDIA', 'LICHSGFIN', 'LTFOODS', 'LTM', 'LT', 'LATENTVIEW', 'LAURUSLABS', 
  'THELEELA', 'LEMONTREE', 'LENSKART', 'LICI', 'LINDEINDIA', 'LLOYDSME', 'LODHA', 'LUPIN', 'MMTC', 'MRF', 'MGL', 
  'M&MFIN', 'M&M', 'MANAPPURAM', 'MRPL', 'MANKIND', 'MARICO', 'MARUTI', 'MFSL', 'MAXHEALTH', 'MAZDOCK', 'MEESHO', 
  'MINDACORP', 'MSUMI', 'MOTILALOFS', 'MPHASIS', 'MCX', 'MUTHOOTFIN', 'NATCOPHARM', 'NBCC', 'NCC', 'NHPC', 
  'NLCINDIA', 'NMDC', 'NSLNISP', 'NTPCGREEN', 'NTPC', 'NH', 'NATIONALUM', 'NAVA', 'NAVINFLUOR', 'NESTLEIND', 
  'NETWEB', 'NEULANDLAB', 'NEWGEN', 'NAM-INDIA', 'NIVABUPA', 'NUVAMA', 'NUVOCO', 'OBEROIRLTY', 'ONGC', 'OIL', 
  'OLAELEC', 'OLECTRA', 'PAYTM', 'ONESOURCE', 'OFSS', 'POLICYBZR', 'PCBL', 'PGEL', 'PIIND', 'PNBHOUSING', 'PTCIL', 
  'PVRINOX', 'PAGEIND', 'PARADEEP', 'PATANJALI', 'PERSISTENT', 'PETRONET', 'PFIZER', 'PHOENIXLTD', 'PWL', 
  'PIDILITIND', 'PINELABS', 'PIRAMALFIN', 'PPLPHARMA', 'POLYMED', 'POLYCAB', 'POONAWALLA', 'PFC', 'POWERGRID', 
  'PREMIERENE', 'PRESTIGE', 'PNB', 'RRKABEL', 'RBLBANK', 'RECLTD', 'RHIM', 'RITES', 'RADICO', 'RVNL', 'RAILTEL', 
  'RAINBOW', 'RKFORGE', 'REDINGTON', 'RELIANCE', 'RPOWER', 'SBFC', 'SBICARD', 'SBILIFE', 'SJVN', 'SRF', 'SAGILITY', 
  'SAILIFE', 'SAMMAANCAP', 'MOTHERSON', 'SAPPHIRE', 'SARDAEN', 'SAREGAMA', 'SCHAEFFLER', 'SCHNEIDER', 'SCI', 
  'SHREECEM', 'SHRIRAMFIN', 'SHYAMMETL', 'ENRIN', 'SIEMENS', 'SIGNATURE', 'SOBHA', 'SOLARINDS', 'SONACOMS', 
  'SONATSOFTW', 'STARHEALTH', 'SBIN', 'SAIL', 'SUMICHEM', 'SUNPHARMA', 'SUNTV', 'SUNDARMFIN', 'SUPREMEIND', 
  'SPLPETRO', 'SUZLON', 'SWANCORP', 'SWIGGY', 'SYNGENE', 'SYRMA', 'TBOTEK', 'TVSMOTOR', 'TATACAP', 'TATACHEM', 
  'TATACOMM', 'TCS', 'TATACONSUM', 'TATAELXSI', 'TATAINVEST', 'TMCV', 'TMPV', 'TATAPOWER', 'TATASTEEL', 
  'TATATECH', 'TTML', 'TECHM', 'TECHNOE', 'TEGA', 'TEJASNET', 'TENNIND', 'NIACL', 'RAMCOCEM', 'THERMAX', 
  'TIMKEN', 'TITAGARH', 'TITAN', 'TORNTPHARM', 'TORNTPOWER', 'TARIL', 'TRAVELFOOD', 'TRENT', 'TRIDENT', 
  'TRITURBINE', 'TIINDIA', 'UCOBANK', 'UNOMINDA', 'UPL', 'UTIAMC', 'ULTRACEMCO', 'UNIONBANK', 'UBL', 'UNITDSPR', 
  'URBANCO', 'USHAMART', 'VTL', 'VBL', 'VEDL', 'VIJAYA', 'VMM', 'IDEA', 'VOLTAS', 'WAAREEENER', 'WELCORP', 
  'WELSPUNLIV', 'WHIRLPOOL', 'WIPRO', 'WOCKPHARMA', 'YESBANK', 'ZFCVINDIA', 'ZEEL', 'ZENTEC', 'ZENSARTECH', 
  'ZYDUSLIFE', 'ZYDUSWELL', 'ECLERX']



// F&O stocks
const FUTURES = [
  '360ONE','ABB','APLAPOLLO','AUBANK','ADANIENSOL','ADANIENT','ADANIGREEN','ADANIPORTS',
  'ADANIPOWER','ABCAPITAL','ALKEM','AMBER','AMBUJACEM','ANGELONE','APOLLOHOSP','ASHOKLEY',
  'ASIANPAINT','ASTRAL','AUROPHARMA','DMART','AXISBANK','BSE','BAJAJ_AUTO','BAJFINANCE',
  'BAJAJFINSV','BAJAJHLDNG','BANDHANBNK','BANKBARODA','BANKINDIA','BDL','BEL','BHARATFORG',
  'BHEL','BPCL','BHARTIARTL','BIOCON','BLUESTARCO','BOSCHLTD','BRITANNIA','CGPOWER',
  'CANBK','CDSL','CHOLAFIN','CIPLA','COALINDIA','COCHINSHIP','COFORGE','COLPAL','CAMS',
  'CONCOR','CROMPTON','CUMMINSIND','DLF','DABUR','DALBHARAT','DELHIVERY','DIVISLAB','DIXON',
  'DRREDDY','ETERNAL','EICHERMOT','EXIDEIND','FORCEMOT','NYKAA','FORTIS','GAIL','GVT&D',
  'GMRAIRPORT','GLENMARK','GODFRYPHLP','GODREJCP','GODREJPROP','GRASIM','HCLTECH','HDFCAMC',
  'HDFCBANK','HDFCLIFE','HAVELLS','HEROMOTOCO','HINDALCO','HAL','HINDPETRO','HINDUNILVR',
  'HINDZINC','POWERINDIA','HYUNDAI','ICICIBANK','ICICIGI','ICICIPRULI','IDFCFIRSTB','ITC',
  'INDIANB','IEX','IOC','IRFC','IREDA','INDUSTOWER','INDUSINDBK','NAUKRI','INFY','INOXWIND',
  'INDIGO','JINDALSTEL','JSWENERGY','JSWSTEEL','JIOFIN','JUBLFOOD','KEI','KPITTECH',
  'KALYANKJIL','KAYNES','KFINTECH','KOTAKBANK','LTF','LICHSGFIN','LTM','LT','LAURUSLABS',
  'LICI','LODHA','LUPIN','M&M','MANAPPURAM','MANKIND','MARICO','MARUTI','MFSL','MAXHEALTH',
  'MAZDOCK','MOTILALOFS','MPHASIS','MCX','MUTHOOTFIN','NBCC','NHPC','NMDC','NTPC',
  'NATIONALUM','NESTLEIND','NAM_INDIA','NUVAMA','OBEROIRLTY','ONGC','OIL','PAYTM','OFSS',
  'POLICYBZR','PGEL','PIIND','PNBHOUSING','PAGEIND','PATANJALI','PERSISTENT','PETRONET',
  'PIDILITIND','POLYCAB','PFC','POWERGRID','PREMIERENE','PRESTIGE','PNB','RBLBANK','RECLTD',
  'RADICO','RVNL','RELIANCE','SBICARD','SBILIFE','SHREECEM','SRF','SAMMAANCAP','MOTHERSON',
  'SHRIRAMFIN','SIEMENS','SOLARINDS','SONACOMS','SBIN','SAIL','SUNPHARMA','SUPREMEIND',
  'SUZLON','SWIGGY','TATACONSUM','TVSMOTOR','TCS','TATAELXSI','TMPV','TATAPOWER',
  'TATASTEEL','TECHM','FEDERALBNK','INDHOTEL','PHOENIXLTD','TITAN','TORNTPHARM','TRENT',
  'TIINDIA','UNOMINDA','UPL','ULTRACEMCO','UNIONBANK','UNITDSPR','VBL','VEDL','VMM',
  'IDEA','VOLTAS','WAAREEENER','WIPRO','YESBANK','ZYDUSLIFE'
];

const SYMBOLS = NIFTYFIVE

const SCAN_JS = `(() => {
  const c = window.TradingViewApi.activeChart();
  const w = c._chartWidget;
  const model = w._modelWV._value.m_model;
  const ds = model.dataSources();
  const sources = Array.from(ds);
  const donchian = sources.find(s => { try { return s.title().includes('Donchian'); } catch(e) { return false; } });
  if (!donchian || !donchian._graphics) return { s: c.symbol(), sig: null, ready: false };

  const g = donchian._graphics;
  try {
    const tables = g._primitivesCollection.dwgtablecells;
    if (!tables) return { s: c.symbol(), sig: null, ready: false };
    const cellMap = tables.get('tableCells');
    if (!cellMap) return { s: c.symbol(), sig: null, ready: false };
    const cells = cellMap._primitivesDataById || (cellMap.get && cellMap.get(false)?._primitivesDataById);
    if (!cells || cells.size === 0) return { s: c.symbol(), sig: null, ready: false };

    let symbol = null;
    let direction = null;
    let candlesAgo = null;
    cells.forEach((v) => {
      const text = (v.t || '').trim();
      const lower = text.toLowerCase();
      if (lower === 'long' || lower === 'short') direction = lower;
      else if (/^\\d+$/.test(text)) candlesAgo = parseInt(text);
      else if (text && text !== 'Symbol' && text !== 'Direction' && text !== 'Candles Ago' && text !== 'Awaiting Signal' && text !== '—' && !/^(long|short)$/i.test(text)) symbol = text;
    });

    // Verify table symbol matches expected symbol
    const expectedSym = c.symbol().replace('NSE:', '');
    if (!symbol || symbol !== expectedSym) return { s: c.symbol(), sig: null, ready: false };

    if (!direction || candlesAgo === null) return { s: c.symbol(), sig: null, ready: true };
    if (candlesAgo > __MAX_CANDLES__ - 1) return { s: c.symbol(), sig: null, ready: true };

    const sig = direction === 'long' ? 'BULLISH' : 'BEARISH';
    return { s: c.symbol(), sig, ba: candlesAgo, ready: true };
  } catch(e) { return { s: c.symbol(), sig: null, ready: false, err: e.message }; }
})()`;

const SET_SYMBOL_JS = (sym) => `(() => {
  const c = window.TradingViewApi.activeChart();
  c.setSymbol('NSE:${sym}');
  return true;
})()`;

async function findChartTarget() {
  const resp = await fetch(`http://${CDP_HOST}:${CDP_PORT}/json/list`);
  const targets = await resp.json();
  return targets.find(t => t.type === 'page' && /tradingview\.com\/chart/i.test(t.url))
    || targets.find(t => t.type === 'page' && /tradingview/i.test(t.url))
    || null;
}

async function evaluate(client, expression) {
  const result = await client.Runtime.evaluate({
    expression,
    returnByValue: true,
    awaitPromise: false,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || 'eval error');
  }
  return result.result?.value;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForSymbolLoaded(client, symbol, maxWait = 6000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const sym = await evaluate(client, `window.TradingViewApi.activeChart().symbol()`);
    if (sym === `NSE:${symbol}`) return true;
    await sleep(300);
  }
  return false;
}

async function waitForIndicatorReady(client, maxWait = 8000) {
  const CHECK_JS = `(() => {
    const c = window.TradingViewApi.activeChart();
    const studies = c.getAllStudies();
    const donchian = studies.find(s => s.name.includes('Donchian'));
    if (!donchian) return false;
    const study = c.getStudyById(donchian.id);
    return !study.isLoading() && study.graphicsViewsReady();
  })()`;
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const ready = await evaluate(client, CHECK_JS);
    if (ready) return true;
    await sleep(300);
  }
  return false;
}

async function waitForStudyReady(client, symbol, maxWait = 8000, maxCandles = 2) {
  const js = SCAN_JS.replace('__MAX_CANDLES__', maxCandles);
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const result = await evaluate(client, js);
    if (result && result.ready && result.s === `NSE:${symbol}`) {
      return result;
    }
    await sleep(400);
  }
  return { s: `NSE:${symbol}`, sig: null, ready: false, timeout: true };
}

async function main() {
  const timeframe = process.argv[2] || '60'; // default 1H. Options: 1,5,15,60,D,W
  const maxCandles = parseInt(process.argv[3]) || 2; // default last 2 candles

  const target = await findChartTarget();
  if (!target) {
    console.error('No TradingView chart target found!');
    process.exit(1);
  }

  const client = await CDP({ host: CDP_HOST, port: CDP_PORT, target: target.id });
  await client.Runtime.enable();

  await evaluate(client, `(() => { window.TradingViewApi.activeChart().setResolution('${timeframe}'); return true; })()`);
  await sleep(2000);

  const bullish = [];
  const bearish = [];
  const errors = [];

  const tfLabel = { '1': '1min', '5': '5min', '15': '15min', '60': '1H', 'D': 'Daily', 'W': 'Weekly' }[timeframe] || timeframe;
  const scanStart = Date.now();
  console.log(`Scanning ${SYMBOLS.length} stocks on ${tfLabel} timeframe (last ${maxCandles} candles)...`);
  console.log('---');

  for (let i = 0; i < SYMBOLS.length; i++) {
    const sym = SYMBOLS[i];
    try {
      await evaluate(client, SET_SYMBOL_JS(sym));
      const loaded = await waitForSymbolLoaded(client, sym, 6000);
      if (!loaded) {
        errors.push({ symbol: sym, error: 'symbol load timeout' });
        continue;
      }
      const result = await waitForStudyReady(client, sym, 12000, maxCandles);

      if (result.sig === 'BULLISH') {
        bullish.push({ symbol: sym, barsAgo: result.ba });
        console.log(`  ✅ ${sym} — BULLISH (${result.ba} bars ago)`);
      } else if (result.sig === 'BEARISH') {
        bearish.push({ symbol: sym, barsAgo: result.ba });
        console.log(`  🔴 ${sym} — BEARISH (${result.ba} bars ago)`);
      }

      if ((i + 1) % 20 === 0) {
        const elapsed = ((Date.now() - scanStart) / 1000).toFixed(0);
        console.log(`  ... scanned ${i + 1}/${SYMBOLS.length} | ${elapsed}s elapsed`);
      }
    } catch (err) {
      errors.push({ symbol: sym, error: err.message });
    }
  }

  console.log('\n========================================');
  console.log(`DONCHIAN CHANNEL SIGNALS — ${tfLabel} TIMEFRAME`);
  console.log('========================================\n');

  if (bullish.length > 0) {
    console.log('📈 BULLISH SIGNALS (▲ L):');
    console.log('┌─────────────────┬───────────┐');
    console.log('│ Stock           │ Bars Ago  │');
    console.log('├─────────────────┼───────────┤');
    for (const s of bullish) {
      console.log(`│ ${s.symbol.padEnd(15)} │ ${s.barsAgo}         │`);
    }
    console.log('└─────────────────┴───────────┘');
  } else {
    console.log('📈 BULLISH SIGNALS: None found');
  }

  console.log('');

  if (bearish.length > 0) {
    console.log('📉 BEARISH SIGNALS (▼ S):');
    console.log('┌─────────────────┬───────────┐');
    console.log('│ Stock           │ Bars Ago  │');
    console.log('├─────────────────┼───────────┤');
    for (const s of bearish) {
      console.log(`│ ${s.symbol.padEnd(15)} │ ${s.barsAgo}         │`);
    }
    console.log('└─────────────────┴───────────┘');
  } else {
    console.log('📉 BEARISH SIGNALS: None found');
  }

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} symbols had errors`);
  }

  const totalTime = ((Date.now() - scanStart) / 1000).toFixed(1);
  const minutes = (totalTime / 60).toFixed(1);
  console.log(`\nTotal scanned: ${SYMBOLS.length} | Bullish: ${bullish.length} | Bearish: ${bearish.length}`);
  console.log(`Completed in ${totalTime}s (${minutes} min) | Avg ${(totalTime / SYMBOLS.length).toFixed(1)}s per stock`);

  await client.close();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
