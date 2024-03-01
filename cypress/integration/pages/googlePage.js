class googlePage {
  googleURL () {
    return 'https://www.google.co.uk';
  }

  searchBar () {
    return cy.get('.gLFyf');
  }
}

export default new googlePage();