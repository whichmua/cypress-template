@BespokeSanity
Feature: 03 Bespoke Sanity Checks

  Scenario Outline: 01 Check valid responses for bespoke pages
    Given I visit "<url>"
    Then the page is served via insecure http

    Examples:
      | url                                                           |
      | /travel/bespoke/can-science-and-tourism-save-the-reef/        |
      | /travel/bespoke/is-this-the-future-of-underwater-exploration/ |
      #| /travel/bespoke/innovation                                            |
      #| /travel/bespoke/story/20150309-50-reasons-to-love-the-world           |
      #| /travel/bespoke/story/20150326-travel-pioneers                        |
      #| /travel/bespoke/story/20150424-a-view-that-puts-window-seats-to-shame |
      #| /travel/bespoke/story/20160513-the-people-of-the-us-national-parks    |
      #| /travel/bespoke/story/20160531-the-us-national-parks-turn-100         |
      | /travel/bespoke/specials/a-sense-of-discovery               |
      | /travel/bespoke/specials/discover-ireland                   |
      | /travel/bespoke/specials/hq9v2-ep_5k3dbj                    |
      | /travel/bespoke/specials/island-life                        |
      | /travel/bespoke/specials/jiangsu                            |
      | /travel/bespoke/specials/journey-along-the-coastal-causeway |
      | /travel/bespoke/specials/life-well-travelled                |
      | /travel/bespoke/specials/macau-then-and-now                 |
      | /travel/bespoke/specials/road-trips-through-quebec          |
      | /travel/bespoke/specials/sun-and-sanya                      |
      | /travel/bespoke/specials/suzhou-city-of-classical-charms    |
      | /travel/bespoke/specials/travel-quiz-reasons                |
      | /travel/bespoke/specials/xian-through-the-senses            |
      | /worklife/bespoke/portrait-of-power                         |
