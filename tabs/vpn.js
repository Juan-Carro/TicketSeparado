// ─────────────────────────────────────────────
// tabs/vpn.js — VPN tab logic
// ─────────────────────────────────────────────

import { now, val, setText, veredictoLabel, vtColor } from '../core.js';

let selectedMotivo   = 'Fuera de país';
let selectedVeredicto = '';

// ── Motivo selector ──────────────────────────

function selectMotivo(el, motivo) {
  document.querySelectorAll('#vpnForm .sbtn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedMotivo = motivo;
}

// ── Veredicto selector ───────────────────────

function selectVeredicto(el, v) {
  document.querySelectorAll('#vpnVeredictoGrid .vbtn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedVeredicto = v;
}

// ── VT Score display ─────────────────────────

function updateVT(v) {
  const n  = parseInt(v) || 0;
  const el = document.getElementById('vtDisplay');
  el.textContent = `${n} / 90`;
  el.style.color = vtColor(n);
}

// ── Generate ─────────────────────────────────

function generate() {
  const vt = document.getElementById('vtScore').value || '0';
  const vl = veredictoLabel(selectedVeredicto);

  document.getElementById('vpnTime').textContent      = now();
  document.getElementById('vpnCardTitle').textContent = `🌐 VPN — ${selectedMotivo}`;

  setText('cVCase',      val('vCaseId'));
  setText('cVTimestamp', val('vTimestamp'));
  setText('cVUser',      val('vUser'));
  setText('cVHostname',  val('vHostname'));
  setText('cVIp',        val('vIp'));
  setText('cVVT',        `${vt} / 90`);
  setText('cVCountry',   `${val('vCountry')} 🚩`);
  setText('cVVeredicto', vl);
  setText('cVBlacklist', val('vBlacklist'));

  const lines = [
    `🌐 *[VPN ALERT — ${selectedMotivo.toUpperCase()}]*`,
    `*Case ID:* ${val('vCaseId')}`,
    `*Timestamp:* ${val('vTimestamp')}`,
    `*User:* ${val('vUser')}`,
    `*Hostname:* ${val('vHostname')}`,
    `*IP:* ${val('vIp')}`,
    `*VT Score:* ${vt} / 90`,
    `*Country:* ${val('vCountry')} 🚩 (Out of Mexico)`,
    `*Veredicto:* ${vl}`,
    `*Blacklist:* ${val('vBlacklist')}`,
  ].join('\n');

  document.getElementById('plainBox').textContent = lines;
}

// ── Expose globally ──────────────────────────

window.__vpn = { selectMotivo, selectVeredicto, updateVT, generate };
