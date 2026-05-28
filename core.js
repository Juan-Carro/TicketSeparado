// ─────────────────────────────────────────────
// core.js — Tab registry + shared utilities
// ─────────────────────────────────────────────

const TAB_IDS = ['ad', 'vpn', 'file', 'conn', 'spei'];

const TAB_META = {
  ad:   { label: 'AD',                   cls: 'active-ad'   },
  vpn:  { label: 'VPN',                  cls: 'active-vpn'  },
  file: { label: 'Archivos',             cls: 'active-file' },
  conn: { label: 'Conexiones sospechosas', cls: 'active-conn' },
  spei: { label: 'SPEI / SPID',          cls: 'active-spei' },
};

// Mapeo explícito de tab ID → IDs reales en el DOM
const DOM_IDS = {
  ad:   { form: 'adForm',   card: 'cardAD',   tab: 'tabAD'   },
  vpn:  { form: 'vpnForm',  card: 'cardVPN',  tab: 'tabVPN'  },
  file: { form: 'fileForm', card: 'cardFile', tab: 'tabFile' },
  conn: { form: 'connForm', card: 'cardConn', tab: 'tabConn' },
  spei: { form: 'speiForm', card: 'cardSpei', tab: 'tabSpei' },
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
    const ids = DOM_IDS[t];

    // Formularios
    const form = document.getElementById(ids.form);
    if (form) form.classList.toggle('hidden', t !== tab);

    // Cards de preview
    const card = document.getElementById(ids.card);
    if (card) card.classList.toggle('hidden', t !== tab);

    // Estilos del tab selector
    const tabEl = document.getElementById(ids.tab);
    if (tabEl) tabEl.className = 'tab' + (t === tab ? ` ${TAB_META[t].cls}` : '');
  });

  // Etiqueta del panel de preview
  document.getElementById('previewLabel').textContent =
    '⬡ Vista previa — ' + TAB_META[tab].label;

  // Limpiar plainBox al cambiar de tab
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
  ['adTime', 'vpnTime', 'fileTime', 'connTime', 'speiTime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = now();
  });
}

// ── Expose globally (used by inline onclick) ─

window.__core = { switchTab, copyPlain };

initTimes();
