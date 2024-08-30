@APIMock
Feature: 01 API Mock
  
  Scenario: 01 Verify search bar - <searchterm>
    Given I visit the "BBC" homepage
    And I am on a ".co.uk" domain
    When I mock the "userinfo" request
    Then I am on a ".com" domain