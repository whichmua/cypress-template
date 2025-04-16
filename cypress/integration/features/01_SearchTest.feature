@ui @search
Feature: 01 Search Test
  
  Scenario Outline: 01 Verify DuckDuckGo search results - <searchterm>
    Given I visit the "DuckDuckGo" homepage
    When I search for "<searchterm>"
    Then I should see "<expectedResult>" as the first result

    Examples:
      | searchterm  | expectedResult  |
      | apple music | music.apple.com |
      | bbc         | bbc.com         |
      # Note: The following test case is designed to demonstrate a failure within Cypress
      # | itv news | https://www.microsoft.co.uk |