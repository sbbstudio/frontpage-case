# 0006 — JSON-oversikt i kodefilenes kommentarer

Dato: 12. oktober 2026.

## Beslutning

Jeg ønsker en kort oversikt øverst i kodefilene. JavaScript, CommonJS og CSS bruker JSON i en blokkkommentar, etter eventuell shebang og lisensinformasjon. Feltene står i samme rekkefølge: `ansvar`, `inn`, `ut`, `brukes_av`, `ved_feil` og `sideeffekter`.

## Hvorfor

Et fast oppsett gjør filens ansvar raskt å lese for både mennesker og agenter. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments) og [JSDoc @file](https://jsdoc.app/tags-file) beskriver filoversikter. JSON-formatet er mitt lokale valg; kildene bruker JSDoc.

## Avgrensning og vedlikehold

Oversikten er dokumentasjon og påvirker ikke kjøringen. JSDoc-verktøy tolker ikke JSON-feltene som typer eller parametertagger. Rene JSON-filer får ingen kommentarer.

Hold tekstverdiene korte og oppdater dem når oppførselen endres. Funksjonsdetaljer og begrunnelser står nær koden; testhistorikk og komplette funksjonslister hører ikke hjemme i filhodet. [README](../../README.md#arbeidsmåte-og-ai) beskriver format og visuell oppdeling.
