// ─────────────────────────────────────────────
// tabs/spei.js — SPEI/SPID tab logic
// ─────────────────────────────────────────────

import { now, val, setText } from '../core.js';

// Mapeo: ID del Input → ID del elemento en la Card
const FIELD_MAP = [
  ['sTime',      'cSTime'],
  ['sHostname',  'cSHostname'],
  ['sAgentIp',   'cSAgentIp'],
  ['sPort',      'cSPort'],
  ['sLogonType', 'cSLogonType'],
  ['sCuenta',    'cSCuenta'],
  ['sLog',       'cSLog'],
];

// ── Generate ─────────────────────────────────

export function generate() {
  // Actualizar la hora en la cabecera de la tarjeta
  document.getElementById('speiTime').textContent = now();

  // Insertar los valores en la vista previa
  FIELD_MAP.forEach(([inputId, cardId]) => setText(cardId, val(inputId)));

  // Construir el mensaje en texto plano
  const lines = [
    `🏦 *[SPEI / SPID ALERT]*`,
    `*Time:* ${val('sTime')}`,
    `*Hostname:* ${val('sHostname')}`,
    `*Agent IP Addresses:* ${val('sAgentIp')}`,
    `*Action Port:* ${val('sPort')}`,
    `*Logon Type:* ${val('sLogonType')}`,
    `*Cuenta Loggeada:* ${val('sCuenta')}`,
    `*Log del Evento:* ${val('sLog')}`
  ];

  const plainText = lines.join('\n');
  document.getElementById('plainBox').textContent = plainText;
}

// Dependiendo de tu configuración de importaciones, asegúrate de atarlo al window
window.__spei = { generate };