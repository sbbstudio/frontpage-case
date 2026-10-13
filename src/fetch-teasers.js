/*
{
  "ansvar": "Hente saker fra Amedias API og velge egnede teasere",
  "inn": "Validert publication og positivt, sikkert heltall count fra routeren",
  "ut": "Liste med title, path og imageUrl, i API-rekkefølge",
  "brukes_av": "src/routes/router.js → GET /component",
  "ved_feil": "Kaster feil ved API-feil eller timeout; tomt eller uventet svar avslutter hentingen",
  "sideeffekter": "API-kall og feillogging"
}
*/

import logger from './logger.js';

// ---- Hent og klargjør teaserdata ----
/**
 * Routeren må validere publication og count før kall.
 * Returnerer opptil count teasere i API-rekkefølge; listen kan være tom.
 * Henter 20 saker om gangen innen én samlet frist på fem sekunder,
 * inkludert lesing av JSON. Tomt eller uventet svar gir listen samlet så langt.
 * Nettverksfeil, HTTP-feil, ugyldig JSON og timeout avbryter med feil;
 * routeren velger HTTP-status og lager HTML av resultatet.
 */
export default async function fetchTeasers({ publication, count }) {

  // ---- Bygg API-adressen ----
  // API-et kaller avisparameteren publicationDomain. Be om de nyeste sakene, 20 om gangen.
  const apiURL = new URL('https://services.api.no/api/acpcomposer/v1.1/search/content/');
  apiURL.searchParams.set('publicationDomain', publication);
  apiURL.searchParams.set('sort', 'lastPublishedDate');
  apiURL.searchParams.set('types', 'story');
  apiURL.searchParams.set('limit', '20');
  const teasers = [];

  // ---- Avgrens ventetiden ----
  // Samme signal gjelder alle grupper og responsinnholdet, så neste gruppe ikke får ny frist.
  const signal = AbortSignal.timeout(5000);

  // ---- Hent grupper til vi har nok teasere ----
  // offset flytter søket til neste gruppe; bare godkjente teasere teller mot ønsket antall.
  for (let offset = 0; teasers.length < count; offset += 20) {
    signal.throwIfAborted();
    if (offset > 0) {
      apiURL.searchParams.set('offset', String(offset));
    }

    // ---- Kontakt API-et ----
    // Feil avbryter hentingen og kastes videre til routerens catch-blokk.
    let apiResponse;
    try {
      apiResponse = await fetch(apiURL, { signal });
    } catch (error) {
      logger.error(error, 'Kunne ikke kontakte Amedia API');
      throw new Error('Kunne ikke hente nyheter nå.');
    }
    if (!apiResponse.ok) {
      logger.error({ status: apiResponse.status }, 'Amedia API svarte med HTTP-feil');
      throw new Error('Kunne ikke hente nyheter nå.');
    }

    // ---- Les saksdata som JSON ----
    // Et vellykket HTTP-svar kan fortsatt ha ugyldig JSON.
    let apiData;
    try {
      apiData = await apiResponse.json();
    } catch (error) {
      logger.error(error, 'Kunne ikke lese JSON fra Amedia API');
      throw new Error('Kunne ikke hente nyheter nå.');
    }
    signal.throwIfAborted();

    // ---- Klargjør og filtrer sakene ----
    // Plukk ut tittel, artikkelsti og stort bilde fra API-strukturen.
    // Behold bare saker med tittel, lokal artikkelsti og HTTPS-bilde.
    const stories = Array.isArray(apiData?._embedded) ? apiData._embedded : [];
    const validTeasers = stories.map((story) => ({
      title: story?.title,
      path: story?.fields?.relativeUrl,
      imageUrl: (Array.isArray(story?._embedded?.relations) ? story._embedded.relations : []).find((relation) =>
        relation.type === 'imageRelation' && relation.fields?.versions?.large?.url
      )?.fields?.versions?.large?.url
    })).filter((story) =>
      typeof story.title === 'string' && story.title.trim() &&
      typeof story.path === 'string' && story.path.startsWith('/') && !story.path.startsWith('//') &&
      typeof story.imageUrl === 'string' && story.imageUrl.startsWith('https://')
    );
    // Ta bare det antallet vi fortsatt trenger. Bevar rekkefølgen fra API-et.
    teasers.push(...validTeasers.slice(0, count - teasers.length));

    // En kort eller tom gruppe betyr at API-et ikke har flere saker å lete i.
    if (stories.length < 20) {
      break;
    }
  }

  // ---- Lever teaserdata til routeren ----
  // Routeren bruker listen til å lage HTML og sende HTTP-svaret.
  return teasers;
}
