import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

let response;
const BASE_URL = 'https://automationexercise.com/api';

Given(/^I send a "(.*)" request to "(.*)"$/, (method, endpoint) => {
  cy.request({
    method: method,
    url: `${BASE_URL}${endpoint}`,
    failOnStatusCode: false, // 👈 prevents test from failing on 4xx/5xx responses
  }).then((res) => {
    response = res;
  });
});

Then(/^the response status should be "(.*)"$/, (statusCode) => {
  expect(response.status).to.eq(Number(statusCode));
});

Then('the response should contain a list of products', () => {
  const parsedBody = JSON.parse(response.body);
  expect(parsedBody).to.have.property('products');
  expect(parsedBody.products).to.be.an('array').and.have.length.greaterThan(0);
});

Then('each product should have {string}, {string}, and {string}', (idField, nameField, priceField) => {
  const parsedBody = JSON.parse(response.body); // 🔥 Parse once
  parsedBody.products.forEach((product) => {
    expect(product).to.have.property(idField);
    expect(product).to.have.property(nameField);
    expect(product).to.have.property(priceField);
  });
});