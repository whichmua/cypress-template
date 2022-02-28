// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands';
// import './pages';

// Alternatively you can use CommonJS syntax:
require('./commands');
require('./pages');

import 'cypress-localstorage-commands';

beforeEach(() => {
  cy.setLocalStorage('permutive-consent', '{"opt_in":true,"token":"PERF_COOKIE_ENABLED"}');
  cy.setCookie('FCCDCF', '[["AKsRol_BwEkc3ASfKEKVPeyMAwqICoHzH8NxlVr-Hh0TPFtwU_P6z2pKf8yvnOIlbfkSr5BGpCtal_EyIbeetCsHtGMU9lNGJaJ06kps2FHaY4c62aUnvarsjK7MIWPNR3bVUyNhZyUjTDIlWjH0mn-itSG_3MABGA=="],null,["[[],[],[],[],null,null,true]",1620291054220],["CPFxK7bPFxK7bEsABBENBYCoAP_AAE_AAAwIGWQHgAFAAMAAqABwAEAAKgAZAA0gCIAIsATABPAC-AIEAQgAlABLACkAHsATQAnYBSIC0ALSAXUA4gB-wFkALeAXmAvcBjIDLAMsgIgAVAA4ACAAGkARABFACYAE8AL4AhABLAD2AJ3AWgBaQC6gHEAXmAywAAA","1~1843.202.780.2325.1127.505","B6F8AF01-4E2B-4982-98CF-BC6EA8B00241"],null]');
});

before(() => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });
});