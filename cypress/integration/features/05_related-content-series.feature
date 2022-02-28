@RelatedSeriesComponent @US
Feature: 05 Related Series Component

  Scenario Outline: 01 Check Related series component is displayed
    Given I visit "https://www.test.bbc.com/storyworks/cross-pilliars/home"
    And I set the view to "<view>"
    When I scroll to the Related Content Series Module
    Then the related content Header should display
    And the Related Series component headline is displayed
    And the Client logo is displayed
    And a story Image is displayed
    
    @Desktop
    Examples:
      | view    |
      | DESKTOP |

    @Mobile
    Examples:
      | view   |
      | MOBILE |

    @Tablet
    Examples:
      | view   |
      | TABLET |

    @SmallTablet
    Examples:
      | view         |
      | SMALL_TABLET |