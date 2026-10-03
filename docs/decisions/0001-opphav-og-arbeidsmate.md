# 0001 — Opphav og arbeidsmåte

Dato: 3. oktober 2026.

## Beslutning

Prosjektet videreutvikles i Runes eksisterende repo `sbbstudio/frontpage-case`, med tittelen «Forside — Rune Øverland». README presenterer prosjektets formål, faktiske status, leveranseplan og bruk av AI.

Amedias startkode og bidragsytere krediteres. Historikken fra utgangspunktet `59abcf958526698d58a76cf2d212542fb76c0b95` beholdes. Den opprinnelige oppgaven er bevart i `docs/case/amedia-original.md`, med relative lenker tilpasset plasseringen. Egen prosjektpresentasjon og nye endringer kommer som etterfølgende commits og PR-er.

## Begrunnelse

En leser skal kunne forstå Runes arbeid fra repoet og se hva som stammer fra Amedia. Den siste opprinnelige commit-forfatteren beskriver hvem som gjorde den endringen; den sier ikke hvem som eier videreutviklingen.

Ti KR-issues deler arbeidet i målbare leveranser over fem planlagte byggedager. Hvert issue har oppgaver og akseptansekriterier. Små PR-er gir etterprøvbar historikk; en PR kan dekke deler av et KR. Personlige læringslogger føres i Notion.

## Konsekvenser

- Opprinnelig kode blir ikke presentert som Runes egenutviklede kode.
- AI-bidrag er en del av den dokumenterte arbeidsmåten.
- Ferdigstatus krever verifikasjon og gjennomgang, ikke bare produsert kode.
- Repo-navnet og pakkens navn beholdes. Pakkenavnet brukes i konfigurasjonen for URL-stien, så en kosmetisk omdøping ville også kunne endre kjøringen.
- Oppstart på støttet Node, reelle tester og CI er egne leveranser. Dette dokumentasjonsoppsettet fullfører dem ikke.
