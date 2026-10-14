# 0005 — Avisvelger som egen include-komponent

Dato: 12. oktober 2026.

## Beslutning

Jeg bruker en egen `amedia-include` for avisvelgeren mellom headeren og teaserne. Komponenten heter `publication-selector` gjennom hele kjeden: manifest, HTML-visning, CSS og ruter.

Manifestet beskriver HTML-ruten og CSS-filen. Routeren kaller `renderPublicationSelector()` for å lage lenkene til DT og BA. Hver lenke åpner preview med valgt `publication`.

## Hvorfor

Avisvelgeren bruker samme mekanisme som header og teasere. Det gjør komponentgrensen tydelig og holder avislenkenes HTML ute av `preview.view.js`. Vanlige lenker gjør at byttet ikke trenger egen JavaScript; innlastingen bruker fortsatt Amedias include-kode.

## Konsekvenser og kontroll

Løsningen gir flere filer og forespørsler enn direkte HTML. Adressene er foreløpig bundet til `localhost:8080/frontpage-case`. Amedia leverer headeren med avisens navigasjon; avisvelgeren bestemmer hvilken avis preview viser.

Jeg bekreftet lokalt 12. oktober at mus bytter avis, Tab gir fokus og Enter åpner den valgte lenken. Codex kontrollerte manifest og HTML-respons. Dette er en avgrenset kontroll, ikke en full tilgjengelighetstest. Se [arbeidsdelingen](0001-opphav-og-arbeidsmate.md).
