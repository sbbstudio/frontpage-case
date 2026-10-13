/*
{
  "ansvar": "Lage HTML for avisvelgeren",
  "inn": "Ingen parametere",
  "ut": "Navigasjon med lenker til DT- og BA-preview",
  "brukes_av": "src/routes/router.js → GET /publication-selector",
  "ved_feil": "Ingen egen feilhåndtering",
  "sideeffekter": "Ingen; returnerer HTML-tekst"
}
*/

// ---- Lag avisvelgerens HTML ----
// Lenkene åpner preview med valgt avis.
export default function renderPublicationSelector() {
  return `
    <nav class="publication-selector" aria-label="Velg avis">
      <a href="/frontpage-case/preview?publication=www.dt.no">DT</a>
      <a href="/frontpage-case/preview?publication=www.ba.no">BA</a>
    </nav>
  `;
}
