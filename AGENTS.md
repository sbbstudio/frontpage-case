# Arbeidsregler for Forside

## Formål og opphav

Dette er Rune Øverlands videreutvikling av Amedias forsidecase. Bevar krediteringen og eksisterende commit-historikk. Originaloppgaven finnes i `docs/case/amedia-original.md`; egne valg dokumenteres i `docs/decisions/`.

Felles [byggestandard](https://github.com/sbbstudio/always-agents/blob/main/agents/_shared/BUILD-STANDARD.md) gjelder. Bruk dens reelle filmål for å finne og lese `sops/code-explanation.md` før kodeendringer og review. Standarden kopieres ikke inn her.

## Mapper

- `src/` — serverkode, konfigurasjon, ruter, komponentmanifest og HTML-visninger.
- `public/` — nettleserens JavaScript og CSS.
- `tests/` — automatiserte node:test-kontroller med faste API-svar.
- `config/` — miljøkonfigurasjon; `config/local.json` er lokal og skal ikke committes.
- `docs/` — prosjektets oppgavegrunnlag, beslutninger og verifikasjonsbilder; Amedias skisser ligger samlet i `docs/case/sketches/`.
- `.github/` — PR-mal og senere workflows.
- `.vscode/` — prosjektets editoroppsett: gruppering av støttefiler og skjuling av installerte pakker/verktøymapper.

Tester legges i `tests/`. Nye prosjektfiler legges i disse mappene.

## Rotfiler

- `README.md` — prosjektets inngang, status og kjøring.
- `AGENTS.md` — denne lokale arbeidskontrakten.
- `CLAUDE.md` — import av `AGENTS.md`.
- `package.json` og `package-lock.json` — npm-manifest og låste avhengigheter.
- `.gitignore` — utelatelser fra versjonskontroll.
- `.eslintrc.cjs` og `.eslintignore` — lint-oppsett fra startkoden.

## Navn og arbeidsoversikt

README gir leserekkefølgen. Behold standardnavn for verktøyenes inngangsfiler. Prosjektspesifikke filer navngis etter ansvaret: `public/frontpage.js`, `public/frontpage.css` og `src/manifests/frontpage-manifest.js`. Skisser ligger med oppgaveteksten. Installerte pakker og editorgruppering skal ikke endre de fysiske stiene verktøyene trenger.

## Arbeidsflyt

### Visuell oppdeling av kode

JavaScript-, CommonJS- og CSS-filer har en kort JSON-oversikt i en blokkkommentar øverst, etter eventuell shebang og lisensinformasjon. Bruk feltene `ansvar`, `inn`, `ut`, `brukes_av`, `ved_feil` og `sideeffekter`; hold disse seks feltene i samme rekkefølge og bruk korte tekstverdier. Nødvendige funksjonsdetaljer forklares nær funksjonen. Beskriv filens ansvar og kontrakter, ikke en full funksjonsliste eller testhistorikk. Oppdater oversikten ved endret oppførsel. Dette er et lokalt dokumentasjonsformat, ikke JSDoc eller runtime-konfigurasjon. Rene JSON-filer beholder gyldig JSON uten kommentarer. Se beslutning 0006.

Bruk én tom linje før deloverskrifter (`// ---- Ansvar ----` i JavaScript og `/* ---- Ansvar ---- */` i CSS). Hold overskriften, forklaringen og tilhørende kode samlet. Skill selvstendige funksjoner, ruter og CSS-regler med en tom linje. Mellomrom viser visuell oppdeling; en deloverskrift inne i en funksjon betyr et steg i samme funksjon. Behold tilsvarende oppdeling ved senere endringer.

`src/fetch-teasers.js` eier API-henting og klargjøring av teaserdata. `/component` i `src/routes/router.js` eier parametervalidering, HTTP-respons og teaser-HTML. Funksjonen returnerer data eller kaster feil; ruten oversetter hentefeil til HTTP 502.

- Ti KR-issues eier leveransene og sjekklistene. Planlegg små PR-er med ett formål hver; én KR kan kreve flere PR-er.
- Lenke PR til relevant issue. Bruk `Closes #N` bare når alle KR-kriteriene faktisk er oppfylt; ellers bruk `Refs #N`.
- Status: Todo → In progress → Review → Done. En åpen PR betyr ikke at et KR er ferdig.
- AI kan bidra til implementasjon og dokumentasjon. Beskriv bidragene og hvem som har kontrollert resultatet. Ikke påstå at Rune har forklart, testet eller godkjent noe før det har skjedd.
- README, beslutninger og kodeforklaringer må følge gjeldende implementasjon. Ikke marker planlagte funksjoner som ferdige.
- GitHub inneholder prosjektarbeid som er egnet for teknisk gjennomgang. Personlige læringslogger og intervjunotater holdes i Notion.
- Endringer gjøres mot `origin`, Runes eget repo. Oppstrøms Amedia-repo er kilde for referanse og historikk.
- Bevar eksisterende lisensmetadata. Tilgang og ekstern deling håndteres av Rune.

## Verifikasjon

Velg kontroller etter endringen: dokumentlenker for dokumentasjon, reelle tester for logikk og nettlesersjekk for visuell oppførsel. `npm test` kjører node:test. Teaserfilter, antall, rekkefølge, API-feil og timeout kontrolleres uten live API. HTTP-testene bruker en midlertidig lokal server; CI gjenstår i KR-planen.
