/*
{
  "ansvar": "Lage loggeren for server og API-henting",
  "inn": "Logginnstillinger fra src/config/config.js",
  "ut": "Pino-logger med nivå og applikasjonsmetadata",
  "brukes_av": "src/server.js, src/routes/router.js og src/fetch-teasers.js",
  "ved_feil": "Oppsettsfeil fra konfigurasjon eller Pino kastes videre",
  "sideeffekter": "Oppretter logger; skrivemåte styres av prettyLog"
}
*/

import pino from 'pino';
import config from './config/config.js';

// ---- Loggkonfigurasjon ----
const cfg = config.getProperties()

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];

// ---- Logger for server og API-henting ----
export default pino(
  {
    name: cfg.name,
    base: {
      application: cfg.name,
      serverName: cfg.serverName,
      pid: process.pid,
      hostname: cfg.hostName,
    },
    level: cfg.logLevel,
    ...(cfg.prettyLog && {
      transport: {
        target: 'pino-pretty',
        options: {
          ...cfg.prettyLog,
        },
      },
    }),
  },
  cfg.prettyLog ? process.stdout : undefined
);
