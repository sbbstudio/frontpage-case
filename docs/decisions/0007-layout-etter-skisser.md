# Layout etter Amedias skisser

Teaserkomponenten følger [originaloppgaven](../case/amedia-original.md): første sak fyller bredden, mens resten vises i tre kolonner på bred skjerm og i rader med bilde til venstre på smal skjerm. API-rekkefølgen beholdes; CSS velger den første saken som hovedsak.

`public/frontpage.css` begrenser komponentens ytre bredde til 980 px, inkludert 16 px innvendig luft på hver side. Ved 700 px skjermbredde skifter resten av sakene til tre kolonner. Ved denne grensen er kortene omtrent 201 px brede; under grensen gir rader bedre plass til lange titler.

Skissene bestemmer strukturen. Oppgaven overlater font, størrelser og luft til oss. Vi bruker Arial, større hovedtittel, 24 px avstand mellom saker og synlig blå tastaturmarkering. Bilder beskjæres med object-fit: cover: hovedbildet har forhold 7:3 og prioriterer toppen, mobilbilder er kvadratiske, og kolonnebilder har forhold 8:5. Dette gir stabile flater, men kan skjære bort deler av et originalbilde. Redaksjonelle fokuspunkter ligger utenfor denne CSS-endringen.

Preview-siden bruker viewport-meta med width=device-width, slik at mobilnettleseren vurderer CSS-brytepunktene mot enhetens bredde.

Amedias eksterne header inngår fortsatt som en egen include. Avisvelger og backend endres ikke i layoutoppgaven. [Nettleserbevis](../evidence/2026-10-12-layout.md) viser resultatet og kontrollene.
