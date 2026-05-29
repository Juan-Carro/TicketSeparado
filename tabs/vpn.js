// tabs/vpn.js — VPN
import { now, val, setText, veredictoLabel, vtColor } from '../core.js';

let selectedMotivo    = 'Fuera de país';
let selectedVeredicto = '';

export function selectMotivo(el, motivo) {
  document.querySelectorAll('#vpnForm .sbtn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedMotivo = motivo;
  const soloHorario = motivo === 'Fuera de horario';
  document.getElementById('vCountryField').classList.toggle('hidden', soloHorario);
  document.getElementById('cVCountryRow').classList.toggle('hidden', soloHorario);
}

export function selectVeredicto(el, v) {
  document.querySelectorAll('#vpnVeredictoGrid .vbtn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedVeredicto = v;
}

export function updateVT(v) {
  const n  = parseInt(v) || 0;
  const el = document.getElementById('vtDisplay');
  el.textContent = `${n} / 90`;
  el.style.color = vtColor(n);
}

export function generate() {
  const vt          = document.getElementById('vtScore').value || '0';
  const vl          = veredictoLabel(selectedVeredicto);
  const soloHorario = selectedMotivo === 'Fuera de horario';

  document.getElementById('vpnTime').textContent      = now();
  document.getElementById('vpnCardTitle').textContent = `🌐 VPN — ${selectedMotivo}`;

  setText('cVCase',      val('vCaseId'));
  setText('cVTimestamp', val('vTimestamp'));
  setText('cVUser',      val('vUser'));
  setText('cVHostname',  val('vHostname'));
  setText('cVIp',        val('vIp'));
  setText('cVVT',        `${vt} / 90`);
  setText('cVVeredicto', vl);
  setText('cVBlacklist', val('vBlacklist'));
  document.getElementById('cVCountryRow').classList.toggle('hidden', soloHorario);
  if (!soloHorario) setText('cVCountry', `${val('vCountry')} 🚩`);

  document.getElementById('plainBox').textContent = [
    `🌐 *[VPN ALERT — ${selectedMotivo.toUpperCase()}]*`,
    `*Case ID:* ${val('vCaseId')}`,
    `*Timestamp:* ${val('vTimestamp')}`,
    `*User:* ${val('vUser')}`,
    `*Hostname:* ${val('vHostname')}`,
    `*IP:* ${val('vIp')}`,
    `*VT Score:* ${vt} / 90`,
    !soloHorario ? `*Country:* ${val('vCountry')} 🚩 (Out of Mexico)` : null,
    `*Veredicto:* ${vl}`,
    `*Blacklist:* ${val('vBlacklist')}`,
  ].filter(Boolean).join('\n');
}
