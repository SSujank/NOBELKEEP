/* ============================================================
   data.js — Data Manager & Auth
   Developed by Sujan Karki
   ============================================================ */

const DM = {
  get transactions() {
    try {
      return JSON.parse(localStorage.getItem('nk_tx') || 'null') || [
        { id: 1, date: '2026-04-24', category: 'Food',           amount: 42.50,  description: 'Dinner at the castle' },
        { id: 2, date: '2026-04-22', category: 'Transportation', amount: 28.00,  description: 'Rideshare to the market' },
        { id: 3, date: '2026-04-20', category: 'Shopping',       amount: 89.99,  description: 'New attire' },
        { id: 4, date: '2026-04-18', category: 'Entertainment',  amount: 35.00,  description: 'Theatre performance' },
        { id: 5, date: '2026-04-15', category: 'Utilities',      amount: 120.00, description: 'Monthly utilities' },
        { id: 6, date: '2026-04-14', category: 'Savings',        amount: 200.00, description: 'Emergency fund contribution' },
        { id: 7, date: '2026-04-10', category: 'Investment',     amount: 150.00, description: 'Index fund deposit' },
      ];
    } catch(e) { return []; }
  },
  save(txs) { localStorage.setItem('nk_tx', JSON.stringify(txs)); },

  get budget() { return parseFloat(localStorage.getItem('nk_budget') || '1500'); },
  saveBudget(b) { localStorage.setItem('nk_budget', String(b)); },

  get goals() {
    try {
      return JSON.parse(localStorage.getItem('nk_goals') || 'null') || [
        { id: 1, name: 'Emergency Fund', current: 7500, target: 10000 },
        { id: 2, name: 'New Vehicle',    current: 9000, target: 20000 },
        { id: 3, name: 'Vacation',       current: 4500, target: 5000  },
      ];
    } catch(e) { return []; }
  },
  saveGoals(g) { localStorage.setItem('nk_goals', JSON.stringify(g)); },

  get budgetLimits() {
    try {
      return JSON.parse(localStorage.getItem('nk_limits') || 'null') || {
        Food: 300, Transportation: 150, Shopping: 200,
        Entertainment: 100, Utilities: 200, Other: 100
      };
    } catch(e) { return {}; }
  },
  saveBudgetLimits(l) { localStorage.setItem('nk_limits', JSON.stringify(l)); },

  get dismissedAlerts() {
    try { return JSON.parse(localStorage.getItem('nk_dismissed') || '[]'); }
    catch(e) { return []; }
  },
  dismissAlert(key) {
    const d = this.dismissedAlerts;
    if (!d.includes(key)) { d.push(key); localStorage.setItem('nk_dismissed', JSON.stringify(d)); }
  },
  clearDismissed() { localStorage.removeItem('nk_dismissed'); },

  totalSpent() { return this.transactions.reduce((s, t) => s + parseFloat(t.amount), 0); },
  budgetLeft() { return this.budget - this.totalSpent(); },
  percentUsed() { return Math.round((this.totalSpent() / this.budget) * 100); },
  avgPerDay() {
    const days = Math.max(1, Math.ceil((Date.now() - new Date('2026-01-01').getTime()) / 86400000));
    return this.totalSpent() / days;
  },
  categoryTotals() {
    const t = {};
    this.transactions.forEach(tx => {
      t[tx.category] = (t[tx.category] || 0) + parseFloat(tx.amount);
    });
    return t;
  },
  healthScore() {
    let s = 0;
    const pct = this.percentUsed();
    s += pct <= 80 ? 30 : pct <= 100 ? 20 : 10;
    const sr = Math.max(0, (this.budget - this.totalSpent()) / this.budget * 100);
    s += sr >= 20 ? 25 : sr >= 10 ? 15 : sr >= 0 ? 5 : 0;
    const cats = Object.keys(this.categoryTotals()).length;
    s += cats >= 5 ? 20 : cats >= 3 ? 15 : 10;
    const apd = this.avgPerDay();
    s += apd <= 50 ? 15 : apd <= 100 ? 10 : 5;
    s += 10;
    return Math.min(100, Math.max(0, s));
  },

  addTransaction(tx) {
    const txs = this.transactions;
    tx.id = Date.now();
    txs.unshift(tx);
    this.save(txs);
  },
  updateTransaction(id, data) {
    const txs = this.transactions;
    const i = txs.findIndex(t => t.id == id);
    if (i !== -1) { txs[i] = { ...txs[i], ...data }; this.save(txs); }
  },
  deleteTransaction(id) {
    this.save(this.transactions.filter(t => t.id != id));
  },

  exportCSV() {
    const rows = [['Date','Category','Description','Amount']];
    this.transactions.forEach(t => rows.push([t.date, t.category, t.description || '', t.amount]));
    return rows.map(r => r.map(f => `"${f}"`).join(',')).join('\n');
  },
  exportJSON() {
    return JSON.stringify({
      transactions: this.transactions, budget: this.budget,
      totalSpent: this.totalSpent(), budgetLeft: this.budgetLeft(),
      healthScore: this.healthScore(), exportDate: new Date().toISOString()
    }, null, 2);
  }
};

/* ─── AUTH ─── */
const Auth = {
  get user() {
    try { return JSON.parse(localStorage.getItem('nk_user')); }
    catch(e) { return null; }
  },
  login(email, password) {
    if (email === 'demo@noblekeep.com' && password === 'demo123') {
      localStorage.setItem('nk_user', JSON.stringify({ email, name: 'Demo Sovereign' }));
      return true;
    }
    try {
      const accs = JSON.parse(localStorage.getItem('nk_accounts') || '[]');
      const acc = accs.find(a => a.email === email && a.password === password);
      if (acc) {
        localStorage.setItem('nk_user', JSON.stringify({ email, name: acc.name }));
        return true;
      }
    } catch(e) {}
    return false;
  },
  signup(name, email, password) {
    try {
      const accs = JSON.parse(localStorage.getItem('nk_accounts') || '[]');
      if (accs.find(a => a.email === email)) return { ok: false, msg: 'Email already registered.' };
      accs.push({ name, email, password });
      localStorage.setItem('nk_accounts', JSON.stringify(accs));
      localStorage.setItem('nk_user', JSON.stringify({ email, name }));
      return { ok: true };
    } catch(e) { return { ok: false, msg: 'Error creating account.' }; }
  },
  logout() { localStorage.removeItem('nk_user'); },
  get loggedIn() { return !!this.user; },
  greeting() {
    const h = new Date().getHours();
    const t = h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
    return `Good ${t}, ${this.user?.name || 'Sovereign'}`;
  }
};
