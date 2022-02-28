/* global Then, And */

import StoryworksPageGlobal from '../pages/related-content-series.json';

And('I scroll to the Related Content Series Module',() => {
  cy.get(StoryworksPageGlobal.RELATEDSERIES).should('be.visible');
});

Then ('the related content Header should display',() => {
  cy.get(StoryworksPageGlobal.RELATEDSERIES_HEADER).contains('Further reading');
});

And('the Related Series component headline is displayed', ()=> {
  cy.get(StoryworksPageGlobal.RELATEDSERIES_TITLE).contains('Discover more');
});

And('the Client logo is displayed', () => {
  cy.get(StoryworksPageGlobal.RELATEDSERIES_PARTNERBAR).contains('Paid and');
});

And('a story Image is displayed', () => {
  cy.get(StoryworksPageGlobal.RELATEDSERIES_CARDIMAGE).should('have.attr', 'data-src').should('includes', 'https://ychef');
});