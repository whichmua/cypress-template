/* global When, Then */

import searchResultsPage from '../pages/searchResultsPage';

function navigateAndValidate (validateCurrentPage) {
  cy.get('body').then($body => {
    if ($body.find('.next a').length > 0) {
      cy.get('.next a').then($nextPage => {
        if (!$nextPage.is('[aria-disabled="true"]')) {
          cy.wrap($nextPage).click();
          validateCurrentPage();
        }
      });
    }
  });
}

When(/^I search for "(.*)"$/, (text) => {
  searchResultsPage.searchField().type(text + '{enter}');
  cy.wait('@apiSearch');
});

When(/^I should see a list of merchants containing title "(.*)"$/, (text) => {
  function validateTextsAndNavigate () {
    searchResultsPage.searchCard().find('h4').each((element) => {
      expect(element.text().trim().toLowerCase()).to.contain(text.toLowerCase());
    });

    navigateAndValidate(validateTextsAndNavigate);
  }

  validateTextsAndNavigate();
});


When(/^I should see a list of merchants containing industry "(.*)"$/, (text) => {
  function validateTextsAndNavigate () {
    searchResultsPage.searchCard().find('[data-aqa-id^="badge-"]').each((element) => {
      expect(element.text().trim().toLowerCase()).to.contain(text.toLowerCase());
    });

    navigateAndValidate(validateTextsAndNavigate);
  }

  validateTextsAndNavigate();
});

When(/^I click on the "(.*)" dropdown$/, (dropdown) => {
  let element;

  switch (dropdown) {
  case 'Category':
    element = searchResultsPage.categoryDropdown();
    break;
  case 'Star Rating':
    element = searchResultsPage.starRatingDropdown();
    break;
  case 'Award Level':
    element = searchResultsPage.awardLevelDropdown();
    break;
  case 'Sort By':
    element = searchResultsPage.sortByDropdown();
    break;
  default:
    throw new Error(`Unknown dropdown: ${dropdown}`);
  }

  element.click();
});

When(/^I select "(.*)" from the dropdown$/, (text) => {
  const element = '[data-testid="' + text.replace(/&/g, '\\&') + '"]';
  cy.get(element).click();
});

When(/^I should see a list of merchants with a rating greater than or equal to "(.*)"$/, (expectedRating) => {
  function validateTextsAndNavigate () {
    searchResultsPage.ratingInteger().each(($el) => {
      const rating = parseFloat($el.text());
      expect(rating).to.be.at.least(parseInt(expectedRating));
    });

    navigateAndValidate(validateTextsAndNavigate);
  }

  validateTextsAndNavigate();
});

When(/^I should see a list of merchants with an award level of "(.*)"$/, (awardLevel) => {
  function validateTextsAndNavigate () {
    cy.wait('@apiSearch').then((interception) => {
      const docs = JSON.parse(interception.response.body).docs;

      docs.forEach((doc) => {
        if (Array.isArray(doc.serviceAwardLevels) && doc.serviceAwardLevels.length > 0) {
          const lowerCaseAwards = doc.serviceAwardLevels.map(level => level.toLowerCase());
          expect(lowerCaseAwards).to.include(awardLevel.toLowerCase());
        } else {
          cy.log(`${doc.name}: No Service Awards`);
        }
      });

      navigateAndValidate(validateTextsAndNavigate);
    });
  }

  validateTextsAndNavigate();
});

Then(/^the items should be sorted alphabetically from "(A to Z|Z to A)"$/, (text) => {
  const validateTextsAndNavigate = () => {
    cy.wait('@apiSearch').then((interception) => {
      const docs = JSON.parse(interception.response.body).docs;
      let itemsList = [];

      cy.wrap(docs).each((doc) => {
        if (Array.isArray(doc.name) && doc.name.length > 0) {
          itemsList.push(doc.name[0]);
        }
      }).then(() => {
        let sortedItemsList;
        if (text === 'A to Z') {
          sortedItemsList = itemsList.slice().sort((a, b) => a.localeCompare(b));
        } else {
          sortedItemsList = itemsList.slice().sort((a, b) => b.localeCompare(a));
        }

        cy.log(sortedItemsList);
        expect(itemsList).to.deep.equal(sortedItemsList);

        navigateAndValidate(validateTextsAndNavigate);
      });
    });
  };

  validateTextsAndNavigate();
});

Then(/^the items should be sorted by rating from "(Low to High|High to Low)"$/, (text) => {
  const validateTextsAndNavigate = () => {
    cy.wait('@apiSearch').then((interception) => {
      const docs = JSON.parse(interception.response.body).docs;
      let itemsList = [];

      cy.wrap(docs).each((doc) => {
        if (typeof doc.stars === 'number' && doc.name.length > 0) {
          itemsList.push(doc.stars);
        }
      }).then(() => {
        let sortedItemsList;
        if (text === 'Low to High') {
          sortedItemsList = [...itemsList].sort((a, b) => a - b);
        } else {
          sortedItemsList = [...itemsList].sort((a, b) => b - a);
        }

        cy.log(JSON.stringify(sortedItemsList));
        expect(itemsList).to.deep.equal(sortedItemsList);

        navigateAndValidate(validateTextsAndNavigate);
      });
    });
  };

  validateTextsAndNavigate();
});