# Leseguide til forsidecaset

Dette er Rune Øverlands videreutvikling av [Amedias oppgave](amedia-original.md). Guiden beskriver den lokale implementasjonen per 13. oktober 2026. Oppgaven og [skissene](sketches/) er beholdt som referanse; [prosjektets README](../../README.md) beskriver oppstart på Node 24 og kjente begrensninger.

## Fra forespørsel til teasere

1. `npm start` kjører [src/server.js](../../src/server.js). Serveren kobler `/frontpage-case` til routeren, og `/frontpage-case/assets` til filene i `public/`.
2. [router.js](../../src/routes/router.js) leser `publication` på `/preview`, kontrollerer formatet og kaller [preview.view.js](../../src/views/preview.view.js). DT er standard når avisvalget mangler.
3. Preview returnerer HTML-rammen med tre `amedia-include`: Amedias header, lokal avisvelger og lokale teasere. Amedias eksterne `include.js` kjører i nettleseren og laster komponentene.
4. Teaser-include henter `/manifest`. [frontpage-manifest.js](../../src/manifests/frontpage-manifest.js) beskriver `/component`, parameterne `publication` og `count` og CSS-/JavaScript-adressene. Manifestet lager ikke HTML eller henter nyhetssaker selv.
5. `/component` validerer avis og antall og kaller [fetch-teasers.js](../../src/fetch-teasers.js). Ved direkte kall uten parametere er standarden BA og ti teasere. Preview sender alltid valgt avis og antall ti videre.
6. `fetchTeasers` henter Amedia-saker, leser JSON, plukker tittel, artikkelsti og bilde og filtrerer bort uegnede saker. Funksjonen returnerer data; routeren bygger teaser-HTML, beskytter innhold med `escapeHtml` og sender responsen.
7. Include setter HTML-en inn i siden og laster [frontpage.css](../../public/frontpage.css). [frontpage.js](../../public/frontpage.js) skriver bare en konsollmelding; det bygger ikke teaserne.

## Krav og gjeldende løsning

| Krav fra Amedia | Implementasjon og begrunnelse |
| --- | --- |
| Siste publiserte saker med bilde, tittel og lenke | API-søk med `sort=lastPublishedDate`, `types=story` og `publicationDomain`. Teaser-HTML bygges på serveren. [Beslutning om rendering](../decisions/0004-server-side-teasere.md). |
| Filtrer bort saker uten bilde | Bildet hentes fra en `imageRelation` under `story._embedded.relations`, med `fields.versions.large.url`. Filteret krever også en ikke-tom tittel, artikkelsti som starter med `/` men ikke `//`, og bilde-URL som starter med `https://`. |
| Velg avis i preview-adressen | `?publication=www.ba.no` eller `?publication=www.dt.no`. Samme avis sendes til header og teasere. [Lokal avisvelger](../decisions/0005-avisvelger-som-include.md). |
| Layout på stor og liten skjerm, maks 980 px | Hovedsak i full bredde; øvrige saker i mobilrader eller tre kolonner fra 700 px. [Layoutvalg](../decisions/0007-layout-etter-skisser.md) og [før/etter-bevis](../evidence/2026-10-12-layout.md). |

Hentingen går i grupper på 20 og beholder API-rekkefølgen. Den fortsetter ved behov, til ønsket antall eller en kort/tom gruppe. Resultatet kan være kortere enn ønsket antall. Alle grupper og JSON-lesing deler én timeout på fem sekunder.

## Respons og kontroller

| Situasjon | Komponentrutens respons |
| --- | --- |
| Gyldige teasere | HTTP 200 med teaser-HTML. |
| Ingen egnede saker | HTTP 200 med «Ingen saker med bilde akkurat nå.» |
| Ugyldig avisformat eller antall | HTTP 400 før nyhets-API-et kalles. |
| Nettverksfeil, HTTP-feil, ugyldig JSON eller timeout | HTTP 502 med «Kunne ikke hente nyheter nå.» |

Kontrollert av Codex 13. oktober 2026: `npm test` på Node 24.21.0 ga 12 av 12 beståtte tester.

`npm test` kjører [filtertestene](../../tests/fetch-teasers.test.js) og [API-feiltestene](../../tests/api-errors.test.js). Testene bruker simulerte API-svar; HTTP-testene starter en midlertidig lokal server. De dekker filter, rekkefølge, antall, viderehenting, feil, tomtilstand, ugyldig avis og avbrudd under JSON-lesing. Testene beviser ikke tilgjengeligheten til live API eller nettleserens include-feilhåndtering.

Den visuelle kontrollen dokumenterer seks nettleserbredder og tastaturfokus. Den er ikke en fysisk mobiltest eller en full tilgjengelighetskontroll. Lokale uavhengige AI-reviewer er avgrenset til konkrete leveranser; [layoutreviewet](../evidence/2026-10-12-layout-review.md) beskriver sitt scope.

## Begrensninger og videre arbeid

- Preview og manifest bruker hardkodet `localhost:8080/frontpage-case`. Bruk port 8080 ved lokal gjennomgang; en endret `PORT` oppdaterer ikke komponentadressene.
- Header, include-laster, API og bilder krever nettverk. Headerens relative navigasjonslenker har ikke lokale artikkel-/menyruter i caset.
- Avisformat valideres, men avisdomenet kontrolleres ikke mot en liste over støttede publikasjoner. `count` har ingen praktisk øvre grense utover sikkert heltall. Det finnes ikke cache eller retry i hentingen.
- Bildene beskjæres av CSS. Validering av bilde-URL garanterer ikke at bildet faktisk kan lastes.
- CI kjører automatiserte tester i GitHub; [leveransekontrollen](../evidence/2026-10-13-delivery.md) lenker faktiske resultater. `npm run build` er en plassholder. Refaktoreringen av API-hentingen har fått teknisk AI-review; Runes siste gjennomgang er fortsatt åpen. Avhengighetsgjeld og automatisk omstart er beskrevet i [oppstartsbeslutningen](../decisions/0002-node24-og-lokal-oppstart.md).
- Dette er en lokal caseimplementasjon, ikke en produksjonsdeploy. GitHub-KR-er har egne akseptansekriterier; dokumentasjon og beståtte lokale tester alene lukker dem ikke.

Rune har valgt server-side rendering og include-basert avisvelger, bekreftet avisbytte med tastatur og gjennomgått deler av backendflyten. Codex har bidratt med implementasjon, tester, CSS, dokumentasjon og verifikasjon på Runes bestilling. Uavhengig AI-review er utført av separate reviewerinstanser. Dette er ikke en påstand om at Rune selv skrev eller kontrollerte hver linje.
