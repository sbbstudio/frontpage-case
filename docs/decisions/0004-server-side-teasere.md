# 0004 — Server-side rendering av teasere

Dato: 9. oktober 2026.

## Beslutning

`GET /component` henter saker fra Amedias API og lager HTML for teaserne på serveren. Preview sender `publication` og `count` til komponenten. Nettleseren mottar ferdig HTML med bilde, tittel og lenke for hver sak som har de nødvendige feltene.

API-hentingen og klargjøringen ligger i `src/fetch-teasers.js`. Funksjonen får validert `publication` og `count`, og returnerer teaserdata. Komponentruten beholder validering, HTML og HTTP-respons; en hentefeil gir fortsatt HTTP 502. Dette skillet gjør databehandlingen tilgjengelig for kontroller uten å kjøre en HTTP-server.

## Begrunnelse

Rune valgte server-side rendering fordi dataflyten allerede går gjennom komponentruten. Serveren kan bruke API-svaret til å sette sammen siden før den sendes til nettleseren. Nettleseren trenger dermed ikke å gjøre et eget kall til nyhets-API-et for å tegne teaserne.

Serveren henter saker i grupper på 20 når komponentruten åpnes. Hvis en gruppe ikke gir nok gyldige teasere, henter den neste gruppe med `offset` til den har ønsket antall eller API-et ikke har flere saker. Valget fjerner ikke API-avhengigheten eller ventetiden. API-feil og ugyldige parametere håndteres i komponentruten.

## Kontroller og begrensninger

API-hentingen bruker en samlet frist på fem sekunder for alle grupper og lesing av responsinnhold. Nettverksfeil, HTTP-feil, ugyldig JSON og timeout gir HTTP 502 med en enkel beskjed. Et tomt eller uventet svar avslutter hentingen og beholder listen samlet så langt. Denne avgrensningen prioriterer at forhåndsvisningen svarer innen rimelig tid; en treg kilde kan derfor gi feil selv om den ville svart senere.

Ved den opprinnelige kontrollen kontrollerte Codex lokalt at `count=1` ga én teaser, `count=10` ga åtte teasere fra et svar med ti saker, og ugyldig `count` ga HTTP 400. Rune så de faktiske teaserne i previewen og formulerte begrunnelsen for server-side rendering. To av de ti sakene manglet bilde i feltet som komponenten bruker, og ble hoppet over.

Gjeldende automatiserte tester dekker bildefilter, antall, rekkefølge, viderehenting, API-feil, timeout, tomtilstand og avvisning av ugyldig avis. Nyhetskilden simuleres; HTTP-feiltestene bruker en lokal testserver. Layout, CI og videre kontroller beskrives i de neste leveransene.
