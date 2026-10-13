#!/usr/bin/env node
/*
{
  "ansvar": "Starte HTTP-serveren og koble ruter og nettleserressurser",
  "inn": "Konfigurasjon fra src/config/config.js",
  "ut": "Server som lytter på konfigurert port",
  "brukes_av": "npm start → node src/server.js",
  "ved_feil": "Ufanget feil logges og avslutter prosessen med kode 1",
  "sideeffekter": "Åpner port, setter opp DNS-cache, logger og registrerer avslutningssignaler"
}
*/

import http from 'http';
import { randomUUID } from 'node:crypto';

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import dnscache from 'dnscache';

import config from './config/config.js';
import logger from './logger.js';
import router from './routes/router.js';

// ---- DNS-cache ----
dnscache({
  enable: true,
  ttl: 30,
  cachesize: 1000,
});

const app = express();

// ---- Applikasjonsoppsett ----
app.disable('x-powered-by');
app.enable('trust proxy');

// ---- Middleware ----
app.use(compression());
app.use(cors());

// ---- Nettleserens CSS og JavaScript ----
app.use(
  `${config.get('basePath')}/assets`,
  (req, res, next) => {
    logger.info('/assets');
    next();
  },
  express.static('public')
);

// ---- Prosjektets ruter ----
app.use(config.get('basePath'), router);

// ---- Logging av middleware-feil ----
app.use((error, _req, res, next) => {
  logger.error(error);
  // do not leak stack trace to response
  next();
});

// ---- HTTP-server ----
const server = http.createServer(app);

// ---- Start serveren ----
server.listen(config.get('httpServerPort'), () => {
  logger.info(`server running at http://localhost:${server.address().port}`);
  logger.info(`server process has pid ${process.pid}`);
  logger.info(`api routes available under http://localhost:${
      server.address().port
    }${config.get('basePath')}`
  );
});

// ---- Avslutt ved ufanget feil ----
// Logg feilen, lukk serveren og avslutt prosessen med feilkode.
process.on('uncaughtException', (error) => {
  logger.error(
    'shutdown - server taken down by force due to a uncaughtException'
  );
  logger.error(error.message);
  logger.error(error.stack);
  server.close();
  process.nextTick(() => {
    process.exit(1);
  });
});

// ---- Avslutt med Ctrl+C ----
process.on('SIGINT', () => {
  logger.info('shutdown - got SIGINT - taking down server gracefully');
  server.close();
  process.nextTick(() => {
    process.exit(0);
  });
});

// ---- Avslutt ved SIGTERM ----
process.on('SIGTERM', () => {
  logger.info('shutdown - got SIGTERM - taking down server gracefully');
  server.close();
  process.nextTick(() => {
    process.exit(0);
  });
});
