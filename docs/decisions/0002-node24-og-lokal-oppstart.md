# 0002 — Node 24 og lokal oppstart

Dato: 3. oktober 2026.

## Valg

Prosjektet bruker Node 24 LTS. Node 18 fra originaloppgaven er ute av støtte. Node 24 har planlagt støtte til 30. april 2028 ifølge [Nodes offisielle utgivelsesplan](https://github.com/nodejs/Release/blob/main/schedule.json). Node 26 er ennå ikke LTS på kontrolldatoen.

`package.json` og rotoppføringen i låsefilen angir `>=24 <25`. Ingen pakkeversjoner eller applikasjonslogikk er endret. `npm start` er den verifiserte oppstartskommandoen.

## Opprinnelig oppstartskontroll 3. oktober 2026

- Node 24.21.0 og npm 11.19.0, med Node hentet gjennom `npm exec --package=node@24`.
- Installasjon i en separat lokal klone uten eksisterende `node_modules` eller `config/local.json`. Manifestene med Node-kravet ble kopiert inn før `npm ci`.
- `npm ci` installerte 124 pakker fra eksisterende låsefil.
- `npm start` startet HTTP-serveren på port 8080.
- `/frontpage-case/preview`, `/manifest`, `/component`, `/assets/script.js` og `/assets/style.css` under samme basepath svarte med HTTP 200 og forventet innholdstype.
- Nettleseren viste Drammens Tidende-headeren og den lokale plassholderen. Ekstern komponentlaster og header-manifest svarte med HTTP 200. Ingen feil eller advarsler ble observert i nettleserloggen ved kontrollen.
- Serveren stoppet ved SIGINT.

Ressursnavnene og plassholderen ovenfor tilhører startkoden på kontrolldatoen. Gjeldende filer heter frontpage.js og frontpage.css; komponenten viser nå API-teasere. Dette verifiserer startkoden lokalt. Rune skal fortsatt gå gjennom kommandoene og resultatet før KR1 lukkes.

## Observerte begrensninger

- `npm run dev-start` feilet med «Failed running 'src/server.js'» i dette miljøet. Direkte kjøring med `--watch --watch-preserve-output` ga samme resultat uten forklarende feilmelding. Årsaken er uavklart. Vanlig oppstart fungerer; automatisk omstart er ikke verifisert.
- Preview og manifest har hardkodet `http://localhost:8080/frontpage-case`. En annen `PORT` flytter serveren, men oppdaterer ikke disse adressene.
- Preview er avhengig av Amedias eksterne komponentlaster og header. Headerens relative lenker peker lokalt og har ikke tilhørende ruter i casen.
- Ved oppstartskontrollen var `npm test` en plassholder. Nå kjører den node:test med teaser- og API-feiltester; [README](../../README.md) beskriver gjeldende dekning. `npm run build` er fortsatt en plassholder.
- `npm audit` rapporterte `convict` (critical), `brace-expansion`, `minimatch` og `path-to-regexp` (high), `qs` (moderate) og `body-parser` (low). Rapporten oppgir patchoppdatering til `convict` 6.2.5 og tilgjengelige rettelser for de øvrige. Oppdateringene og kompatibiliteten er ikke testet her; dette er gjenstående avhengighetsarbeid før tjenesten publiseres.
