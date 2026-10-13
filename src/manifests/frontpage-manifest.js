/*
{
  "ansvar": "Beskrive hvordan include-koden henter teaserkomponenten",
  "inn": "Faste komponentadresser og beskrivelser av publication og count",
  "ut": "Manifestobjekt med HTML-, CSS- og JavaScript-adresser",
  "brukes_av": "Routerens GET /manifest og nettleserens include-kode",
  "ved_feil": "Manifestet validerer ikke forespørsler; routeren gjør det",
  "sideeffekter": "Ingen; eksporterer et objekt"
}
*/

// ---- Manifest for teaserkomponenten ----
// Include-koden leser adressene og parameterbeskrivelsene nedenfor.
export default {
  manifestVersion: '2.0.0',
  provider: {
    id: 'amedia'
  },
  component: {
    id: 'frontpage-case-component',
    version: '1.0.0',
    title: 'Frontpage Case Component',
    description: 'This component displays a frontpage',
    platform: [
      'web',
      'mobile'
    ],
    tags: [],

    // ---- HTML-adresse og parametere ----
    markup: {
      urlTemplate: 'http://localhost:8080/frontpage-case/component', // Kan host byttes ut med en verdi fra config? Hvorfor ønsker man å gjøre det?
      queryParameters: [
        {
          name: 'publication',
          description: 'The publication we want to display. ',
          example: 'www.dt.no',
          optional: false,
          format: 'publication'
        },
        {
          name: 'count',
          description: 'Number of teasers displayed on the frontpage',
          example: '10',
          optional: true
        }
      ]
    },

    // ---- CSS og JavaScript ----
    resources: {
      css: [
        'http://localhost:8080/frontpage-case/assets/frontpage.css' // Kan host byttes ut med en verdi fra config?
      ],
      js: [
        'http://localhost:8080/frontpage-case/assets/frontpage.js' // Kan host byttes ut med en verdi fra config?
      ]
    },
  }
};
