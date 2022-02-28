@StoryworksUK
Feature: 02 Storyworks UK

  @Desktop
  Scenario: 01 Verify /storyworks should display international page - Desktop
    Given I visit "/storyworks"
    When I set the view to "DESKTOP"
    Then International page is displayed
    And Verify Branded Content Custom production text
    And URL should be HTTPS

  @Desktop
  Scenario Outline: 02 Verify /storyworks/ any should display error page - Desktop
    Given I visit "<page>"
    When I set the view to "DESKTOP"
    Then I should see "We’re Sorry!" text
    And URL should be HTTPS

    Examples:
      | page                                                                     |
      | /storyworks/travel/travel-on/the-new-normal-travel-in-the-covid-19-world |
      | /storyworks/wellings-living-well/passing-down-lessons-in-a-whole-new-way |

  @Mobile
  Scenario: 03 Verify /storyworks should display international page - Mobile
    Given I visit "/storyworks"
    When I set the view to "MOBILE"
    Then International page is displayed
    And Verify Branded Content Custom production text
    And URL should be HTTPS

  @Mobile
  Scenario Outline: 04 Verify /storyworks/ any should display error page - Mobile
    Given I visit "<page>"
    When I set the view to "MOBILE"
    Then I should see "We’re Sorry!" text
    And URL should be HTTPS

    Examples:
      | page                                                                     |
      | /storyworks/travel/travel-on/the-new-normal-travel-in-the-covid-19-world |
      | /storyworks/wellings-living-well/passing-down-lessons-in-a-whole-new-way |

  @Tablet
  Scenario: 05 Verify /storyworks should display international page - Tablet
    Given I visit "/storyworks"
    When I set the view to "TABLET"
    Then International page is displayed
    And Verify Branded Content Custom production text
    And URL should be HTTPS

  @Tablet
  Scenario Outline: 06 Verify /storyworks/ any should display error page - Tablet
    Given I visit "<page>"
    When I set the view to "TABLET"
    Then I should see "We’re Sorry!" text
    And URL should be HTTPS

    Examples:
      | page                                                                     |
      | /storyworks/travel/travel-on/the-new-normal-travel-in-the-covid-19-world |
      | /storyworks/wellings-living-well/passing-down-lessons-in-a-whole-new-way |