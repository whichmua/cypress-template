class searchResultsPage {
  searchField () {
    return cy.get('[data-aqa-id="resource-filter-search-input-box"]');
  }

  categoryDropdown () {
    return cy.get('[data-aqa-id="category-dropdown-options"]');
  }

  starRatingDropdown () {
    return cy.get('[data-aqa-id="star-rating-dropdown-options"]');
  }

  awardLevelDropdown () {
    return cy.get('[data-aqa-id="award-level-dropdown-options"]');
  }

  sortByDropdown () {
    return cy.get('[data-aqa-id="sort-by-dropdown-options"]');
  }

  searchCard () {
    return cy.get('[data-aqa-id="card-base-item"]');
  }

  nextPage () {
    return cy.get('.next a');
  }

  ratingInteger () {
    return cy.get('[class="sc-a82a0cba-6 dDhapO"]');
  }
}

export default new searchResultsPage();