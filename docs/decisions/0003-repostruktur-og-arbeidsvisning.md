# 0003 — Repostruktur og arbeidsvisning

Dato: 3. oktober 2026.

## Beslutning

README viser prosjektets leserekkefølge: oversikt, applikasjon, kontroller, dokumentasjon og oppsett. Den skiller felles repo-innganger, Node-oppsett, verktøyoppsett, prosjektinnhold og installerte pakker.

Skissene samles i `docs/case/sketches/`. Forsidens nettleserfiler heter `frontpage.js` og `frontpage.css`, og komponentbeskrivelsen heter `frontpage-manifest.js`. Import og ressursadresser følger filnavnene.

## Begrunnelse og konsekvenser

Faste plasseringer og navn etter ansvar gjør det enklere å finne frem. Ved denne strukturendringen 3. oktober hadde roten åtte sporede filer etter at skissene var flyttet. Gjeldende rotfiler er beskrevet i [arbeidsreglene](../../AGENTS.md). Verktøyenes inngangsfiler beholder sine forventede navn og plasseringer.

VS Code grupperer støttefilene under README og package.json og skjuler installerte pakker og verktøymapper i filoversikten. Dette er prosjektinnstillinger som kan endres i `.vscode/settings.json`; filene er fortsatt tilgjengelige. GitHubs filoversikt bruker ikke VS Code-innstillingene. Den fysiske strukturen og README fungerer også uten editorgrupperingen.

Dette innfører arbeidsformen i denne casen. Den felles byggestandarden og andre repoer er ikke endret. Omdøpingene endrer ressursadressene til `/assets/frontpage.js` og `/assets/frontpage.css`; applikasjonens logikk er uendret.
