// ─────────────────────────────────────────────
// tabs/conn.js — Conexiones sospechosas logic
// ─────────────────────────────────────────────

import { now, val, setText, veredictoLabel, vtColor } from '../core.js';

let selectedVeredicto = '';

// ── Veredicto selector ───────────────────────

function selectVeredicto(el, v) {
  document.querySelectorAll('#connVeredictoGrid .vbtn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedVeredicto = v;
}

// ── VT Score display ─────────────────────────

function updateVT(v) {
  const n  = parseInt(v) || 0;
  const el = document.getElementById('cVtDisplay');
  el.textContent = `${n} / 90`;
  el.style.color = vtColor(n);
}

// ── Generate ─────────────────────────────────

function generate() {
  const vt = document.getElementById('cVtScore').value || '0';
  const vl = veredictoLabel(selectedVeredicto);

  document.getElementById('connTime').textContent = now();

  setText('cCCase',      val('cCaseId'));
  setText('cCTimestamp', val('cTimestamp'));
  setText('cCDesc',      val('cDesc'));
  setText('cCHost',      val('cHost'));
  setText('cCUser',      val('cUser'));
  setText('cCActivo',    val('cTipoActivo'));
  setText('cCIpOrigen',  val('cIpOrigen'));
  setText('cCIpDestino', val('cIpDestino'));
  setText('cCDominio',   val('cDominio'));
  setText('cCVT',        `${vt} / 90`);
  setText('cCVeredicto', vl);

  const lines = [
    `🔌 *[CONEXIÓN SOSPECHOSA]*`,
    `*Case ID:* ${val('cCaseId')}`,
    `*Time Stamp:* ${val('cTimestamp')}`,
    `*Descripción:* ${val('cDesc')}`,
    `*Host:* ${val('cHost')}`,
    `*User:* ${val('cUser')}`,
    `*Tipo de activo:* ${val('cTipoActivo')}`,
    `*IP Origen:* ${val('cIpOrigen')}`,
    `*IP Destino:* ${val('cIpDestino')}`,
    `*Dominio:* ${val('cDominio')}`,
    `*VT Score:* ${vt} / 90`,
    `*Veredicto:* ${vl}`,
  ].join('\n');

  document.getElementById('plainBox').textContent = lines;
}

// ── Expose globally ──────────────────────────

window.__conn = { selectVeredicto, updateVT, generate };
