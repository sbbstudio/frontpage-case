# Arbeidsregler for Forside

## Formål og opphav

Dette er Rune Øverlands videreutvikling av Amedias forsidecase. Bevar krediteringen og eksisterende commit-historikk. Originaloppgaven finnes i `docs/case/amedia-original.md`; egne valg dokumenteres i `docs/decisions/`.

Felles [byggestandard](https://github.com/sbbstudio/always-agents/blob/main/agents/_shared/BUILD-STANDARD.md) gjelder. Bruk dens reelle filmål for å finne og lese `sops/code-explanation.md` før kodeendringer og review. Standarden kopieres ikke inn her.

## Mapper

- `src/` — serverkode, konfigurasjon, ruter, komponentmanifest og HTML-visninger.
- `public/` — nettleserens JavaScript og CSS.
- `config/` — miljøkonfigurasjon; `config/local.json` er lokal og skal ikke committes.
- `docs/` — prosjektets oppgavegrunnlag og beslutninger; Amedias skisser ligger samlet i `docs/case/sketches/`.
- `.github/` — PR-mal og senere workflows.
- `.vscode/` — prosjektets editoroppsett: gruppering av støttefiler og skjuling av installerte pakker/verktøymapper.

Tester legges i en `tests/`-mappe når testarbeidet begynner. Legg da mappen til i README i samme PR. Nye prosjektfiler legges i disse mappene.

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

- Ti KR-issues eier leveransene og sjekklistene. Planlegg små PR-er med ett formål hver; én KR kan kreve flere PR-er.
- Lenke PR til relevant issue. Bruk `Closes #N` bare når alle KR-kriteriene faktisk er oppfylt; ellers bruk `Refs #N`.
- Status: Todo → In progress → Review → Done. En åpen PR betyr ikke at et KR er ferdig.
- AI kan bidra til implementasjon og dokumentasjon. Beskriv bidragene og hvem som har kontrollert resultatet. Ikke påstå at Rune har forklart, testet eller godkjent noe før det har skjedd.
- README, beslutninger og kodeforklaringer må følge gjeldende implementasjon. Ikke marker planlagte funksjoner som ferdige.
- GitHub inneholder prosjektarbeid som er egnet for teknisk gjennomgang. Personlige læringslogger og intervjunotater holdes i Notion.
- Endringer gjøres mot `origin`, Runes eget repo. Oppstrøms Amedia-repo er kilde for referanse og historikk.
- Bevar eksisterende lisensmetadata. Tilgang og ekstern deling håndteres av Rune.

## Verifikasjon

Velg kontroller etter endringen: dokumentlenker for dokumentasjon, reelle tester for logikk og nettlesersjekk for visuell oppførsel. Den eksisterende `npm test`-plassholderen er ikke en test. Manglende tester, CI og verifisert Node-versjon er åpne leveranser i KR-planen.
