# 0006 — JSON-oversikt i kodefilenes kommentarer

Dato: 12. oktober 2026.

## Beslutning

Rune ønsker en oversikt som mennesker og agenter raskt kan lese øverst i hver kodefil. JavaScript, CommonJS og CSS bruker gyldig JSON inne i en blokkkommentar. Eventuell shebang og eksisterende lisensinformasjon kommer først. JSON-konfigurasjon får ikke kommentarer, siden det ville gjøre formatet ugyldig.

Felles felter er `ansvar`, `inn`, `ut`, `brukes_av`, `ved_feil` og `sideeffekter`. Alle kodefiler bruker disse seks feltene i samme rekkefølge, med korte tekstverdier. Antall, rekkefølge og andre funksjonsdetaljer beskrives nær funksjonen. Store filer har en oversikt over modulens kontrakter; detaljene forklares nær funksjonene og rutene. Deloverskrifter og mellomrom beholdes.

## Begrunnelse og kilder

[Google JavaScript Style Guide, avsnitt 7.5](https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments) beskriver filoversikter som hjelp til å orientere nye lesere, særlig i filer med flere definisjoner. [JSDoc @file](https://jsdoc.app/tags-file) dokumenterer filbeskrivelser i kommentarer ved starten av fila.

Disse kildene bruker JSDoc, ikke JSON. JSON i kommentaren er vårt lokale valg for et konsekvent og lett lesbart oppsett. Vanlige JSDoc-verktøy tolker ikke feltene som funksjonstyper eller parametertagger. Oversikten er dokumentasjon; den påvirker ikke kjøringen eller beviser at beskrivelsen stemmer.

## Vedlikehold og kontroll

Oversikten oppdateres sammen med oppførselen den beskriver. Unngå linjenumre, komplette funksjonsinventarer og historiske testresultater i filhodet. Detaljkontrakter og begrunnelser står nær koden når det trengs.

Codex skrev filoversiktene etter gjennomgang av gjeldende kode på Runes bestilling. JSON-format, JavaScript-syntaks og uendret kjørbar kode kontrolleres for denne endringen. Dette er en dokumentasjonskontroll, ikke uavhengig code review eller full funksjonstest.
