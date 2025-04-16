@api
Feature: Products API

  Scenario: 01 Get all products list
    Given I send a "GET" request to "/productsList"
    Then the response status should be "200"
    And the response should contain a list of products
    And each product should have "id", "name", and "price"

  Scenario: 02 Requesting an invalid endpoint returns 404
    When I send a "GET" request to "/invalidEndpoint"
    Then the response status should be "404"