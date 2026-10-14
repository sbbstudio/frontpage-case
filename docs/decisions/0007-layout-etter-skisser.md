# 0007 — Layout etter Amedias skisser

## Beslutning

Layouten følger [originalskissene](../case/amedia-original.md): første sak fyller bredden, resten vises som mobilrader eller i tre kolonner fra 700 px. API-rekkefølgen beholdes.

## Hvorfor

Under 700 px gir rader med bilde til venstre bedre plass til titlene. Komponenten er maksimalt 980 px bred, inkludert 16 px innvendig luft på hver side. Arial, større hovedtittel, 24 px mellom saker og blå tastaturmarkering fyller ut valgene som oppgaven lar stå åpne.

## Avgrensning og kontroll

Bilder bruker `object-fit: cover`: hovedbildet er 7:3 med toppen prioritert, mobilbilder er kvadratiske, og kolonnebilder er 8:5. Dette gir stabile flater, men kan beskjære motivet. Redaksjonelle fokuspunkter er ikke implementert.

Preview har viewport-meta for mobilbredde. Amedias header er fortsatt en ekstern include. [Nettleserbeviset](../evidence/2026-10-12-layout.md) viser lokal kontroll og skjermbilder; fysisk mobil og full tilgjengelighetskontroll gjenstår.
