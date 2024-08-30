class googlePage {
  url () {
    return 'https://www.bbc.co.uk';
  }

  searchBar () {
    return cy.get('.gLFyf');
  }
}

export default new googlePage();