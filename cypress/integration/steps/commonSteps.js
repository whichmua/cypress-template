/* global Given, When */

Given(/^I visit the "(.*)" page$/, (text) => {

  var url;

  switch (text) {
  case 'search results':
    url = 'search-reviews/search-results';
    break;
  }

  cy.visit('/'+url);
  cy.intercept('/search-reviews/api/search*').as('apiSearch');
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.get('button').contains(text).click();
});

When(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});