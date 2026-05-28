// ─────────────────────────────────────────────
// tabs/file.js — Archivos tab logic
// ─────────────────────────────────────────────

import { now, val, setText } from '../core.js';

// Input ID → Card element ID mapping
const FIELD_MAP = [
  ['fCaseId',        'cFCase'],
  ['fTimestamp',     'cFTimestamp'],
  ['fSev',           'cFSev'],
  ['fDesc',          'cFDesc'],
  ['fCategoria',     'cFCat'],
  ['fSource',        'cFSource'],
  ['fHost',          'cFHost'],
  ['fUser',          'cFUser'],
  ['fIp',            'cFIp'],
  ['fTipoActivo',    'cFActivo'],
  ['fNombreArchivo', 'cFNombre'],
  ['fRuta',          'cFRuta'],
  ['fHash',          'cFHash'],
  ['fCmdLine',       'cFCmd'],
  ['fAnalisis',      'cFAnalisis'],
  ['fWildfire',      'cFWildfire'],
];

// ── Generate ─────────────────────────────────

function generate() {
  document.getElementById('fileTime').textContent = now();

  FIELD_MAP.forEach(([inputId, cardId]) => setText(cardId, val(inputId)));

  const lines = [
    `📁 *[FILE ALERT — ${val('fSev').toUpperCase()}]*`,
    `*Case ID:* ${val('fCaseId')}`,
    `*Time Stamp:* ${val('fTimestamp')}`,
    `*Severidad:* ${val('fSev')}`,
    `*Descripción:* ${val('fDesc')}`,
    `*Categoría:* ${val('fCategoria')}`,
    `*Source:* ${val('fSource')}`,
    `*Host:* ${val('fHost')}`,
    `*User:* ${val('fUser')}`,
    `*IP:* ${val('fIp')}`,
    `*Tipo de activo:* ${val('fTipoActivo')}`,
    `*Nombre de archivo:* ${val('fNombreArchivo')}`,
    `*Ruta de archivo:* ${val('fRuta')}`,
    `*Hash:* ${val('fHash')}`,
    `*Líneas de comando:* ${val('fCmdLine')}`,
    `*Análisis:* ${val('fAnalisis')}`,
    `*Veredicto Wildfire:* ${val('fWildfire')}`,
  ].join('\n');

  document.getElementById('plainBox').textContent = lines;
}

// ── Expose globally ──────────────────────────

window.__file = { generate };
