/*
{
  "ansvar": "Velge ESLint-reglene fra Amedias verktøypakke",
  "inn": "@amedia/kragl/config/eslint.config.cjs",
  "ut": "CommonJS-eksport av ESLint-konfigurasjonen",
  "brukes_av": "ESLint når verktøyet kjøres",
  "ved_feil": "require feiler hvis verktøypakken mangler",
  "sideeffekter": "Laster ekstern konfigurasjon ved lintkjøring"
}
*/

module.exports = require('@amedia/kragl/config/eslint.config.cjs');
