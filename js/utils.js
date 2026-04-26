/* ================================================================
   utils.js  —  Shared helpers used across all pages
   Developed by Sujan Karki
   ================================================================ */

/* ── Format helpers ──────────────────────────────────────────────── */
function fmt(n)        { return '$' + Math.abs(parseFloat(n)||0).toFixed(2); }
function fmtK(n)       { return n>=1000 ? '$'+(n/1000).toFixed(1)+'k' : fmt(n); }
function fmtPct(n)     { return Math.round(n) + '%'; }

function categoryBadge(cat) {
  const map = {
    Food:'b-food', Transportation:'b-travel',
    Shopping:'b-shop', Entertainment:'b-ent', Utilities:'b-util',
    Savings:'b-save', Investment:'b-invest'
  };
  return `<span class="badge ${map[cat]||'b-other'}">${cat}</span>`;
}

/* ── Chart registry ──────────────────────────────────────────────── */
const Charts = {
  _reg: {},
  destroy(id) {
    if (this._reg[id]) { this._reg[id].destroy(); delete this._reg[id]; }
  },
  make(id, config) {
    this.destroy(id);
    const ctx = document.getElementById(id);
    if (!ctx) return;
    this._reg[id] = new Chart(ctx, config);
    return this._reg[id];
  }
};

const PALETTE = ['#BFA060','#7D6EC0','#3B82F6','#1E8449','#C0392B','#D68910','#EC4899','#06B6D4','#059669','#8B5CF6'];

function chartColors() {
  const isLight = document.body.classList.contains('light');
  return {
    tick:  isLight ? '#5C584F' : '#8C8580',
    grid:  isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
    legend:isLight ? '#5C584F' : '#8C8580',
  };
}

function makeDoughnut(canvasId, catTotals) {
  const labels = Object.keys(catTotals);
  const data   = Object.values(catTotals);
  if (!labels.length) {
    const ctx = document.getElementById(canvasId);
    if (ctx) { const p = ctx.parentElement; if(p) p.innerHTML = '<p style="color:var(--text3);font-size:13px;text-align:center;padding:2rem 0">No transactions yet — add some expenses to see your breakdown.</p>'; }
    return;
  }
  const c = chartColors();
  Charts.make(canvasId, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: PALETTE, borderWidth:0, hoverOffset:6 }] },
    options: {
      responsive:true, cutout:'68%',
      plugins: {
        legend: { position:'bottom', labels:{ color:c.legend, font:{family:'Outfit',size:11}, padding:12, boxWidth:10 } },
        tooltip: { callbacks:{ label: c => ` ${fmt(c.raw)}` } }
      }
    }
  });
}

function makeLine(canvasId, labels, data, label='Spending') {
  if (!labels.length) { const ctx=document.getElementById(canvasId); if(ctx){const p=ctx.parentElement;if(p)p.innerHTML='<p style="color:var(--text3);font-size:13px;text-align:center;padding:2rem 0">No data yet.</p>';} return; }
  const c = chartColors();
  Charts.make(canvasId, {
    type: 'line',
    data: { labels, datasets: [{ label, data, borderColor:'#BFA060', backgroundColor:'rgba(191,160,96,0.08)', tension:0.38, fill:true, pointRadius:4, pointBackgroundColor:'#BFA060', borderWidth:2 }] },
    options: {
      responsive:true,
      scales: {
        x: { ticks:{color:c.tick,font:{size:11}}, grid:{color:c.grid} },
        y: { beginAtZero:true, ticks:{color:c.tick,font:{size:11},callback:v=>'$'+v}, grid:{color:c.grid} }
      },
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:ct=>` ${fmt(ct.raw)}` } } }
    }
  });
}

function makeBar(canvasId, labels, data, label='Amount') {
  if (!labels.length) return;
  const c = chartColors();
  Charts.make(canvasId, {
    type: 'bar',
    data: { labels, datasets: [{ label, data, backgroundColor: PALETTE.slice(0,labels.length), borderWidth:0, borderRadius:4 }] },
    options: {
      responsive:true, indexAxis:'y',
      scales: {
        x: { beginAtZero:true, ticks:{color:c.tick,font:{size:11},callback:v=>'$'+v}, grid:{color:c.grid} },
        y: { ticks:{color:c.tick,font:{size:11}}, grid:{color:'transparent'} }
      },
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:ct=>` ${fmt(ct.raw)}` } } }
    }
  });
}

function buildMonthlyTrend() {
  const monthly = {};
  DM.transactions.forEach(tx => {
    const m = (tx.date||'').substring(0,7) || 'Unknown';
    monthly[m] = (monthly[m]||0) + parseFloat(tx.amount);
  });
  const sorted = Object.keys(monthly).sort();
  const labels = sorted.map(k => { const d=new Date(k+'-01'); return d.toLocaleString('default',{month:'short',year:'2-digit'}); });
  const data = sorted.map(k => parseFloat(monthly[k].toFixed(2)));
  return { labels, data };
}

function requireAuth(redirect='login.html') {
  if (!Auth.loggedIn) { window.location.href = redirect; return false; }
  return true;
}
