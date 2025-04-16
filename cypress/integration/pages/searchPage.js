class searchPage {
  searchBar () {
    return cy.get('#searchbox_input');
  }

  firstResult () {
    return cy.get('[data-testid="result"]').first();
  }
}

export default new searchPage();