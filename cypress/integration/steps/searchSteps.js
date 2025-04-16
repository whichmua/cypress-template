import { When } from '@badeball/cypress-cucumber-preprocessor';
import searchPage from '../pages/searchPage';

When(/^I search for "(.*)"$/, (text) => {
  searchPage.searchBar().type(text+'{enter}');
});

When(/^I should see "(.*)" as the first result$/, (text) => {
  searchPage.firstResult().should('contain', text);
});