/* ═══════════════════════════════════════════════════════
   BrainSpring Brand Attribution
   epc.brainspring.ai — A BrainSpring Product
   Inject shield mark into topbar + attribution into footer
═══════════════════════════════════════════════════════ */
(function(){

  /* ── BrainSpring shield SVG mark ── */
  var SHIELD_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36" width="22" height="24" aria-label="BrainSpring">'
    + '<path d="M16 1L2 7v12c0 8.3 6 16 14 18 8-2 14-9.7 14-18V7L16 1z" fill="#0d1b2e" stroke="#4ade80" stroke-width="1.5"/>'
    + '<path d="M16 1L2 7v12c0 8.3 6 16 14 18 8-2 14-9.7 14-18V7L16 1z" fill="url(#bsg)" opacity=".18"/>'
    + '<defs><linearGradient id="bsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4ade80"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs>'
    + '<path d="M9 15c0-2.2 1.5-4 3.5-4 .8 0 1.5.3 2 .7V11h3v4.5c.4-.3.9-.5 1.5-.5 2 0 3.5 1.8 3.5 4S21 23 19 23c-.6 0-1.1-.2-1.5-.5V24h-3v-.7c-.5.5-1.2.7-2 .7-2 0-3.5-1.8-3.5-4z" fill="none" stroke="#4ade80" stroke-width="1.2" opacity=".9"/>'
    + '<circle cx="21.5" cy="26" r="2.5" fill="none" stroke="#4ade80" stroke-width="1" opacity=".7"/>'
    + '<line x1="20" y1="25" x2="20" y2="27" stroke="#4ade80" stroke-width=".8" opacity=".7"/>'
    + '<line x1="19" y1="26" x2="21" y2="26" stroke="#4ade80" stroke-width=".8" opacity=".7"/>'
    + '</svg>';

  /* ── Brand mark wrapper HTML ── */
  var MARK_HTML = '<a href="https://brainspring.ai" class="bs-mark" title="A BrainSpring Product · brainspring.ai" target="_blank" rel="noopener">'
    + SHIELD_SVG
    + '</a>';

  /* ── Attribution footer line ── */
  var ATTR_HTML = '<div class="bs-attr">A <a href="https://brainspring.ai" target="_blank" rel="noopener">BrainSpring</a> Product &nbsp;·&nbsp; <span>epc.brainspring.ai</span></div>';

  /* ── Inject CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '.bs-mark{display:inline-flex;align-items:center;flex-shrink:0;opacity:.75;transition:opacity .18s;text-decoration:none}',
    '.bs-mark:hover{opacity:1}',
    '.bs-attr{text-align:center;padding:14px 0 0;font-family:"JetBrains Mono",monospace;font-size:10px;color:rgba(74,222,128,.35);letter-spacing:.08em;margin-top:16px;border-top:1px solid rgba(74,222,128,.08)}',
    '.bs-attr a{color:rgba(74,222,128,.55);text-decoration:none;transition:color .15s}',
    '.bs-attr a:hover{color:#4ade80}',
    '.bs-attr span{color:rgba(74,222,128,.25)}'
  ].join('');
  document.head.appendChild(style);

  /* ── Helper: prepend mark to a topbar element ── */
  function prependMark(el) {
    if(!el || el.querySelector('.bs-mark')) return;
    var wrapper = document.createElement('div');
    wrapper.innerHTML = MARK_HTML;
    var mark = wrapper.firstChild;
    el.insertBefore(mark, el.firstChild);
  }

  /* ── Helper: append attribution to a container ── */
  function appendAttr(el) {
    if(!el || el.querySelector('.bs-attr')) return;
    var wrapper = document.createElement('div');
    wrapper.innerHTML = ATTR_HTML;
    el.appendChild(wrapper.firstChild);
  }

  /* ── Inject on DOMContentLoaded ── */
  function inject() {

    /* Topbar — find whichever topbar variant exists on this page */
    var topbarIds = ['topbar','topbar-index','topbar-wn','topbar-cf',
      'topbar-labs','topbar-ar','topbar-fc','topbar-ip',
      'topbar-quiz','topbar-search','topbar-sim','topbar-gl'];

    for(var i = 0; i < topbarIds.length; i++) {
      var tb = document.getElementById(topbarIds[i]);
      if(tb){ prependMark(tb); break; }
    }

    /* Footer — inject attribution */
    /* Strategy 1: existing .footer div (index and some pages) */
    var footer = document.querySelector('.footer');
    if(footer){ appendAttr(footer); return; }

    /* Strategy 2: no footer — create a minimal one before </body> */
    var existing = document.querySelector('.bs-attr');
    if(!existing){
      var div = document.createElement('div');
      div.style.cssText = 'position:relative;z-index:1;padding:0 32px 32px;';
      div.innerHTML = ATTR_HTML;
      document.body.appendChild(div);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
