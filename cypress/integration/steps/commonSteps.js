import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import PageUrls from '../../support/urls';

Given(/^I visit the "(.*)" homepage$/, (text) => {

  var url;

  switch (text) {
  case 'DuckDuckGo':
    url = PageUrls.duckDuckGoPage();
    break;
  }

  cy.visit(url);
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.get('button').contains(text).click();
});

When(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});