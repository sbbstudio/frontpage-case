# Forside — Rune Øverland

## Hva dette er

Videreutvikling av [Amedias forsidecase](https://github.com/amedia/frontpage-case). Denne leveransen henter nyhetssaker og lager teaser-HTML på serveren. [Oppgavegrunnlaget](docs/case/amedia-original.md) og Amedias commit-historikk er bevart.

Flyt: [server.js](src/server.js) kobler routeren til `/frontpage-case`. [router.js](src/routes/router.js) velger avis på `/preview`, og [preview.view.js](src/views/preview.view.js) lager HTML med include. [Manifestet](src/manifests/frontpage-manifest.js) peker på `/component`, som validerer input, kaller [fetchTeasers](src/fetch-teasers.js) og lager HTML.

## Slik kjører du det

Bruk Node 24. Fra repoets rot: `npm ci`, deretter `npm start`. Åpne http://localhost:8080/frontpage-case/preview?publication=www.ba.no. Preview bruker DT som standard. Direkte komponentkall bruker BA og ti teasere som standard. Stopp med Ctrl+C.

`npm test` kjører node:test med faste API-svar. Testene dekker filter, rekkefølge, antall, viderehenting, API-feil, tomtilstand, ugyldig avis og samlet timeout under JSON-lesing. De bruker ikke live nyhets-API; HTTP-testene starter en lokal server. CI følger i egen leveranse.

## Mappene

- `src/`: server, config, ruter, manifest, preview og API-henting.
- `public/`: nettleserens CSS og JavaScript.
- `config/`: miljøfiler; config/local.json er lokal og ignorert.
- `tests/`: automatiserte node:test-kontroller.
- `docs/`: oppgave, beslutninger og verifikasjon.
- `.github/` og `.vscode/`: verktøyoppsett.

## Regler og beslutninger

[Arbeidsregler](AGENTS.md), [server-side rendering](docs/decisions/0004-server-side-teasere.md) og [Node-valget](docs/decisions/0002-node24-og-lokal-oppstart.md).

Hentingen går i grupper på 20, filtrerer tittel/artikkelsti/HTTPS-bilde og returnerer opptil count i API-rekkefølge. Fem sekunder deles av alle grupper og JSON-lesing. Ugyldig input gir 400, hentefeil gir 502, tom liste gir beskjed med 200. Titler og attributter escapes ved HTML-bygging.

Begrensninger: hardkodet localhost:8080, nettverk til Amedia nødvendig, ingen cache/retry og ingen praktisk count-grense utover sikkert heltall. Layout, CI og videre overleveringsdokumentasjon følger i egne leveranser. Avhengighetsgjeld er beskrevet i oppstartsbeslutningen. Ingen produksjonsdeploy.

Rune valgte server-side rendering. Codex bidro med implementasjon, tester og dokumentasjon på bestilling. Uavhengig review er avgrenset per leveranse; Rune har ikke kontrollert hver linje. GitHub KR3–KR7/KR9 har egne akseptansekriterier.
