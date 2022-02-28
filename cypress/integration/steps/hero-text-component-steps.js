/* global Given, Then, And */

import {setView} from '../utils';
import {VIEWS} from '../../test-data.constants';
import StoryworksPageGlobal from '../pages/hero-text-component-page.json';

Given(/^I visit "(.*)"$/, (url) => {
  cy.visit(url);
});

Given(/^I set the view to "(.*)"$/, (view) => {
  setView(VIEWS[view]);
});

Then('the top bar should contain a logo',() => {
  cy.get(StoryworksPageGlobal.TOP_BAR_INNER).contains('BBC Future');
});

Then('partner contents should be present', ()=> {
  cy.get(StoryworksPageGlobal.TOP_BAR_INNER).contains('Partnered Content');
});

Then('I scroll to the content body', () => {
  cy.get(StoryworksPageGlobal.COMPONENT_WRAPPER).should('be.visible');
});

And('Background hero image present and size is 1920_960', () => {
  cy.get(StoryworksPageGlobal.BACKGROUND_IMG).should('have.attr', 'data-src').should('includes', '1920_960');
});

And('the image url should be https and include ychef', () => {
  cy.get(StoryworksPageGlobal.BACKGROUND_IMG).should('have.attr', 'data-src').should('includes','https://ychef');
});

Then('Verify title text is present', () => {
  cy.get(StoryworksPageGlobal.TITLE_CONTAINER).should('be.visible').contains('Hero Text Component- Headline');
});

Then('Verify Sub-heading text is display', () => {
  cy.get(StoryworksPageGlobal.TITLE_CONTAINER).contains('Hero text component- Sub heading');
});

Then('Verify headline text is present', () => {
  cy.get(StoryworksPageGlobal.HEAD_LINE_TITLE).contains('Hero text component- Standfirst');
});

Then('Verify Standfirst text should display below the main Hero content area', () => {
  cy.get(StoryworksPageGlobal.HEAD_LINE_TITLE).scrollIntoView().contains('Hero text component- Standfirst');
});

Then('Verify body article contain a title', () => {
  cy.scrollTo(0, 500);
  cy.get(StoryworksPageGlobal.BODY_ART).contains('Hotel paragraphs of Sanya Hilto');
});