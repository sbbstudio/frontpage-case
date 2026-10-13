/*
{
  "ansvar": "Ta imot forsideforespørsler, kontrollere parametere og sende svar",
  "inn": "GET under basePath, med publication og count fra URL-en",
  "ut": "Manifest som JSON, preview og komponenter som HTML",
  "brukes_av": "src/server.js",
  "ved_feil": "Ugyldige parametere gir 400, hentefeil gir 502, tom liste gir beskjed med 200",
  "sideeffekter": "HTTP-svar, forespørselslogger og API-henting via fetchTeasers"
}
*/

import express from 'express';
import logger from '../logger.js';
import fetchTeasers from '../fetch-teasers.js';

// ---- Visninger og komponentmanifest ----
import preview from '../views/preview.view.js';
import renderPublicationSelector from '../views/publication-selector.view.js';
import manifest from '../manifests/frontpage-manifest.js';
import publicationSelectorManifest from '../manifests/publication-selector-manifest.js';

const router = express.Router();

// API-verdier settes inn i HTML. Beskytt tekst og attributter mot å bli tolket som kode.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[character]);

// ---- Avisvelger ----
// Manifest: forteller include-komponenten hvor avisvelgerens HTML og CSS kan hentes.
router.get('/publication-selector/manifest', (req, res) => {
  res.json(publicationSelectorManifest);
});

// HTML: leverer avisvelgerens lenker til include-komponenten.
router.get('/publication-selector', (req, res) => {
  res.type('text/html');
  const html = renderPublicationSelector();
  res.end(html);
});

// ---- Teasere ----
// Manifest: forteller include-komponenten hvor teasernes HTML, CSS og JavaScript kan hentes.
router.get(
  '/manifest',
  (req, res) => {
    logger.info('Request /manifest route');
    return res.json(manifest);
  }
);

// HTML: kontrollerer forespørselen, ber fetchTeasers om data og bygger teaser-HTML.
// Include-komponenten får HTML-svaret; API-henting og filtrering ligger i fetch-teasers.js.
router.get('/component', async (req, res) => {

  // ---- Velg og kontroller avis ----
  // Les avisverdien fra forespørselen. Ved direkte kall uten publication brukes BA.
  // Ugyldig format stoppes med HTTP 400 før vi kontakter API-et.
  const publication = req.query.publication ?? 'www.ba.no';
  if (typeof publication !== 'string' || !/^[a-z0-9.-]+$/i.test(publication) || !URL.canParse(`https://${publication}`)) {
    return res.status(400).send('Ugyldig publikasjon.');
  }

  // ---- Velg og kontroller antall teasere ----
  // Bruk ti hvis count mangler. Antallet må være et positivt, sikkert heltall.
  const requestedCount = req.query.count ?? '10';
  const count = Number(requestedCount);
  if (typeof requestedCount !== 'string' || !Number.isSafeInteger(count) || count < 1) {
    return res.status(400).send('Ugyldig antall saker.');
  }

  // ---- Hent teaserdata ----
  // Send validert avis og antall til fetch-teasers.js. await venter på listen med saker.
  // Hvis hentingen feiler, gir ruten HTTP 502 og en forståelig beskjed.
  logger.info('Request /component route');
  res.type('text/html');
  let teasers;
  try {
    teasers = await fetchTeasers({ publication, count });
  } catch {
    return res.status(502).send('Kunne ikke hente nyheter nå.');
  }

  // ---- Vis tomtilstand ----
  // Hentingen kan lykkes uten egnede saker. Da viser vi en beskjed med HTTP 200.
  if (teasers.length === 0) {
    return res.end('<amedia-frontpage>Ingen saker med bilde akkurat nå.</amedia-frontpage>');
  }

  // ---- Lag teaser-HTML ----
  // Koble artikkelstien til valgt avis, og lag bilde, lenke og tittel for hver sak.
  // escapeHtml beskytter API-verdiene; join samler artiklene til én HTML-tekst.
  const articles = teasers.map((teaser) => {
    const articleUrl = new URL(teaser.path, `https://${publication}`).href;
    return `
    <article>
      <a href="${escapeHtml(articleUrl)}">
        <img src="${escapeHtml(teaser.imageUrl)}" alt="" width="320">
        <h2>${escapeHtml(teaser.title)}</h2>
      </a>
    </article>`;
  }).join('');

  // ---- Send HTML-svaret ----
  // Include-komponenten setter inn HTML-en i preview; CSS bestemmer utseendet.
  return res.end(`<amedia-frontpage>${articles}
  </amedia-frontpage>`);
});

// ---- Forhåndsvisning ----
// Lager forhåndsvisningen for valgt avis, med www.dt.no som standard.
// Kontrollerer avisverdien før preview() lager HTML-en som sendes til nettleseren.
router.get('/preview', (req, res) => {
  logger.info('Request /preview route');
  res.type('text/html');

  const publication = req.query.publication ?? 'www.dt.no';
  if (
    typeof publication !== 'string' ||
    !/^[a-z0-9.-]+$/i.test(publication) ||
    !URL.canParse(`https://${publication}`)
  ) {
    return res.status(400).send('Ugyldig publikasjon.');
  }
  const html = preview({ publication });
  res.end(html);
});

// ---- Eksport av routeren ----
export default router;
