// core.js — Tab registry + shared utilities

const TAB_META = {
  ad:   { label: 'AD',                    cls: 'active-ad'   },
  vpn:  { label: 'VPN',                   cls: 'active-vpn'  },
  file: { label: 'Archivos',              cls: 'active-file' },
  conn: { label: 'Conexiones sospechosas', cls: 'active-conn' },
  spei: { label: 'SPEI / SPID',           cls: 'active-spei' },
};

const CARD_IDS = {
  ad: 'cardAD', vpn: 'cardVPN', file: 'cardFile', conn: 'cardConn', spei: 'cardSpei',
};

const TAB_IDS = {
  ad: 'tabAD', vpn: 'tabVPN', file: 'tabFile', conn: 'tabConn', spei: 'tabSpei',
};

// ── Shared helpers ───────────────────────────

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

// ── switchTab ────────────────────────────────

export function switchTab(tab) {
  Object.keys(TAB_META).forEach(t => {
    document.getElementById(t + 'Form').classList.toggle('hidden', t !== tab);
    document.getElementById(CARD_IDS[t]).classList.toggle('hidden', t !== tab);
    document.getElementById(TAB_IDS[t]).className =
      'tab' + (t === tab ? ' ' + TAB_META[t].cls : '');
  });

  document.getElementById('previewLabel').textContent =
    '⬡ Vista previa — ' + TAB_META[tab].label;
  document.getElementById('plainBox').textContent =
    'Completa el formulario y presiona "Generar mensaje".';
}

// ── copyPlain ────────────────────────────────

export function copyPlain() {
  const text = document.getElementById('plainBox').textContent;
  if (text.startsWith('Completa')) return;
  navigator.clipboard.writeText(text).then(() => {
    const m = document.getElementById('copiedMsg');
    m.classList.add('show');
    setTimeout(() => m.classList.remove('show'), 2000);
  });
}

// ── Init ─────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  ['adTime', 'vpnTime', 'fileTime', 'connTime', 'speiTime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = now();
  });
});
