// tabs/spei.js — SPEI / SPID
import { now, val, setText } from '../core.js';

export function generate() {
  document.getElementById('speiTime').textContent = now();

  setText('cSpAgentIp',    val('spAgentIp'));
  setText('cSpActionPort', val('spActionPort'));
  setText('cSpLogonType',  val('spLogonType'));
  setText('cSpCuenta',     val('spCuenta'));
  setText('cSpLogEvento',  val('spLogEvento'));
  setText('cSpHostname',   val('spHostname'));
  setText('cSpTime',       val('spTime'));

  document.getElementById('plainBox').textContent = [
    `🏦 *[SPEI/SPID ALERT]*`,
    `*Agent IP Address:* ${val('spAgentIp')}`,
    `*Action Port:* ${val('spActionPort')}`,
    `*Logon Type:* ${val('spLogonType')}`,
    `*Cuenta loggeada:* ${val('spCuenta')}`,
    `*Log del evento:* ${val('spLogEvento')}`,
    `*Hostname:* ${val('spHostname')}`,
    `*Time:* ${val('spTime')}`,
  ].join('\n');
}
