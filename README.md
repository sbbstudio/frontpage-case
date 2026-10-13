# Forside — Rune Øverland

## Hva dette er

Et JavaScript/Node.js-prosjekt der jeg videreutvikler [Amedias forsidecase](https://github.com/amedia/frontpage-case). Målet er en responsiv avisforside med saker fra Amedias API, tydelig feilhåndtering og dokumenterte tekniske valg.

**Status:** Under arbeid. Komponentruten henter saker fra Amedias API og viser teasere med bilde, tittel og lenke. En egen include-komponent lar brukeren bytte mellom DT og BA. Layout etter Amedias skisser, samlet API-timeout og tester av teaserfilter og API-feil er lagt inn, og GitHub kjører testene automatisk. Flere KR-er og Runes siste gjennomgang gjenstår. [KR-er og oppgaver](https://github.com/sbbstudio/frontpage-case/issues?q=is%3Aissue%20label%3Akr) viser fremdriften.

### Leserekkefølge

For teknisk gjennomgang: [leseguide til caset](docs/case/README.md) samler dataflyt, krav, kontroller og kjente begrensninger.

1. **Prosjekt og kjøring:** denne siden, deretter [package.json](package.json).
2. **Applikasjonen:** [server](src/server.js) → [ruter](src/routes/router.js) → [preview](src/views/preview.view.js) og [komponentmanifest](src/manifests/frontpage-manifest.js). Nettleserens filer: [frontpage.js](public/frontpage.js) og [frontpage.css](public/frontpage.css).
   Teaserdata hentes og klargjøres i [fetch-teasers.js](src/fetch-teasers.js). Komponenten i routeren validerer forespørselen, kaller funksjonen og lager HTML-svaret.
3. **Kontroller:** [Teasertester](tests/fetch-teasers.test.js) kontrollerer bildefilter, antall og rekkefølge med faste API-svar. Videre testdekning og CI-krav følger [KR9](https://github.com/sbbstudio/frontpage-case/issues/9).
4. **Oppgave og valg:** [originaloppgave og skisser](docs/case/amedia-original.md), deretter [beslutninger](docs/decisions/).
5. **Oppsett:** [applikasjonskonfigurasjon](src/config/config.js), [miljøfiler](config/) og [arbeidsregler](AGENTS.md).

### Leveranseplan

| Byggedag | KR | Resultat |
| --- | --- | --- |
| 1 | [KR1](https://github.com/sbbstudio/frontpage-case/issues/1) | Casen kjører lokalt på støttet Node. |
| 1 | [KR2](https://github.com/sbbstudio/frontpage-case/issues/2) | Dataflyten er kartlagt. |
| 2 | [KR3](https://github.com/sbbstudio/frontpage-case/issues/3) | Saker hentes fra Amedias API. |
| 2 | [KR4](https://github.com/sbbstudio/frontpage-case/issues/4) | Forsiden viser klikkbare teasere. |
| 3 | [KR5](https://github.com/sbbstudio/frontpage-case/issues/5) | Saker uten bilde filtreres bort. |
| 3 | [KR6](https://github.com/sbbstudio/frontpage-case/issues/6) | Brukeren kan bytte avis. |
| 4 | [KR7](https://github.com/sbbstudio/frontpage-case/issues/7) | Forsiden håndterer feil og tomme svar. |
| 4 | [KR8](https://github.com/sbbstudio/frontpage-case/issues/8) | Layouten fungerer på mobil og desktop. |
| 5 | [KR9](https://github.com/sbbstudio/frontpage-case/issues/9) | Løsningen kan kontrolleres automatisk. |
| 5 | [KR10](https://github.com/sbbstudio/frontpage-case/issues/10) | Repoet er klart for overlevering. |

Byggedagene angir rekkefølge, ikke faste kalenderfrister. Hvert KR har oppgaver, akseptansekriterier og krav til verifikasjon. Status vedlikeholdes i GitHub.

### Arbeidsmåte og AI

Arbeidet skjer i små pull requests med avgrenset formål. PR-ene beskriver endringen, begrunnelsen, verifikasjonen og kjente begrensninger.

Kodefilene bruker deloverskrifter med en tom linje foran, og holder sammenhengende kode samlet under hver overskrift. Dette gjør ansvarsdelene enklere å finne. [Arbeidsreglene](AGENTS.md) beskriver oppsettet for senere endringer.

En kort JSON-oversikt i starten av JavaScript- og CSS-filene beskriver ansvar, input, output, kallested, feil og sideeffekter for mennesker og agenter. [Beslutning om filoversikter](docs/decisions/0006-json-filoversikter.md) forklarer formatet og grensene.

Jeg bruker AI aktivt til oppdeling, implementasjonsforslag, review og dokumentasjon. AI-generert kode og tekst skal vurderes mot kravene og den faktiske oppførselen. Jeg har ansvar for valgene og resultatet; AI-bidrag og utførte kontroller beskrives i hver PR.

### Opphav

Startkoden, oppgaveteksten og skissene er laget av Amedia og deres bidragsytere. Utgangspunktet er commit [`59abcf9`](https://github.com/amedia/frontpage-case/commit/59abcf958526698d58a76cf2d212542fb76c0b95). Historikken er bevart, slik at opprinnelig kode og mine endringer kan skilles.

[Den opprinnelige oppgaven](docs/case/amedia-original.md) er bevart som referanse, med relative fil- og bildelenker tilpasset plasseringen. Dette repoet er et selvstendig øvingsprosjekt basert på den oppgaven.

## Slik kjører du det

Bruk **Node 24 LTS**. Oppstarten er kontrollert med Node 24.21.0 og npm 11.19.0. `engines` i `package.json` angir Node 24; npm kan advare om feil versjon, men bytter ikke versjon for deg.

Fra repoets rot, med Node 24 aktiv:

```bash
node --version
npm ci
npm start
```

Åpne <http://localhost:8080/frontpage-case/preview>.

Forventet resultat foreløpig er Drammens Tidende-headeren, en avisvelger med DT og BA og opptil ti teasere fra Amedias API. Serveren leter videre i neste gruppe saker hvis noen mangler bilde i forventet felt. Antallet kan fortsatt bli lavere hvis API-et ikke har nok gyldige saker. Første teaser fyller bredden. Resten vises som rader med bilde til venstre på smal skjerm og i tre kolonner fra 700 px. Komponenten har maksimal ytre bredde 980 px. Stopp serveren med `Ctrl+C` i terminalen der den kjører. Etter endringer i serverkode, visninger eller manifest må `npm start` stoppes og startes igjen. Oppdater nettlesersiden etterpå.

### Avisvelger: fra include til HTML og CSS

[preview.view.js](src/views/preview.view.js) setter sammen header, avisvelger og teasere med tre `amedia-include`-elementer. Headeren leveres av Amedia; avisvelgeren og teaserne leveres av vår server.

Avisvelgerens include peker på `/frontpage-case/publication-selector/manifest`. Derfra er kjeden:

| Fil | Ansvar |
| --- | --- |
| [router.js](src/routes/router.js) | Sender manifestet som JSON på `/publication-selector/manifest` og avisvelgerens HTML på `/publication-selector`. Begge rutene får prefikset `/frontpage-case` fra serveroppsettet. |
| [publication-selector-manifest.js](src/manifests/publication-selector-manifest.js) | Peker på HTML-ruten og CSS-adressen under `/frontpage-case/assets/`. |
| [publication-selector.view.js](src/views/publication-selector.view.js) | Lager HTML med lenker til preview for `www.dt.no` og `www.ba.no`. |
| [publication-selector.css](public/publication-selector.css) | Styler `.publication-selector` og lenkene, inkludert tastaturfokus. |

Et trykk på DT eller BA åpner preview på nytt med `?publication=www.dt.no` eller `?publication=www.ba.no`. Preview bruker avisverdien til både headeren og teaserne. Avisvelgeren trenger ingen egen JavaScript-fil; vanlige lenker står for navigasjonen. Include-koden lastes fortsatt fra Amedia. [Beslutning om egen include-komponent](docs/decisions/0005-avisvelger-som-include.md).

**Manuell kontroll 12. oktober 2026:** Rune bekreftet at avisvelgeren vises med styling, at lenkene bytter avis, at Tab gir fokus, og at Enter bytter til BA uten museklikk. Codex kontrollerte at manifest- og HTML-rutene svarte med HTTP 200 og henholdsvis JSON og HTML. Dette er avgrensede manuelle kontroller, ikke en full tilgjengelighetskontroll eller automatisert testsuite. Implementasjonen ble gjort av Rune med kodeforslag og avgrensede endringer fra Codex; dokumentasjonen er skrevet av Codex.

**Visuelt layoutbevis:** [Kontroll mot begge originalskissene](docs/evidence/2026-10-12-layout.md) dokumenterer seks skjermbredder, før/etter-bilder og tastaturfokus. [Layoutbeslutningen](docs/decisions/0007-layout-etter-skisser.md) forklarer brytepunkt og bildebeskjæring.

**Visuelt CSS-bevis:** Teaserne bruker Arial. [Før/etter-kontroll av skriftendringen](docs/evidence/2026-10-12-teaser-font.md) viser samme BA-side med Comic Sans og Arial, med fil, regel og tilbakeføring. Endringen og kontrollen er utført av Codex på Runes bestilling.

Har du en annen Node-versjon som standard, kan npm hente Node 24 for disse kommandoene uten å bytte global versjon:

```bash
npm exec --yes --package=node@24 -- node --version
npm exec --yes --package=node@24 -- npm ci
npm exec --yes --package=node@24 -- npm start
```

`npm ci` installerer versjonene i `package-lock.json`. Den opprinnelige oppgaven angir Node 18, som er ute av støtte. [Valg av Node-versjon og oppstartskontroll](docs/decisions/0002-node24-og-lokal-oppstart.md) beskriver verifikasjonen.

**Utviklingsmodus:** `npm run dev-start` bruker Nodes `--watch` for automatisk omstart ved filendringer. I det kontrollerte miljøet feilet underprosessen uten en forklarende feilmelding. Årsaken er ikke avklart; bruk den verifiserte `npm start`-kommandoen inntil videre.

### Konfigurasjon og lokale begrensninger

Ingen miljøvariabler eller hemmeligheter trengs for standardoppsettet. `NODE_ENV` er som standard `development`, `PORT` er `8080`, `LOG_LEVEL` er `info`, og `SERVICES_HOSTNAME` er `services.api.no`. Startkoden laster ingen `.env`-fil. Miljøvariabler settes i terminalen før oppstart.

`config/local.json`, hvis den finnes, brukes i stedet for miljøets JSON-fil og skal ikke committes. Uten denne brukes for eksempel `config/development.json`.

Bruk port **8080** for previewen. `PORT` kan endre serverporten, men preview og manifest har fortsatt hardkodede adresser til `localhost:8080`. Headerens relative navigasjonslenker peker til lokale stier som startkoden ikke implementerer.

Preview bruker eksterne Amedia-ressurser for komponentlasting og header og trenger nettverk. Komponentruten henter også saker fra Amedias API når siden åpnes. [Valg av server-side rendering](docs/decisions/0004-server-side-teasere.md) beskriver hvorfor. Konfigurasjonen ligger i `config/` og `src/config/config.js`.

**Tester:** `npm test` kjører node:test. [Teasertestene](tests/fetch-teasers.test.js) dekker bildefilter, rekkefølge, antall og neste gruppe. [API-feiltestene](tests/api-errors.test.js) bruker en midlertidig lokal HTTP-server og dekker nettverksfeil, HTTP-feil, ugyldig JSON, tomt/uventet svar, ugyldig avis og timeout under JSON-lesing i neste gruppe. De kontrollerer også at serveren svarer videre etter feil. Nyhetskilden simuleres; testene bruker ikke live API. Visuell oppførsel og CI dekkes ikke. Testene er skrevet av Codex på Runes bestilling.

**Kontroll 12. oktober 2026:** Codex kjørte 12 tester på Node 24.21.0; alle bestod. Timeout-testen utløste avbrudd etter omtrent fem sekunder. I en tidligere midlertidig kopi med bildekravet fjernet feilet fire filtertester. Bildefilter- og API-timeout-leveransene fikk uavhengig AI-review 12. oktober. Rune forklarte forskjellen mellom API-feil og vellykket tomtilstand. Den separate refaktoreringen som flyttet API-hentingen til fetch-teasers.js fikk også teknisk AI-review 13. oktober; Runes egen gjennomgang gjenstår. dette er ikke en samlet godkjenning av hele repoet.

**Dokumentasjonskontroll 13. oktober 2026:** Codex sammenlignet leseguiden, README og beslutningene med gjeldende kode. Alle 76 lokale dokumentlenker pekte på eksisterende filer, og en ny kjøring av `npm test` på Node 24.21.0 ga 12 av 12 beståtte tester. Dette er en dokumentasjonskontroll og regresjonskjøring, ikke samlet releasegodkjenning.

**API-ventetid:** Hele hentingen, inkludert neste grupper og JSON-lesing, deler en frist på fem sekunder. Timeout og API-feil gir HTTP 502 med «Kunne ikke hente nyheter nå.» Et tomt eller uventet svar avslutter hentingen; ingen egnede saker gir en tomtilstand med HTTP 200.

Testene kjøres fra repoets rot med `npm test` på Node 24. `npm run build` er fortsatt en plassholder og er ingen kvalitetskontroll. [GitHub Actions](.github/workflows/ci.yml) kjører npm ci og npm test på Node 24 ved pull requests, push til master og manuell kjøring. [Leveransekontrollen](docs/evidence/2026-10-13-delivery.md) samler faktiske CI-resultater og oppstart fra ren kopi.

**Kjent avhengighetsgjeld:** `npm audit` rapporterte ni sårbare pakker ved leveransekontrollen 13. oktober 2026: to kritiske, fire høye, to moderate og én lav. De kritiske funnene gjelder convict og proxy-addr. Avhengighetene er ikke oppdatert her; dette må håndteres og kompatibilitetstestes før publisering som en kjørende tjeneste. [Leveransekontrollen](docs/evidence/2026-10-13-delivery.md) beskriver det kontrollerte oppsettet.

## Mappene

- `src/` — Node/Express-server, konfigurasjon, ruter, manifest og preview.
- `public/` — JavaScript og CSS som serveren leverer til nettleseren.
- `config/` — konfigurasjonsfiler for development, test og production.
- `tests/` — node:test-kontroller med faste API-svar.
- `docs/` — oppgavegrunnlag i `case/`, skisser i `case/sketches/`, tekniske valg i `decisions/` og visuelle kontroller i `evidence/`.
- `.github/` — PR-mal og workflows/ci.yml for automatiserte tester.
- `.vscode/` — innstillinger for editorens arbeidsvisning.

### Fast oppsett og prosjektinnhold

| Kategori | Plassering |
| --- | --- |
| Felles repo-innganger | `README.md`, `AGENTS.md`, `CLAUDE.md`, `.gitignore` |
| Node/npm-oppsett | `package.json`, `package-lock.json` |
| Verktøyoppsett | `.github/`, `.vscode/`, `.eslintrc.cjs`, `.eslintignore` |
| Denne applikasjonen | `src/`, `public/`, `config/` |
| Denne oppgaven og valgene våre | `docs/` |
| Pakker installert av npm | `node_modules/` — lokalt og ignorert av Git |

### Arbeidsvisning i VS Code

Støttefiler grupperes under `README.md` (arbeidsregler og Git-oppsett) og `package.json` (låsefil og lint-oppsett). Utvid pilen for å se dem. Dette er visuell gruppering; filene ligger fortsatt i roten, der verktøyene finner dem.

`node_modules/`, `.github/` og `.vscode/` er skjult i filoversikten. De er ikke slettet. Åpne [editoroppsettet](.vscode/settings.json) for å endre `files.exclude`, eller bruk `Cmd+P`/`Ctrl+P` med filstien for å åpne en bestemt fil. README gir leserekkefølgen; filutforskeren beholder vanlig sortering.

## Regler og beslutninger

- [Lokale arbeidsregler og mappeoversikt](AGENTS.md).
- [Opphav, presentasjon og arbeidsdeling](docs/decisions/0001-opphav-og-arbeidsmate.md).
- [Server-side rendering av teasere](docs/decisions/0004-server-side-teasere.md).
- [Avisvelger som egen include-komponent](docs/decisions/0005-avisvelger-som-include.md).
- [JSON-filoversikter](docs/decisions/0006-json-filoversikter.md).
- [Layout etter skissene](docs/decisions/0007-layout-etter-skisser.md).
- [Beslutninger](docs/decisions/) oppdateres når valg tas; foreslåtte løsninger merkes som forslag til de er vurdert.
- [Pull requests](https://github.com/sbbstudio/frontpage-case/pulls?q=is%3Apr) viser endringene og verifikasjonen.
- Felles byggestandard vedlikeholdes i [always-agents](https://github.com/sbbstudio/always-agents/blob/main/agents/_shared/BUILD-STANDARD.md). Repoets oppstart og forklaringer skal kunne leses selvstendig.
