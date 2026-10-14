# 0003 — Repostruktur og arbeidsvisning

Dato: 3. oktober 2026.

## Beslutning

README gir leserekkefølgen. Skissene ligger i `docs/case/sketches/`. Nettleserfilene heter `frontpage.js` og `frontpage.css`, og teasernes manifest heter `frontpage-manifest.js`. Importer og ressursadresser følger navnene.

## Hvorfor

Navn etter ansvar og faste plasseringer gjør det enklere å finne frem. Verktøyenes inngangsfiler beholder navnene og plasseringene de forventer.

## Konsekvenser

VS Code grupperer støttefiler og skjuler installerte pakker i filoversikten gjennom `.vscode/settings.json`. Filene er fortsatt tilgjengelige. GitHub bruker den fysiske mappestrukturen.

Omdøpingene endret ressursadressene til `/assets/frontpage.js` og `/assets/frontpage.css`, men ikke applikasjonslogikken. Se [mappene og arbeidsreglene](../../AGENTS.md).
