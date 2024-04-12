Feature: Search Results Page
  
  Background: Navigate to "search results" page
    Given I visit the "search results" page

  Scenario Outline: Search Field - Positive Test - "<searchTerm>"
    When I search for "<searchTerm>"
    Then I should see a list of merchants containing title "<searchTerm>"

    Examples:
      | searchTerm |
      | taxi       |
      | wat        |

  Scenario Outline: Search Field - Negative Test - "<searchTerm>"
    When I search for "<searchTerm>"
    Then I should see "No Results"
    And I should see "We’re sorry but nothing matched that search, please try again with different criteria or"

    Examples:
      | searchTerm |
      | poster123  |

  Scenario Outline: Category Dropdown Filter - "<category>"
    When I click on the "Category" dropdown
    And I select "<category>" from the dropdown
    Then I should see a list of merchants containing industry "<category>"

    Examples:
      | category             |
      | Education & Training |

  Scenario Outline: Star Rating Dropdown Filter - "<starRating>"
    When I click on the "Star Rating" dropdown
    And I select "<starRating>" from the dropdown
    Then I should see a list of merchants with a rating greater than or equal to "<ratingInteger>"

    Examples:
      | starRating     | ratingInteger |
      | 4 stars and up | 4             |

  Scenario Outline: Award Level Dropdown Filter - "<awardLevel>"
    When I click on the "Award Level" dropdown
    And I select "<awardLevel>" from the dropdown
    And I should see a list of merchants with an award level of "<awardLevelTerm>"

    Examples:
      | awardLevel          | awardLevelTerm |
      | Exceptional winners | Exceptional    |

  Scenario Outline: Sort By Dropdown Filter - "<sortBy>"
    When I click on the "Sort By" dropdown
    And I select "<sortBy>" from the dropdown
    Then the items should be sorted alphabetically from "<order>"

    Examples:
      | sortBy         | order  |
      | Name - (A - Z) | A to Z |
      | Name - (Z - A) | Z to A |

  Scenario Outline: Sort By Dropdown Filter - "<sortBy>"
    When I click on the "Sort By" dropdown
    And I select "<sortBy>" from the dropdown
    Then the items should be sorted by rating from "<order>"

    Examples:
      | sortBy                | order       |
      | Rating - (Low - High) | Low to High |

    @ignore
    Examples:
      | sortBy                | order       |
      | Rating - (High - Low) | High to Low |