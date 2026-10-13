# Avisvelger som egen include-komponent

Dato: 2026-10-12

## Valg

Avisvelgeren for DT og BA er en egen `amedia-include`-komponent. Rune valgte samme mekanisme som header og teasere fremfor å skrive selve avislenkene direkte i `preview.view.js`.

`preview.view.js` plasserer include-elementet mellom headeren og teaserne. Manifestet på `/frontpage-case/publication-selector/manifest` beskriver HTML-ruten `/frontpage-case/publication-selector` og CSS-ressursen `/frontpage-case/assets/publication-selector.css`.

`router.js` leverer manifestet som JSON og kaller `renderPublicationSelector()` fra `publication-selector.view.js` for å lage HTML. Vanlige lenker åpner preview med valgt `publication`. Egen JavaScript for avisbyttet er derfor ikke nødvendig. Amedias include-kode står fortsatt for innlasting av komponenten.

## Konsekvenser

Komponenten har eget manifest, egen HTML-visning og egen CSS-fil, med navnet `publication-selector` gjennom hele kjeden. Dette gir flere filer og forespørsler enn direkte HTML, men gjør komponentgrensen og include-flyten tydelig. Amedia leverer fortsatt headeren med logo og avisens navigasjon; vår komponent velger hvilken avis preview viser.

Manifestets adresser er foreløpig bundet til `localhost:8080/frontpage-case`, som resten av preview-oppsettet. Dette må tilpasses før bruk på en annen vert eller under en annen basesti. Serveren må startes på nytt etter endring av manifest eller HTML-visning.

## Verifikasjon

Rune bekreftet lokalt 12. oktober 2026 at avisbytte virker med mus, at stylingen vises, at Tab gir fokus, og at Enter åpner BA uten museklikk. Codex kontrollerte HTTP 200, JSON fra manifest-ruten og HTML med begge avislenkene fra komponentruten. Dette dokumenterer den prøvde flyten; det erstatter ikke automatiserte tester eller øvrige akseptansekriterier i KR6 og KR9.

Implementasjon: Rune med kodeforslag og avgrensede endringer fra Codex. Dokumentasjon: Codex.
