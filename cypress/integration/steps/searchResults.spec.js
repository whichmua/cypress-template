import searchResultsPage from '../pages/searchResultsPage';

describe('Search Results Page', function () {
  beforeEach(function () {
    cy.visit('search-reviews/search-results');
    cy.intercept('/search-reviews/api/search*').as('apiSearch');
  });

  context('Search Field - Positive Tests', function () {
    const terms = ['taxi', 'wat'];
    terms.forEach(term => {
      it(`should display results containing "${term}"`, function () {
        searchResultsPage.searchField().type(`${term}{enter}`);
        cy.wait('@apiSearch');
        validateTextsAndNavigate(() => {
          searchResultsPage.searchCard().find('h4').each((element) => {
            expect(Cypress.$(element).text().trim().toLowerCase()).to.include(term);
          });
        });
      });
    });
  });

  context('Search Field - Negative Tests', function () {
    it('should display "No Results" for "poster123"', function () {
      searchResultsPage.searchField().type('poster123{enter}');
      cy.wait('@apiSearch');
      cy.contains('No Results');
      cy.contains('We’re sorry but nothing matched that search, please try again with different criteria or');
    });
  });

  context('Category Dropdown Filter', function () {
    it('should filter results by "Education & Training"', function () {
      const category = 'Education & Training';
      searchResultsPage.categoryDropdown().click();
      cy.get(`[data-testid="${escapeRegExp(category)}"]`).click();

      validateTextsAndNavigate(() => {
        searchResultsPage.searchCard().find('[data-aqa-id^="badge-"]').each((element) => {
          expect(Cypress.$(element).text().trim().toLowerCase()).to.contain(category.toLowerCase());
        });
      });
    });
  });

  context('Star Rating Dropdown Filter', function () {
    const ratings = {'4 stars and up': 4};
    Object.entries(ratings).forEach(([description, rating]) => {
      it(`should filter results by "${description}"`, function () {
        searchResultsPage.starRatingDropdown().click();
        cy.get(`[data-testid="${description}"]`).click();
        validateTextsAndNavigate(() => {
          searchResultsPage.ratingInteger().each((el) => {
            expect(parseFloat(Cypress.$(el).text())).to.be.at.least(rating);
          });
        });
      });
    });
  });

  context('Award Level Dropdown Filter', function () {
    it('should filter results based on specified award level', function () {
      const awardLevel = 'Exceptional winners';
      const firstWordOfAwardLevel = awardLevel.split(' ')[0].toLowerCase();

      searchResultsPage.awardLevelDropdown().click();
      cy.get(`[data-testid="${awardLevel}"]`).click();
      cy.wait('@apiSearch').then(({ response }) => {
        validateTextsAndNavigate(() => {
          const documents = JSON.parse(response.body).docs;
          documents.forEach(doc => {
            const awardLevels = doc.serviceAwardLevels || [];
            if (awardLevels.length > 0) {
              const awardLevelsLower = awardLevels.map(level => level.toLowerCase());
              expect(awardLevelsLower).to.include(firstWordOfAwardLevel);
            } else {
              cy.log(`${doc.name}: No Service Awards`);
            }
          });
        });
      });
    });
  });

  context('Sort By Dropdown Filters', function () {
    it('should sort items alphabetically (A - Z)', function () {
      sortItemsBy('Name - (A - Z)', (a, b) => a.localeCompare(b));
    });

    it('should sort items alphabetically (Z - A)', function () {
      sortItemsBy('Name - (Z - A)', (a, b) => b.localeCompare(a));
    });

    it('should sort items by rating (Low - High)', function () {
      sortItemsBy('Rating - (Low - High)', (a, b) => a - b);
    });

    // it('should sort items by rating (High - Low)', function () {
    //   sortItemsBy('Rating - (High - Low)', (a, b) => b - a);
    // });
  });

  function validateTextsAndNavigate (validationFunction) {
    cy.get('body').then($body => {
      validationFunction();

      if ($body.find('.next a').length > 0) {
        const $nextPage = $body.find('.next a');

        if (!$nextPage.is('[aria-disabled="true"]')) {
          cy.wrap($nextPage).click();
          cy.wait('@apiSearch').then(() => {
            validateTextsAndNavigate(validationFunction);
          });
        }
      }
    });
  }

  function escapeRegExp (text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }


  function sortItemsBy (testId, compareFunction) {
    searchResultsPage.sortByDropdown().click();
    cy.get(`[data-testid="${testId}"]`).click();
    cy.wait('@apiSearch').then((interception) => {
      validateTextsAndNavigate(() => {
        let itemsList = [];
        const docs = JSON.parse(interception.response.body).docs;
        docs.forEach(doc => {
          if (doc.name) {
            itemsList.push(doc.name);
          }
        });
        let sortedList = [...itemsList].sort(compareFunction);
        expect(itemsList).to.deep.equal(sortedList);
      });
    });
  }
});