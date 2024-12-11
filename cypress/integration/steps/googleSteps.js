import { When } from '@badeball/cypress-cucumber-preprocessor';
import googlePage from '../pages/googlePage';

When(/^I search for "(.*)"$/, (text) => {
  googlePage.searchBar().type(text+'{enter}');
});