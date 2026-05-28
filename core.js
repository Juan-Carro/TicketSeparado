// ─────────────────────────────────────────────
// core.js — Tab registry + shared utilities
// ─────────────────────────────────────────────

const TAB_IDS = ['ad', 'vpn', 'file', 'conn', 'speid'];

const TAB_META = {
  ad:   { label: 'AD',                   cls: 'active-ad'   },
  vpn:  { label: 'VPN',                  cls: 'active-vpn'  },
  file: { label: 'Archivos',             cls: 'active-file' },
  conn: { label: 'Conexiones sospechosas', cls: 'active-conn' },
  speid: { label: 'SPEID / SPID',        cls: 'active-spei'}
};

// ── Shared helpers ──────────────────────────

export const now = () =>
  new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

export const val = id => {
  const el = document.getElementById(id);
  return el ? el.value.trim() || '—' : '—';
};

export const setText = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

export const veredictoLabel = v => ({
  benigna:    '✅ Benigna',
  conocida:   '✅ Conocida',
  sospechosa: '⚠️ Sospechosa',
  maliciosa:  '🚨 Maliciosa',
}[v] || '—');

export const vtColor = n =>
  n === 0 ? '#86efac' : n < 10 ? '#fcd34d' : '#fca5a5';

// ── Tab switching ────────────────────────────

function switchTab(tab) {
  TAB_IDS.forEach(t => {
    document.getElementById(t + 'Form').classList.toggle('hidden', t !== tab);
    document.getElementById('card' + t.toUpperCase().replace('FILE','File').replace('CONN','Conn').replace('AD','AD').replace('VPN','VPN'))
      .classList.toggle('hidden', t !== tab);
  });

  // Card IDs use specific casing — handle explicitly
  document.getElementById('cardAD').classList.toggle('hidden',   tab !== 'ad');
  document.getElementById('cardVPN').classList.toggle('hidden',  tab !== 'vpn');
  document.getElementById('cardFile').classList.toggle('hidden', tab !== 'file');
  document.getElementById('cardConn').classList.toggle('hidden', tab !== 'conn');
  

  // Form IDs
  document.getElementById('adForm').classList.toggle('hidden',   tab !== 'ad');
  document.getElementById('vpnForm').classList.toggle('hidden',  tab !== 'vpn');
  document.getElementById('fileForm').classList.toggle('hidden', tab !== 'file');
  document.getElementById('connForm').classList.toggle('hidden', tab !== 'conn');

  // Tab styles
  TAB_IDS.forEach(t => {
    const el = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.className = 'tab' + (t === tab ? ` ${TAB_META[t].cls}` : '');
  });
  // Explicit uppercase tab IDs
  document.getElementById('tabAD').className   = 'tab' + (tab === 'ad'   ? ' active-ad'   : '');
  document.getElementById('tabVPN').className  = 'tab' + (tab === 'vpn'  ? ' active-vpn'  : '');
  document.getElementById('tabFile').className = 'tab' + (tab === 'file' ? ' active-file' : '');
  document.getElementById('tabConn').className = 'tab' + (tab === 'conn' ? ' active-conn' : '');
  document.getElementById('tabSpei').className = 'tab' + (tab === 'spei' ? ' active-spei' : '');

  document.getElementById('previewLabel').textContent =
    '⬡ Vista previa — ' + TAB_META[tab].label;

  document.getElementById('plainBox').textContent =
    'Completa el formulario y presiona "Generar mensaje".';
}

// ── Copy plain text ──────────────────────────

function copyPlain() {
  const text = document.getElementById('plainBox').textContent;
  if (text.startsWith('Completa')) return;
  navigator.clipboard.writeText(text).then(() => {
    const m = document.getElementById('copiedMsg');
    m.classList.add('show');
    setTimeout(() => m.classList.remove('show'), 2000);
  });
}

// ── Init timestamps ──────────────────────────

function initTimes() {
  ['adTime', 'vpnTime', 'fileTime', 'connTime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = now();
  });
}

// ── Expose globally (used by inline onclick) ─

window.__core = { switchTab, copyPlain };

initTimes();
