/*
{
  "ansvar": "Lage preview-HTML med include-elementer",
  "inn": "Validert publication fra routeren",
  "ut": "HTML-tekst med header, avisvelger og teaserkomponent",
  "brukes_av": "src/routes/router.js → GET /preview",
  "ved_feil": "Avisvalidering og HTTP-feil håndteres av routeren",
  "sideeffekter": "Ingen egne nettverkskall; HTML-en lar nettleseren hente komponentene"
}
*/

import config from '../config/config.js';

// ---- Adresser til include-komponentene ----
const servicesHost = config.get('servicesHostname');

const basepath = 'http://localhost:8080/frontpage-case'; // Kan dette hentes fra config isteden?

// ---- Lag preview-siden ----
// Include-elementene henter header, avisvelger og teasere via hvert sitt manifest.
export default function renderPreview({ publication }) {
  return `
    <!doctype html>
    <html>
    <head>
        <!-- Mobilen skal bruke skjermbredden sin, slik at CSS-brytepunktene virker. -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Preview</title>
        <script type="module" src="https://assets.acdn.no/pkg/@amedia/include/v3/include.js"></script>
    </head>
    <body>
        <!-- Parameter til komponenten sendes inn som attributter med prefix param -->
        <amedia-include param-publication="${publication}" manifest="https://${servicesHost}/api/brandheader/v1/components/header/${publication}/manifest/"></amedia-include>
        <!-- Henter avisvelgeren via manifestet på vår server. -->
        <amedia-include manifest="${basepath}/publication-selector/manifest"></amedia-include>
        <amedia-include param-publication="${publication}" param-count="10" manifest="${basepath}/manifest"></amedia-include>
    </body>
    </html>
    `;
}
