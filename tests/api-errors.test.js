/*
{
  "ansvar": "Kontrollere HTTP-respons ved API-feil, timeout og tomme svar",
  "inn": "Faste API-svar og lokale HTTP-forespørsler",
  "ut": "Beståtte eller feilede node:test-kontroller",
  "brukes_av": "npm test",
  "ved_feil": "Testkjøringen feiler ved feil status, beskjed eller manglende avbrudd",
  "sideeffekter": "Midlertidig lokal HTTP-server og mock av API-kall; ingen live API"
}
*/

import assert from 'node:assert/strict';
import test from 'node:test';
import { once } from 'node:events';
import express from 'express';
import router from '../src/routes/router.js';

// ---- Lokal testserver ----
// Klienten beholder ekte fetch; bare routerens kall til nyhetskilden erstattes.
const httpFetch = globalThis.fetch;
async function localServer(t) {
  const app = express();
  app.use('/frontpage-case', router);
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeIdleConnections();
  }));
  return `http://127.0.0.1:${server.address().port}/frontpage-case`;
}

// ---- Feil og fortsatt tilgjengelig server ----
for (const [name, apiFetch] of [
  ['nettverksfeil', async () => { throw new Error('Intern nettverksdetalj'); }],
  ['HTTP-feil', async () => ({ ok: false, status: 503 })],
  ['ugyldig JSON', async () => ({ ok: true, json: async () => { throw new SyntaxError('Intern JSON-detalj'); } })]
]) {
  test(`${name} gir forståelig HTTP 502 og serveren svarer videre`, async (t) => {
    const base = await localServer(t);
    t.mock.method(globalThis, 'fetch', apiFetch);
    const response = await httpFetch(`${base}/component?publication=www.ba.no`);
    assert.equal(response.status, 502);
    assert.equal(await response.text(), 'Kunne ikke hente nyheter nå.');
    const next = await httpFetch(`${base}/manifest`);
    assert.equal(next.status, 200);
    assert.match(await next.text(), /frontpage-case-component/);
  });
}

// ---- Tomme eller uventede svar ----
for (const [name, data] of [['tomt svar', { _embedded: [] }], ['uventet format', { unexpected: true }]]) {
  test(`${name} gir tomtilstand med HTTP 200`, async (t) => {
    const base = await localServer(t);
    t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => data }));
    const response = await httpFetch(`${base}/component`);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), '<amedia-frontpage>Ingen saker med bilde akkurat nå.</amedia-frontpage>');
  });
}

// ---- Stopp ugyldig avis før API-kall ----
test('ugyldig publication gir HTTP 400 uten kall til nyhetskilden', async (t) => {
  const base = await localServer(t);
  const mock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Skal ikke kalles'); });
  const response = await httpFetch(`${base}/component?publication=https%3A%2F%2Fbad`);
  assert.equal(response.status, 400);
  assert.equal(await response.text(), 'Ugyldig publikasjon.');
  assert.equal(mock.mock.callCount(), 0);
});

// ---- Timeout også etter at responsheaderne er mottatt ----
test('samlet timeout avbryter treg JSON-lesing i neste gruppe', { timeout: 10000 }, async (t) => {
  const base = await localServer(t);
  let firstSignal;
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (_url, { signal }) => {
    calls += 1;
    if (calls === 1) {
      firstSignal = signal;
      return { ok: true, json: async () => ({ _embedded: Array.from({ length: 20 }, () => ({})) }) };
    }
    assert.equal(signal, firstSignal, 'Neste gruppe må bruke samme timeout');
    return { ok: true, json: () => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }) };
  });
  const response = await httpFetch(`${base}/component`);
  assert.equal(response.status, 502);
  assert.equal(await response.text(), 'Kunne ikke hente nyheter nå.');
  assert.equal(firstSignal.aborted, true);
  assert.equal(calls, 2);
  const next = await httpFetch(`${base}/manifest`);
  assert.equal(next.status, 200);
});
