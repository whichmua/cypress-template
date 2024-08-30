/* global Given, When */

import PageUrls from '../../support/urls';

Given(/^I visit the "(.*)" homepage$/, (text) => {

  var url;

  switch (text) {
  case 'Google':
    url = PageUrls.googlePage();
    break;
  case 'BBC':
    url = PageUrls.bbcPage();
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

When(/^I mock the "(.*)" request$/, (requestName) => {
  cy.intercept(`/${requestName}`, { fixture: `${requestName}.json` });
  cy.reload();
});

When(/^I am on a "(.*)" domain$/, (domain) => {
  cy.url().should('include', domain);
});