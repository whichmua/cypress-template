@HeroTextComponent @US
Feature: 01 Check Storyworks hero text component
  
  Scenario Outline: 01 Check storyworks hero text component displays - <view>
    Given I visit "https://www.test.bbc.com/storyworks/future/futurecampaign/hero-text-component"
    When I set the view to "<view>"
    Then the top bar should contain a logo
    And partner contents should be present
    And I scroll to the content body
    And Background hero image present and size is 1920_960
    And the image url should be https and include ychef
    And Verify title text is present
    And Verify Sub-heading text is display
    And Verify headline text is present
    And Verify Standfirst text should display below the main Hero content area
    And Verify body article contain a title

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