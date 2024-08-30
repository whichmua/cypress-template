/* global When */

import googlePage from '../pages/googlePage';

When(/^I search for "(.*)"$/, (text) => {
  googlePage.searchBar().type(text+'{enter}');
});