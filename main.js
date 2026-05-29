// main.js — Entry point
// Importa todos los módulos y expone al window solo los handlers
// que el HTML necesita para los onclick

import { switchTab, copyPlain } from './core.js';
import * as ad   from './tabs/ad.js';
import * as vpn  from './tabs/vpn.js';
import * as file from './tabs/file.js';
import * as conn from './tabs/conn.js';
import * as spei from './tabs/spei.js';

window.SOC = { switchTab, copyPlain, ad, vpn, file, conn, spei };
