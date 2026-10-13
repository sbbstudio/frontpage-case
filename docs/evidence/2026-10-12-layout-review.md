# Uavhengig review av forsidens layout

Oppstart: IRIS Code Reviewer CLAUDE v1.7, AGENTS v0.3, USER-CORE v1.2, USER v2.0, SOPS v1.7 og SMELL v1.0 er lastet. Review Protocol v1.1, Audit Trail v1.1, Mode 0 v1.2 og Lens Selection v1.0 er lastet. BUILD-STANDARD v1.3.0 er kontrollert mot reelt filmål; code-explanation v0.1 er lest fra målets sops-mappe. Root AGENTS og siste IRIS Code Reviewer Session Log (09.10.2026, Date DESC) er lest. Fersk always-agents-klone: main, ren, HEAD = origin/main `9533f7bb1c7cd0f877710346f2e2bd8639acd718`; produksjonstreet er på samme SHA. Lastede bundle-filer er byte-identiske med den ferske klonen.

**IRIS Code Reviewer — Decision: PASS**

Kilde: [Tilpass forsidens layout til skissene](https://app.notion.com/p/3f733beeb2158130b374c7e1287d24f1). Oppgaven ble lest direkte fra Notion: Status Tasks = Review, Review Decision = Pending og ceo_override = false.

Reviewet 2026-10-12T17:30:44Z. Mode 1. Lens: Clean Code, fordi leveransen består av avgrenset CSS, viewport-meta og forklaringer uten arkitekturendring.

Forfatter: Codex i hovedagenten `/root`. Reviewer: separat instans `/root/review_layout`, som ikke skrev implementasjonen. Rune delegerte frontendimplementasjon og kontroll; reviewen krever ingen muntlig CSS-forklaring fra Rune.

Scope: hele `public/frontpage.css`, viewport-meta i `src/views/preview.view.js`, layoutomtalen i README, beslutning 0007, layoutbevis og begge originalskissene. Router og manifest er lest som HTML-/include-kontekst. Øvrig WIP, backendlogikk og tidligere KR-er inngår ikke i verdictet.

Artifact: lokalt innholdssnapshot `/tmp/frontpage-layout-reviewed-20261012-1731`, med SHA-256-manifest `sha256.json`. Manifestets SHA-256 er `95b285001aa19c954d65c64cfca70f2189561ee007c202b72fd062d8980598fa`. CSS: `66377c1bfa832225ad6a4ed5d2cca69b28039bfea7ff4b53fd295fdb12006170`; preview: `7b637aed20e3bbc8b281dc7cc1465b9c868b1cbe0c39288653f677852c8e7968`. Git HEAD er `a168c1ea594be79f3bf2b6be39fd25579bfe39d1`, men inkluderer ikke disse lokale endringene. Verdictet gjelder snapshotet, ikke hele arbeidsmappa eller en publisert commit.

Begge skissene er visuelt sammenlignet med før-/etterbildene. CSS gir hovedsak over hele bredden, rader med bilde til venstre under 700 px og tre kolonner fra 700 px. `box-sizing: border-box` og `max-width: 980px` setter dokumentert ytre bredde. `minmax(0, 1fr)`, `min-width: 0` og `overflow-wrap: anywhere` gjør at titlene kan brytes uten å utvide kortene. Fokusregelen gir synlig blå markering. Bildeformat, beskjæring, padding og breakpoint er forklart i beslutningen og tillatt av originaloppgaven.

Reviewen fant manglende viewport-meta i previewens head. Forfatteren rettet dette til `width=device-width, initial-scale=1` i `src/views/preview.view.js:27`. Reviewer har bekreftet rettelsen både i kilden og i live HTML-respons fra preview. Ingen blokkerende funn gjenstår. Smell-IDs detected: ingen.

Egen verifikasjon: leste CSS og HTML-/manifestkjeden, åpnet begge skisser og alle fem før-/etter-/fokusbilder, kontrollerte målingsfilen mot CSS-geometrien, hentet live preview-HTML med curl og kjørte `git diff --check` uten feil. Mottatt nettleserevidens fra forfatter: 320/390/699/700/768/1440 px uten komponent- eller dokumentoverflow, 980 px komponentbredde på bred skjerm, ti lastede bilder og Tab fra BA til hovedsak og neste teaser. De seks målingene samsvarer med CSS-reglene og de viste bildene.

Begrensninger: reviewer kjørte ikke selv de seks nettlesermålingene eller Tab-sekvensen. Ingen fysisk mobiltelefon eller full tilgjengelighetskontroll er testet. Backendtester er ikke kjørt av reviewer fordi leveransen ikke endrer backendlogikk. Før-/etterbilder inneholder ulike nyhetssaker, som dokumentert. Ingen deploy, merge, lukking av GitHub KR8 eller ekstern review-writeback er utført av reviewer. Taskstatus er ikke endret.

REVIEW_PASS: layoutens avgrensede DoD er oppfylt i det identifiserte lokale snapshotet; ingen gjenstående blokkerende funn.
