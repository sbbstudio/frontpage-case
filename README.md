# Forside — Rune Øverland

## Hva dette er

Et JavaScript/Node.js-prosjekt der jeg videreutvikler [Amedias forsidecase](https://github.com/amedia/frontpage-case). Målet er en responsiv avisforside med saker fra Amedias API, tydelig feilhåndtering og dokumenterte tekniske valg.

**Status:** Under arbeid. Repoet inneholder foreløpig Amedias startkode og en plan med ti målbare leveranser. Forsidefunksjonen er ikke implementert ennå. [KR-er og oppgaver](https://github.com/sbbstudio/frontpage-case/issues?q=is%3Aissue%20label%3Akr) viser fremdriften.

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

Forventet resultat foreløpig er Drammens Tidende-headeren og teksten «Her skal forsiden komme». Stopp serveren med `Ctrl+C`. Etter kodeendringer må `npm start` stoppes og startes igjen.

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

Preview bruker eksterne Amedia-ressurser for komponentlasting og header og trenger nettverk. Egen API-henting av saker bygges i KR3. Konfigurasjonen ligger i `config/` og `src/config/config.js`.

**Tester:** `npm test` er foreløpig en plassholder og gir ikke bevis på at løsningen virker. Reelle tester legges til med funksjonaliteten, og CI kobles på i KR9.

**Kjent avhengighetsgjeld:** `npm audit` rapporterte seks sårbare pakker ved oppstartskontrollen 3. oktober 2026, inkludert en kritisk rapport for `convict`. Se beslutningen om lokal oppstart for detaljer. Avhengighetene er ikke oppdatert i KR1; dette må håndteres og verifiseres før publisering som en kjørende tjeneste.

## Mappene

- `src/` — Node/Express-server, konfigurasjon, ruter, manifest og preview.
- `public/` — JavaScript og CSS som serveren leverer til nettleseren.
- `config/` — konfigurasjonsfiler for development, test og production.
- `docs/` — opprinnelig oppgave og beslutninger for prosjektet.
- `.github/` — mal for pull requests; CI kommer i KR9.
- `.vscode/` — editorinnstillinger fra startkoden.

## Regler og beslutninger

- [Lokale arbeidsregler og mappeoversikt](AGENTS.md).
- [Opphav, presentasjon og arbeidsdeling](docs/decisions/0001-opphav-og-arbeidsmate.md).
- [Beslutninger](docs/decisions/) oppdateres når valg tas; foreslåtte løsninger merkes som forslag til de er vurdert.
- [Pull requests](https://github.com/sbbstudio/frontpage-case/pulls?q=is%3Apr) viser endringene og verifikasjonen.
- Felles byggestandard vedlikeholdes i [always-agents](https://github.com/sbbstudio/always-agents/blob/main/agents/_shared/BUILD-STANDARD.md). Repoets oppstart og forklaringer skal kunne leses selvstendig.
