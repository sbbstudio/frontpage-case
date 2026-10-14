# 0002 — Node 24 og lokal oppstart

Dato: 3. oktober 2026.

## Beslutning

Jeg bruker Node 24 LTS. `package.json` og låsefilen angir `>=24 <25`. Denne endringen oppdaterte Node-kravet, uten å endre pakkeversjoner eller applikasjonslogikk.

## Hvorfor

Node 18 fra originaloppgaven er ute av støtte. Node 24 har planlagt støtte til 30. april 2028, ifølge [Nodes utgivelsesplan](https://github.com/nodejs/Release/blob/main/schedule.json). Node 26 var ennå ikke LTS da valget ble tatt.

## Begrensninger

`npm start` er verifisert. Automatisk omstart med `npm run dev-start` feilet ved kontrollen 3. oktober; årsaken er uavklart. `npm run build` er fortsatt en plassholder.

Preview og manifest har adresser bundet til `localhost:8080/frontpage-case`. Å endre `PORT` oppdaterer ikke disse adressene. Preview trenger også Amedias eksterne komponentlaster og header. Avhengighetsoppdateringer gjenstår før en produksjonsdeploy.

## Kontroll

[Oppstarten 3. oktober](../evidence/2026-10-03-startup.md) ble kontrollert med Node 24.21.0 i en ren lokal klone: installasjon, HTTP-responser, preview i nettleseren og stopp med SIGINT. Se [senere leveransekontroll og avhengighetsfunn](../evidence/2026-10-13-delivery.md) og [gjeldende kjøreinstruksjoner](../../README.md).
