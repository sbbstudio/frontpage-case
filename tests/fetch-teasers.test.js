/*
{
  "ansvar": "Kontrollere teaserfilter, rekkefølge og antall med faste API-svar",
  "inn": "Simulerte saker med gyldige og manglende bildefelt",
  "ut": "Beståtte eller feilede node:test-kontroller",
  "brukes_av": "npm test",
  "ved_feil": "Testkjøringen feiler hvis resultatet avviker fra forventningen",
  "sideeffekter": "Erstatter fetch midlertidig per test; ingen nettverkskall"
}
*/

import assert from 'node:assert/strict';
import test from 'node:test';
import fetchTeasers from '../src/fetch-teasers.js';

// ---- Faste saksdata ----
// Bare API-feltene som teaserkomponenten trenger er med i disse sakene.
function story(title, path, imageUrl) {
  return {
    title,
    fields: { relativeUrl: path },
    _embedded: {
      relations: [{
        type: 'imageRelation',
        fields: { versions: { large: { url: imageUrl } } }
      }]
    }
  };
}

// ---- Simuler API-et ----
// Uventede ekstra kall feiler. node:test gjenoppretter fetch etter hver test.
function usePages(t, pages) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    assert.ok(calls.length < pages.length, 'Uventet ekstra API-kall');
    calls.push(new URL(url));
    return { ok: true, json: async () => ({ _embedded: pages[calls.length - 1] }) };
  });
  return calls;
}

// ---- Gyldig sak ----
test('returnerer tittel, artikkelsti og stort bilde for en gyldig sak', async (t) => {
  const calls = usePages(t, [[story('Første sak', '/forste', 'https://images.example/1.jpg')]]);
  assert.deepEqual(await fetchTeasers({ publication: 'www.dt.no', count: 10 }), [
    { title: 'Første sak', path: '/forste', imageUrl: 'https://images.example/1.jpg' }
  ]);
  assert.equal(calls[0].searchParams.get('publicationDomain'), 'www.dt.no');
});

// ---- Manglende eller ugyldige bildefelt ----
test('fjerner saker med manglende eller ubrukbare bilder', async (t) => {
  const base = { title: 'Uten bilde', fields: { relativeUrl: '/uten-bilde' } };
  const missingImages = [
    base,
    { ...base, _embedded: {} },
    { ...base, _embedded: { relations: [] } },
    { ...base, _embedded: { relations: 'ugyldig' } },
    { ...base, _embedded: { relations: [{ type: 'imageRelation', fields: {} }] } },
    { ...base, _embedded: { relations: [{ type: 'imageRelation', fields: { versions: { large: {} } } }] } },
    story('Tom URL', '/tom', ''),
    story('HTTP-bilde', '/http', 'http://images.example/1.jpg'),
    story('Feil type', '/tall', 123)
  ];
  usePages(t, [missingImages]);
  assert.deepEqual(await fetchTeasers({ publication: 'www.ba.no', count: 10 }), []);
});

// ---- Rekkefølge etter filtrering ----
test('beholder API-rekkefølgen når saker mellom gyldige saker fjernes', async (t) => {
  usePages(t, [[
    story('B', '/b', 'https://images.example/b.jpg'),
    story('Uten bilde', '/uten', undefined),
    story('A', '/a', 'https://images.example/a.jpg'),
    story('HTTP', '/http', 'http://images.example/http.jpg'),
    story('C', '/c', 'https://images.example/c.jpg')
  ]]);
  const teasers = await fetchTeasers({ publication: 'www.ba.no', count: 10 });
  assert.deepEqual(teasers.map((teaser) => teaser.title), ['B', 'A', 'C']);
});

// ---- Begrens ønsket antall ----
test('returnerer bare ønsket antall gyldige teasere', async (t) => {
  const calls = usePages(t, [[
    story('Uten bilde', '/uten', undefined),
    story('B', '/b', 'https://images.example/b.jpg'),
    story('A', '/a', 'https://images.example/a.jpg'),
    story('C', '/c', 'https://images.example/c.jpg')
  ]]);
  const teasers = await fetchTeasers({ publication: 'www.ba.no', count: 2 });
  assert.deepEqual(teasers.map((teaser) => teaser.title), ['B', 'A']);
  assert.equal(calls.length, 1);
});

// ---- Hent videre når filteret gir for få saker ----
test('henter neste gruppe og stopper når API-et ikke har flere saker', async (t) => {
  const firstPage = Array.from({ length: 20 }, () => story('Uten bilde', '/uten', undefined));
  firstPage[0] = story('Først', '/forst', 'https://images.example/1.jpg');
  const calls = usePages(t, [firstPage, [story('Sist', '/sist', 'https://images.example/2.jpg')]]);
  const teasers = await fetchTeasers({ publication: 'www.ba.no', count: 10 });
  assert.deepEqual(teasers.map((teaser) => teaser.title), ['Først', 'Sist']);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].searchParams.get('offset'), '20');
});
