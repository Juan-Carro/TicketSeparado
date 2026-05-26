// ─────────────────────────────────────────────
// tabs/ad.js — AD On-Prem tab logic
// ─────────────────────────────────────────────

import { now, val, setText } from '../core.js';

let selectedTipo = 'Cuenta deshabilitada';

// ── Tipo selector ────────────────────────────

function selectTipo(el) {
  document.querySelectorAll('#adForm .tipo-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedTipo = el.dataset.tipo;

  const isGrupo = selectedTipo === 'Adición a grupo admin';
  document.getElementById('grupoField').classList.toggle('hidden', !isGrupo);
  document.getElementById('cAdGrupoRow').classList.toggle('hidden', !isGrupo);
}

// ── Generate ─────────────────────────────────

function generate() {
  const sev     = document.getElementById('adSev').value;
  const isGrupo = selectedTipo === 'Adición a grupo admin';

  // Update card header
  document.getElementById('adTime').textContent      = now();
  document.getElementById('adCardTitle').textContent = `*[AD ALERT — ${sev}]*`;

  // Update card fields
  setText('cAdEvento',    selectedTipo);
  setText('cAdTimestamp', val('adTimestamp'));
  setText('cAdDesc',      val('adDesc'));
  setText('cAdTicket',    val('adTicket'));
  setText('cAdEjUser',    val('adEjecutorUser'));
  setText('cAdEjId',      val('adEjecutorId'));
  setText('cAdHostname',  val('adHostname'));
  setText('cAdAfUser',    val('adAfectadoUser'));
  setText('cAdAfId',      val('adAfectadoId'));

  document.getElementById('cAdGrupoRow').classList.toggle('hidden', !isGrupo);
  setText('cAdGrupo', isGrupo ? val('adGrupo') : '—');

  // Build plain text
  const lines = [
    `*[AD ALERT — ${sev}]*`,
    `*Evento:* ${selectedTipo}`,
    `*Timestamp:* ${val('adTimestamp')}`,
    `*Descripción:* ${val('adDesc')}`,
    `*Ticket ID:* ${val('adTicket')}`,
    `*Usuario ejecutor:* ${val('adEjecutorUser')}`,
    `*ID Usuario ejecutor:* ${val('adEjecutorId')}`,
    `*Hostname:* ${val('adHostname')}`,
    `*Usuario afectado:* ${val('adAfectadoUser')}`,
    `*ID / SID:* ${val('adAfectadoId')}`,
    isGrupo ? `*Grupo:* ${val('adGrupo')}` : null,
  ].filter(Boolean).join('\n');

  document.getElementById('plainBox').textContent = lines;
}

// ── Expose globally ──────────────────────────

window.__ad = { selectTipo, generate };
