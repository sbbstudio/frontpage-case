/*
{
  "ansvar": "Beskrive hvordan include-koden henter avisvelgeren",
  "inn": "Faste adresser til avisvelgerens HTML og CSS",
  "ut": "Manifestobjekt uten komponentparametere eller eget JavaScript",
  "brukes_av": "Routerens GET /publication-selector/manifest og include-koden",
  "ved_feil": "Ingen egen validering eller feilhåndtering",
  "sideeffekter": "Ingen; eksporterer et objekt"
}
*/

// ---- Manifest for avisvelgeren ----
// Beskriver avisvelgeren og hvor dens ferdige HTML kan hentes.
export default {
  manifestVersion: '2.0.0',
  provider: {
    id: 'frontpage-case'
  },
  component: {
    id: 'publication-selector',
    version: '1.0.0',
    title: 'Avisvelger',
    description: 'Bytter mellom DT og BA i forhåndsvisningen',
    platform: ['web', 'mobile'],
    tags: [],

    // ---- HTML-adresse ----
    markup: {
      urlTemplate: 'http://localhost:8080/frontpage-case/publication-selector',
      queryParameters: []
    },

    // ---- CSS og JavaScript ----
    resources: {
      css: [
        'http://localhost:8080/frontpage-case/assets/publication-selector.css'
      ],
      js: []
    }
  }
};
