// ─────────────────────────────────────────────
// tabs/spei.js — SPEI/SPID tab logic
// ─────────────────────────────────────────────

import { now, val, setText } from '../core.js';

// Mapeo de ID del input → ID de la tarjeta
const FIELD_MAP = [
  ['sCASE-ID',          'cSCASE-ID'],
  ['sTime',          'cSTime'],
  ['sHostname',      'cSHostname'],
  ['sAgentIp',       'cSAgentIp'],
  ['sPort',          'cSPort'],
  ['sLogonType',     'cSLogonType'],
  ['sLoggedAccount', 'cSLoggedAccount'],
  ['sEventLog',      'cSEventLog'],
];

// ── Generate ─────────────────────────────────

function generate() {
  document.getElementById('speiTime').textContent = now();

  FIELD_MAP.forEach(([inputId, cardId]) => setText(cardId, val(inputId)));

  const lines = [
    `🏦 *[SPEI / SPID ALERT]*`,
    `*Time:* ${val('sTime')}`,
    `*Case-ID:* ${val('sCase-ID')}`,
    `*Hostname:* ${val('sHostname')}`,
    `*Agent IP Addresses:* ${val('sAgentIp')}`,
    `*Action Port:* ${val('sPort')}`,
    `*Logon Type:* ${val('sLogonType')}`,
    `*Cuenta Loggeada:* ${val('sLoggedAccount')}`,
    `*Log del Evento:* ${val('sEventLog')}`,
  ].join('\n');

  document.getElementById('plainBox').textContent = lines;
}

// ── Expose globally ──────────────────────────

window.__spei = { generate };