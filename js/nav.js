/* nav.js — Shared nav, footer, modal, toast — Sujan Karki */
(function(){
const page=(window.location.pathname.split('/').pop().replace('.html','')||'index');
if(localStorage.getItem('nk_theme')==='light'){document.documentElement.classList.add('light');document.body&&document.body.classList.add('light');}

const authLinks=[
  {id:'dashboard',label:'Dashboard',href:'dashboard.html',cls:'auth-show'},
  {id:'reports',label:'Reports',href:'reports.html',cls:'auth-show'},
  {id:'treasury',label:'Treasury',href:'treasury.html',cls:'auth-show'},
  {id:'ai',label:'AI Advisor',href:'ai.html',cls:'auth-show'},
  {id:'alerts',label:'Alerts',href:'alerts.html',cls:'auth-show',dot:true},
];
const pubLinks=[
  {id:'index',label:'Home',href:'index.html',cls:''},
  {id:'about',label:'About',href:'about.html',cls:''},
  {id:'login',label:'Login',href:'login.html',cls:'auth-hide'},
  {id:'signup',label:'Sign Up',href:'signup.html',cls:'auth-hide'},
];
function li(l){const a=l.id===page?' active':'';const dot=l.dot?`<span class="nav-dot" id="nav-dot" style="display:none"></span>`:'';return `<li class="${l.cls}"><a href="${l.href}" class="${a}">${dot}${l.label}</a></li>`;}

const homeHref=Auth.loggedIn?'dashboard.html':'index.html';
const HTML=`
<div id="spending-alert-banner" style="display:none" class="alert-banner">
  <span id="spending-alert-text"></span>
  <button class="alert-banner-close" onclick="document.getElementById('spending-alert-banner').style.display='none'">✕</button>
</div>
<nav class="nav">
  <a class="nav-logo" href="${homeHref}">
    <div class="nav-logo-mark">♛</div>
    <div class="nav-logo-text-block">
      <div class="nav-logo-name">NOBLEKEEP</div>
      <div class="nav-logo-sub">Sovereign Wealth</div>
    </div>
  </a>
  <ul class="nav-links">${pubLinks.map(li).join('')}${authLinks.map(li).join('')}</ul>
  <div class="nav-right">
    <button class="btn-nav" onclick="toggleTheme()" title="Toggle theme">◐</button>
    <button class="btn-nav auth-show" id="bell-btn" style="display:none" onclick="window.location='alerts.html'" title="Alerts">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span class="btn-nav-dot" id="bell-dot" style="display:none"></span>
    </button>
    <div class="profile-wrap auth-show" id="profileWrap" style="display:none">
      <button class="profile-btn" id="profileBtn" onclick="toggleDropdown()" aria-expanded="false">
        <div class="profile-avatar" id="navAvatar">S</div>
        <div class="profile-name-block">
          <span class="profile-btn-name" id="navName">Sovereign</span>
          <span class="profile-btn-role">Member</span>
        </div>
        <svg class="profile-chevron" viewBox="0 0 12 12"><path fill="currentColor" d="M6 8L1 3h10z"/></svg>
      </button>
      <div class="profile-dropdown" id="profileDropdown">
        <div class="pd-top">
          <div class="pd-avatar-lg" id="pdAvi">S</div>
          <div><div class="pd-name" id="pdName">—</div><div class="pd-email" id="pdEmail">—</div></div>
        </div>
        <div class="pd-stats-row">
          <div class="pd-stat-cell"><div class="pd-stat-num" id="pd-health">—</div><div class="pd-stat-lbl">Health</div></div>
          <div class="pd-stat-cell"><div class="pd-stat-num" id="pd-spent">—</div><div class="pd-stat-lbl">Spent</div></div>
          <div class="pd-stat-cell"><div class="pd-stat-num" id="pd-left">—</div><div class="pd-stat-lbl">Left</div></div>
        </div>
        <nav class="pd-nav">
          <a class="pd-link" href="dashboard.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Throne</a>
          <a class="pd-link" href="profile.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>My Profile</a>
          <a class="pd-link" href="alerts.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>Alerts</a>
          <a class="pd-link" href="ai.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>AI Advisor</a>
          <div class="pd-sep"></div>
          <a class="pd-link" onclick="toggleTheme()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>Toggle Theme</a>
          <div class="pd-sep"></div>
          <a class="pd-link danger" onclick="doLogout()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sign Out</a>
        </nav>
      </div>
    </div>
    <button class="hamburger" onclick="toggleMobile()">☰</button>
  </div>
</nav>
<div class="mobile-drawer" id="mobileDrawer">
  <div class="mobile-user-strip auth-show" style="display:none">
    <div class="mobile-user-avi" id="mobileAvi">S</div>
    <div><div class="mobile-user-name" id="mobileName">Sovereign</div><div class="mobile-user-email" id="mobileEmail">—</div></div>
  </div>
  <nav class="mobile-nav">
    <a href="${homeHref}">Home</a>
    <a href="about.html">About</a>
    <div class="auth-hide" id="mAuthHide"><a href="login.html">Login</a><a href="signup.html">Sign Up</a></div>
    <div class="auth-show" id="mAuthShow" style="display:none">
      <div class="sep"></div>
      <a href="dashboard.html">Throne</a><a href="reports.html">Reports</a><a href="treasury.html">Treasury</a>
      <a href="ai.html">AI Advisor</a><a href="alerts.html">Alerts</a><a href="profile.html">My Profile</a>
      <div class="sep"></div>
      <a class="danger" onclick="doLogout()">Sign Out</a>
    </div>
  </nav>
</div>
<div class="toast-wrap" id="toastWrap"></div>
<div class="modal-overlay" id="modalOverlay">
  <div class="modal"><div class="modal-title" id="modalTitle"></div><div id="modalBody"></div><div class="modal-actions" id="modalActions"></div></div>
</div>`;

const FOOT=`<footer class="site-footer"><div>© 2026 NOBLEKEEP — For Sovereigns Only</div><div class="by">Developed by <span>Sujan Karki</span></div></footer>`;

function inject(){
  const t=document.createElement('div');t.innerHTML=HTML;document.body.insertBefore(t,document.body.firstChild);
  const b=document.createElement('div');b.innerHTML=FOOT;document.body.appendChild(b);
  // Apply theme to body
  if(localStorage.getItem('nk_theme')==='light') document.body.classList.add('light');
  _updateAuth();_checkBanner();
  document.addEventListener('click',e=>{
    const pw=document.getElementById('profileWrap');if(pw&&!pw.contains(e.target))_closeDrop();
    const ov=document.getElementById('modalOverlay');if(ov&&e.target===ov)closeModal();
  });
}

function _updateAuth(){
  const on=Auth.loggedIn;
  document.querySelectorAll('.auth-hide').forEach(el=>el.style.display=on?'none':'');
  document.querySelectorAll('.auth-show').forEach(el=>el.style.display=on?'':'none');
  if(on&&Auth.user){
    const u=Auth.user,i=(u.name||'S').charAt(0).toUpperCase();
    ['navAvatar','pdAvi','mobileAvi'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=i;});
    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
    set('navName',u.name);set('mobileName',u.name);set('pdName',u.name||'—');set('pdEmail',u.email||'—');set('mobileEmail',u.email||'—');
    _refreshStats();
  }
}

function _refreshStats(){
  const hs=DM.healthScore(),ts=DM.totalSpent(),bl=DM.budgetLeft(),pct=DM.percentUsed();
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('pd-health',hs);set('pd-spent','$'+ts.toFixed(0));set('pd-left','$'+Math.max(0,bl).toFixed(0));
  const a=pct>=80;
  const bd=document.getElementById('bell-dot');if(bd)bd.style.display=a?'block':'none';
  const nd=document.getElementById('nav-dot');if(nd)nd.style.display=a?'block':'none';
}

function _checkBanner(){
  if(!Auth.loggedIn)return;
  const pct=DM.percentUsed(),b=document.getElementById('spending-alert-banner'),t=document.getElementById('spending-alert-text');
  if(!b)return;
  if(pct>=100){b.style.display='flex';b.className='alert-banner';t.textContent=`⛔ Budget exceeded — ${pct}% of monthly budget spent.`;}
  else if(pct>=80){b.style.display='flex';b.className='alert-banner warning';t.textContent=`⚠ ${pct}% of monthly budget used — approaching limit.`;}
  else b.style.display='none';
}

function _closeDrop(){const dd=document.getElementById('profileDropdown'),btn=document.getElementById('profileBtn');if(dd)dd.classList.remove('open');if(btn)btn.setAttribute('aria-expanded','false');}

window.updateNavAuth=_updateAuth;
window.refreshDropdownStats=_refreshStats;
window.checkSpendingBanner=_checkBanner;
window.requireAuth=function(r='login.html'){if(!Auth.loggedIn){window.location.href=r;return false;}return true;};
window.toggleDropdown=function(){const dd=document.getElementById('profileDropdown'),btn=document.getElementById('profileBtn');if(!dd)return;const o=dd.classList.toggle('open');btn.setAttribute('aria-expanded',String(o));if(o)_refreshStats();};
window.closeDropdown=_closeDrop;
window.toggleMobile=function(){document.getElementById('mobileDrawer').classList.toggle('open');};
window.closeMobile=function(){document.getElementById('mobileDrawer').classList.remove('open');};
window.toggleTheme=function(){document.body.classList.toggle('light');document.documentElement.classList.toggle('light');localStorage.setItem('nk_theme',document.body.classList.contains('light')?'light':'dark');};
window.doLogout=function(){Auth.logout();window.location.href='index.html';};
window.toast=function(msg,type='success'){const wrap=document.getElementById('toastWrap');if(!wrap)return;const t=document.createElement('div');t.className=`toast ${type}`;t.innerHTML=`<span class="toast-pip"></span>${msg}`;wrap.appendChild(t);requestAnimationFrame(()=>t.classList.add('in'));setTimeout(()=>{t.classList.remove('in');setTimeout(()=>t.remove(),360);},3200);};
window.showModal=function(title,body,actions){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=body;const ad=document.getElementById('modalActions');ad.innerHTML='';actions.forEach(a=>{const btn=document.createElement('button');btn.className=`btn ${a.cls||'btn-outline'}`;btn.textContent=a.label;btn.onclick=a.fn;ad.appendChild(btn);});document.getElementById('modalOverlay').classList.add('open');};
window.closeModal=function(){document.getElementById('modalOverlay').classList.remove('open');};

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',inject);}else{inject();}
})();
