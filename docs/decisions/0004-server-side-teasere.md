# 0004 — Server-side rendering av teasere

Dato: 9. oktober 2026. Oppdatert med API-uttrekk, timeout og kontroll av artikkellenker.

## Beslutning

`src/fetch-teasers.js` henter og klargjør teaserdata. `GET /component` validerer parametere, lager HTML og sender HTTP-svaret. Nettleseren mottar ferdige teasere med bilde, tittel og lenke.

## Hvorfor

Jeg valgte server-side rendering fordi dataflyten allerede går gjennom komponentruten. Nettleseren trenger derfor ikke et eget kall til nyhets-API-et. Skillet mellom datahenting og HTTP gjør filter og viderehenting mulig å teste uten en HTTP-server.

## Avgrensninger

Hentingen beholder API-rekkefølgen og leser grupper på 20 til ønsket antall er funnet eller en gruppe har færre enn 20 saker. Sakene må ha tittel, HTTPS-bilde og en artikkelsti som blir på valgt avisdomene. URL-parseren kontrollerer også stier med backslash eller skjulte tegn som ellers kunne byttet domene.

Alle grupper og lesing av JSON deler én frist på fem sekunder. Nettverksfeil, HTTP-feil, ugyldig JSON og timeout gir HTTP 502. Et tomt eller uventet svar avslutter hentingen og returnerer listen samlet så langt. API-avhengigheten består; en treg kilde kan gi feil selv om den ville svart senere.

## Kontroll

[Automatiserte tester](../../tests/) dekker filtrering, antall, rekkefølge, viderehenting, artikkellenker, feil og tomtilstand med simulerte API-svar. [Leveransekontrollen](../evidence/2026-10-13-delivery.md) dokumenterer teknisk review og CI. Arbeidsdelingen er beskrevet i [0001](0001-opphav-og-arbeidsmate.md).
