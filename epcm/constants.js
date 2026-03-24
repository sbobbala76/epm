/**
 * NOVAPRISM GROUP — MASTER CONSTANTS
 * EPCM Study Tour · BrainSpring
 *
 * FROZEN: These numbers must not change across any hall.
 * Every hall imports from this file. Never hardcode a NovaPrism
 * number directly in a hall — always reference a constant here.
 *
 * P0-1 complete. Status: LOCKED.
 */

const NP = {

  /* ─────────────────────────────────────────
     COMPANY PROFILE
  ───────────────────────────────────────── */
  company: {
    name:          "NovaPrism Group",
    type:          "Professional services & infrastructure conglomerate",
    revenue:       2100,          // $M total group revenue
    currency:      "USD",
    reportingYear: "FY24",
    period:        "Q1",          // case study period
    entities:      4,
    regions:       2,             // Americas + APAC
    employees:     8400,
  },

  /* ─────────────────────────────────────────
     DIVISIONS  (3 operating + 1 cost centre)
  ───────────────────────────────────────── */
  divisions: {
    DS: {
      code:        "DS",
      name:        "Digital Services",
      type:        "Revenue-generating",
      desc:        "Software consulting, direct client billing",
      revenue:     780,           // $M
      directCosts: 580,           // $M (before shared services allocation)
      directMargin: 200,          // $M = 25.6% on direct costs
      employees:   2800,
      sqft:        42000,         // sq ft of office space
      itTickets:   1240,          // IT support tickets per quarter
    },
    IS: {
      code:        "IS",
      name:        "Infrastructure Solutions",
      type:        "Revenue-generating",
      desc:        "Project delivery, heavy shared resource consumption",
      revenue:     980,           // $M
      directCosts: 870,           // $M (before shared services allocation)
      directMargin: 110,          // $M = 11.2% on direct costs
      employees:   4200,
      sqft:        98000,
      itTickets:   2890,
    },
    CL: {
      code:        "CL",
      name:        "Cloud Licensing",
      type:        "Revenue-generating",
      desc:        "Software licence resale and managed cloud",
      revenue:     340,           // $M
      directCosts: 190,           // $M
      directMargin: 150,          // $M = 44.1% on direct costs
      employees:   840,
      sqft:        14000,
      itTickets:   410,
    },
    ES: {
      code:        "ES",
      name:        "Enterprise Support",
      type:        "Cost centre — allocates out to zero",
      desc:        "Internal IT, Finance, HR — must be fully allocated",
      revenue:     0,
      directCosts: 134,           // $M — the $134M blind spot
      directMargin: null,
      employees:   560,
      sqft:        18000,
      itTickets:   0,             // ES is the provider, not consumer
    },
  },

  /* ─────────────────────────────────────────
     SHARED SERVICES COST POOLS  ($M)
     Enterprise Support $134M breaks into:
  ───────────────────────────────────────── */
  costPools: {
    IT: {
      name:        "IT & Technology",
      amount:      52,            // $M
      driver:      "IT support tickets (quarterly count)",
      driverType:  "Statistical",
    },
    Facilities: {
      name:        "Facilities & Real Estate",
      amount:      38,            // $M
      driver:      "Square footage occupied",
      driverType:  "Statistical",
    },
    Finance: {
      name:        "Finance & Accounting",
      amount:      28,            // $M
      driver:      "Headcount",
      driverType:  "Statistical",
    },
    HR: {
      name:        "HR & People Operations",
      amount:      16,            // $M
      driver:      "Headcount",
      driverType:  "Statistical",
    },
    // Total: 52+38+28+16 = 134
  },

  /* ─────────────────────────────────────────
     DRIVER DATA — used in allocation rules
  ───────────────────────────────────────── */
  drivers: {
    // Headcount by division (for Finance + HR pool allocation)
    headcount: {
      DS:  2800,
      IS:  4200,
      CL:   840,
      // ES is the provider — excluded from denominator
      total: 7840,  // 2800+4200+840
    },
    // Square footage by division (for Facilities pool)
    sqft: {
      DS:  42000,
      IS:  98000,
      CL:  14000,
      total: 154000, // 42000+98000+14000
    },
    // IT tickets by division (for IT pool)
    itTickets: {
      DS:  1240,
      IS:  2890,
      CL:   410,
      total: 4540,  // 1240+2890+410
    },
  },

  /* ─────────────────────────────────────────
     PRE-COMPUTED ALLOCATIONS  ($M)
     Calculated from driver ratios.
     Show your work below each.
  ───────────────────────────────────────── */
  allocations: {
    // IT pool ($52M) by ticket share
    IT: {
      DS:  parseFloat((52 * 1240/4540).toFixed(2)),   // 14.19
      IS:  parseFloat((52 * 2890/4540).toFixed(2)),   // 33.09
      CL:  parseFloat((52 *  410/4540).toFixed(2)),   // 4.70  (rounding: 14.19+33.09+4.70=51.98, ±0.02 rounding)
    },
    // Facilities pool ($38M) by sqft share
    Facilities: {
      DS:  parseFloat((38 * 42000/154000).toFixed(2)),  // 10.36
      IS:  parseFloat((38 * 98000/154000).toFixed(2)),  // 24.16
      CL:  parseFloat((38 * 14000/154000).toFixed(2)),  // 3.45
    },
    // Finance pool ($28M) by headcount share
    Finance: {
      DS:  parseFloat((28 * 2800/7840).toFixed(2)),   // 10.00
      IS:  parseFloat((28 * 4200/7840).toFixed(2)),   // 15.00
      CL:  parseFloat((28 *  840/7840).toFixed(2)),   // 3.00
    },
    // HR pool ($16M) by headcount share
    HR: {
      DS:  parseFloat((16 * 2800/7840).toFixed(2)),   // 5.71
      IS:  parseFloat((16 * 4200/7840).toFixed(2)),   // 8.57
      CL:  parseFloat((16 *  840/7840).toFixed(2)),   // 1.71
    },
  },

  /* ─────────────────────────────────────────
     POST-ALLOCATION P&L  ($M)
     The "reveal" that drives the story.
  ───────────────────────────────────────── */
  postAllocation: {
    DS: {
      code:         'DS',
      name:         'Digital Services',
      revenue:      780,
      directCosts:  580,
      allocatedIn:  parseFloat((14.19+10.36+10.00+5.71).toFixed(2)), // 40.26
      fullyLoaded:  parseFloat((580+14.19+10.36+10.00+5.71).toFixed(2)), // 620.26
      get netMargin()  { return parseFloat((780 - this.fullyLoaded).toFixed(2)); },        // 159.74
      get marginPct()  { return parseFloat((this.netMargin/780*100).toFixed(1)); },        // 20.5%
      get directPct()  { return parseFloat(((780-580)/780*100).toFixed(1)); },             // 25.6%
      get marginDelta(){ return parseFloat((this.marginPct - this.directPct).toFixed(1)); },// -5.1pp
    },
    IS: {
      code:         'IS',
      name:         'Infrastructure Solutions',
      revenue:      980,
      directCosts:  870,
      allocatedIn:  parseFloat((33.09+24.16+15.00+8.57).toFixed(2)), // 80.82
      fullyLoaded:  parseFloat((870+33.09+24.16+15.00+8.57).toFixed(2)), // 950.82
      get netMargin()  { return parseFloat((980 - this.fullyLoaded).toFixed(2)); },        // 29.18
      get marginPct()  { return parseFloat((this.netMargin/980*100).toFixed(1)); },        // 3.0%
      get directPct()  { return parseFloat(((980-870)/980*100).toFixed(1)); },             // 11.2%
      get marginDelta(){ return parseFloat((this.marginPct - this.directPct).toFixed(1)); },// -8.2pp — the big reveal
    },
    CL: {
      code:         'CL',
      name:         'Cloud Licensing',
      revenue:      340,
      directCosts:  190,
      allocatedIn:  parseFloat((4.70+3.45+3.00+1.71).toFixed(2)),  // 12.86
      fullyLoaded:  parseFloat((190+4.70+3.45+3.00+1.71).toFixed(2)), // 202.86
      get netMargin()  { return parseFloat((340 - this.fullyLoaded).toFixed(2)); },        // 137.14
      get marginPct()  { return parseFloat((this.netMargin/340*100).toFixed(1)); },        // 40.3%
      get directPct()  { return parseFloat(((340-190)/340*100).toFixed(1)); },             // 44.1%
      get marginDelta(){ return parseFloat((this.marginPct - this.directPct).toFixed(1)); },// -3.8pp
    },
    ES: {
      code:         'ES',
      name:         'Enterprise Support',
      revenue:      0,
      directCosts:  134,
      allocatedOut: 134,  // must equal directCosts — model balance check
      netMargin:    0,
      marginPct:    null,
      directPct:    null,
      marginDelta:  null,
    },
  },

  /* ─────────────────────────────────────────
     CLIENT ENGAGEMENTS  (60 total)
     Aggregated bands for Profit Curve in Hall 7.
     Not individual — patterns only.
  ───────────────────────────────────────── */
  clientBands: {
    profitable:    { count: 22, minMargin: 18, maxMargin: 44 },  // % margin
    marginal:      { count: 21, minMargin:  2, maxMargin: 17 },
    lossMaking:    { count: 17, minMargin: -28, maxMargin: -1 },
    // Key insight: 17 of 60 engagements are loss-making after full allocation
    // None appear loss-making on direct costs alone
  },

  /* ─────────────────────────────────────────
     EPCM APPLICATION SETTINGS
     Used in Hall 1 (orientation) and Hall 2 (dimension design)
  ───────────────────────────────────────── */
  app: {
    name:          "NovaPrism_EPCM_PROD",
    type:          "Enterprise (Standard)",
    cubes: {
      calc:        "PCM_CLC",   // calculation cube
      rep:         "PCM_REP",   // reporting cube
    },
    clearType:     "Logical",   // EPCM default — not Physical
    calcThreads:   5,           // max parallel rules
    allocPrec:     2,           // decimal places
  },

  /* ─────────────────────────────────────────
     DIMENSIONS  (finalised in Hall 2)
  ───────────────────────────────────────── */
  dimensions: [
    { name:"Account",   storage:"Stored",  notes:"1,200 GL accounts — alt hierarchy groups into 8 cost pools" },
    { name:"Entity",    storage:"Stored",  notes:"4 divisions + group rollup" },
    { name:"Region",    storage:"Stored",  notes:"Americas, APAC — stored, not dynamic" },
    { name:"Function",  storage:"Stored",  notes:"IT, Finance, HR, Facilities — the shared services layer" },
    { name:"Product",   storage:"Stored",  notes:"Service line groupings — 12 product codes" },
    { name:"Customer",  storage:"Stored",  notes:"60 engagement codes + All_Customers rollup" },
    { name:"PCM_Balance",storage:"System", notes:"PCM_Input · PCM_Allocated_In · PCM_Allocated_Out · PCM_Adjustment_In · PCM_Adjustment_Out · PCM_Output" },
    { name:"Period",    storage:"Stored",  notes:"FY24 Q1–Q4 + YTD alt hierarchy — outline aggregation not formula" },
    { name:"Scenario",  storage:"Stored",  notes:"Actual · Forecast · Budget · What-If" },
    { name:"Version",   storage:"Stored",  notes:"Working · Final · Pass1 · Pass2" },
    { name:"View",      storage:"Stored",  notes:"Periodic · YTD · QTD — via alt hierarchy, not dynamic member formula" },
  ],

  /* ─────────────────────────────────────────
     MODELS  (finalised in Hall 3)
  ───────────────────────────────────────── */
  models: [
    { id:"M01", name:"Actuals Allocation Process",   scenario:"Actual",   version:"Working", desc:"Monthly close run" },
    { id:"M02", name:"Forecast Allocation Process",  scenario:"Forecast", version:"Working", desc:"Rolling 4-quarter forecast" },
    { id:"M03", name:"Budget Allocation Process",    scenario:"Budget",   version:"Working", desc:"Annual budget cycle" },
    { id:"M04", name:"What-If Scenario Analysis",   scenario:"Actual",   version:"WhatIf",  desc:"CFO restructure scenario" },
  ],

  /* ─────────────────────────────────────────
     RULESETS  (built in Hall 4)
  ───────────────────────────────────────── */
  rulesets: [
    { seq:10, name:"IT Cost Pool Formation",       type:"Serial",   rules:3,  desc:"Pool and stage IT costs from GL into allocation-ready members" },
    { seq:20, name:"Facilities Allocation",        type:"Parallel", rules:3,  desc:"Allocate facilities costs by square footage — parallel safe" },
    { seq:30, name:"Finance & HR Allocation",      type:"Parallel", rules:4,  desc:"Allocate Finance+HR by headcount — parallel safe" },
    { seq:40, name:"IT Allocation",                type:"Serial",   rules:2,  desc:"Allocate IT pool by ticket count — serial: depends on seq:10" },
    { seq:50, name:"Engagement Contribution",      type:"Parallel", rules:6,  desc:"Push fully-loaded costs to client engagement dimension" },
  ],

  /* ─────────────────────────────────────────
     EXAM ALIGNMENT  (used in Hall 9)
  ───────────────────────────────────────── */
  exam: {
    code:        "1Z0-1082-25",
    name:        "Oracle Profitability and Cost Management 2025 Implementation Professional",
    questions:   50,
    duration:    90,   // minutes
    passMark:    68,   // percent
    topics: [
      "Setting up the application",
      "Designing dimensions",
      "Working with POVs and models",
      "Managing rule sets and rules",
      "Calculating models",
      "Analyzing data",
      "Managing data integration",
      "Migrating PCM applications to EPCM",
    ],
  },

};

/* ─────────────────────────────────────────
   BALANCE VERIFICATION
   Run this to confirm the model balances.
   All four pools must sum to 134.
───────────────────────────────────────── */
(function verifyBalance() {
  const pools = NP.costPools;
  const total = Object.values(pools).reduce((s,p)=>s+p.amount, 0);
  const ESdirect = NP.divisions.ES.directCosts;
  if (total !== ESdirect) {
    console.error(`BALANCE FAIL: cost pools sum to ${total}, ES direct costs = ${ESdirect}`);
  } else {
    console.log(`Balance OK: cost pools = $${total}M = ES direct costs`);
  }

  // Verify each pool allocates fully (sum of division allocations ≈ pool total)
  Object.entries(NP.allocations).forEach(([pool, divs])=>{
    const allocated = Object.values(divs).reduce((s,v)=>s+v, 0);
    const poolAmt   = NP.costPools[pool].amount;
    const diff      = Math.abs(allocated - poolAmt);
    if (diff > 0.1) {
      console.warn(`Pool ${pool}: allocated ${allocated.toFixed(2)} vs pool ${poolAmt} — diff ${diff.toFixed(2)} (rounding)`);
    } else {
      console.log(`Pool ${pool} OK: ${allocated.toFixed(2)} ≈ ${poolAmt}`);
    }
  });
})();

/* Export for use in all halls */
if (typeof module !== 'undefined') module.exports = NP;
