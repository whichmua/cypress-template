/* global Given, Then, And */

import {setView} from '../utils';
import {VIEWS} from '../../test-data.constants';
import StoryworksPageUK from '../pages/storyworks-uk-page';

Given(/^I visit "(.*)"$/, (url) => {
  cy.visit(url+'?site=test');
});

Given(/^I set the view to "(.*)"$/, (view) => {
  setView(VIEWS[view]);
});

Then('International page is displayed', () => {
  cy.get(StoryworksPageUK.STORYWORKS_PAGE).should('be.visible');
});

And('Verify Branded Content Custom production text', () => {
  cy.get(StoryworksPageUK.STORYWORKS_BRANDED).should('be.visible');
  cy.get(StoryworksPageUK.STORYWORKS_CUSTOM).should('be.visible');
});

And('URL should be HTTPS', () => {
  cy.location('protocol').should('include', 'https:');
});

Then(/^I should see "(.*)" text$/, (text) => {
  cy.contains(text).should(($div) => {
    assert.strictEqual(($div.text().trim()), text);
  });
});

Then('the page is served via insecure http', () => {
  cy.location().should((loc) => {
    expect(loc.protocol).to.eq('http:');
  });
});

Then('the page is served via secure https', () => {
  cy.location().should((loc) => {
    expect(loc.protocol).to.eq('https:');
  });
});