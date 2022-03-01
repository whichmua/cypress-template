@Google
Feature: 01 Google Test
  
  Scenario Outline: 01 Verify search bar - <searchterm>
    Given I visit the "Google" homepage
    And I click on the "I agree" button
    When I search for "<searchterm>"
    Then I should see "<searchresult>"

    Examples:
      | searchterm  | searchresult                |
      | apple music | https://music.apple.com     |
      | bbc news    | https://www.bbc.co.uk       |
      | itv news    | https://www.microsoft.co.uk |