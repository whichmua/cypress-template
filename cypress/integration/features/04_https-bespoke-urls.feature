@BespokeSanity @US
Feature: 04 Bespoke Sanity Checks

  Scenario Outline: 01 Check valid responses for bespoke pages
    Given I visit "<url>"
    Then the page is served via secure https

    Examples:
      | url                                                                                       |
      | /storyworks/specials/being-your-best/the-big-business-of-a-small-fruit/gif1/contents.html |
      | /storyworks/specials/being-your-best/the-big-business-of-a-small-fruit/gif2/contents.html |
      | /storyworks/specials/being-your-best/the-big-business-of-a-small-fruit/gif3/contents.html |
      | /storyworks/specials/etf/article1v1/contents.html                                         |
      | /storyworks/specials/etf/gifs/article1v3/contents.html                                    |
      | /storyworks/specials/etf/article1v2/contents.html                                         |
      | /storyworks/specials/can-ai-help-us-work-better/contents.html                             |
      | /storyworks/specials/how-ai-could-change-the-world/contents.html                          |
      | /storyworks/specials/ping-identity/contents.html                                          |
      | /storyworks/capital/specials/looking-westwards-2020-infographic/contents.html             |
      | /storyworks/future/specials/transforming-taiwan/taiwan-economy-quiz/contents.html         |
      | /storyworks/specials/image-sliders/empire/contents.html                                   |
      | /storyworks/specials/image-sliders/japan/contents.html                                    |
      | /storyworks/specials/image-sliders/stavanger/contents.html                                |
      | /storyworks/specials/image-sliders/sydney/contents.html                                   |
      | /storyworks/specials/abu-dhabi-infographics/nature/contents.html                          |
      | /storyworks/specials/abu-dhabi-infographics/cuisine/contents.html                         |
      | /storyworks/specials/where-the-worlds-moving/contents.html                                |
      | /storyworks/specials/australian-spending/contents.html                                    |
      | /storyworks/specials/test/gifs/smell-quote/contents.html                                  |
      | /storyworks/specials/test/gifs/ballet-quote/contents.html                                 |
      | /storyworks/specials/connecting-the-dots/contents.html                                    |
      | /storyworks/travel/specials/bulgaria-tourism/culture/contents.html                        |
      | /storyworks/travel/specials/bulgaria-tourism/gastronomy/contents.html                     |
      | /storyworks/future/specials/future-of-flight/contents.html                                |
      | /worklife/bespoke/specials/my-other-life/index.html                                       |
      | /worklife/bespoke/specials/happiest-destinations-for-expats/index.html                    |
      | /storyworks/specials/freedom-of-time/contents.html                                        |
      | /worklife/bespoke/specials/cathay_keeping_focus/index.html                                |
      | /storyworks/capital/specials/sap/                                                         |
      | /storyworks/capital/specials/what-is-the-best-country/contents.html                       |
      | /storyworks/capital/specials/where-in-the-world/                                          |
      | /storyworks/specials/reaching-the-summit/contents.html                                    |
      | /storyworks/capital/specials/moving-africa/connectivity/contents.html                     |
      | /storyworks/capital/specials/moving-africa/design/contents.html                           |
      | /storyworks/capital/specials/moving-africa/education/contents.html                        |
      | /storyworks/capital/specials/standard-bank/finance/contents.html                          |
      | /storyworks/capital/specials/moving-africa/leadership/contents.html                       |
      | /storyworks/capital/specials/what-type-of-business-traveller-are-you/contents.html        |
      | /storyworks/specials/disruption-2020/education/contents.html                              |
      | /storyworks/specials/disruption-2020/finance/contents.html                                |
      | /storyworks/specials/disruption-2020/healthcare/contents.html                             |
      | /storyworks/specials/disruption-2020/manufacturing/contents.html                          |
      | /storyworks/capital/specials/moving-africa/leadership/contents.html                       |
      | /storyworks/capital/specials/standard-bank/healthcare/contents.html                       |
      | /storyworks/capital/specials/standard-bank/going-for-growth/contents.html                 |
      | /storyworks/specials/assets                                                               |
      | /storyworks/specials/kazakhstan-transport/inspired-by-the-past-designed-for-the-future    |
      | /storyworks/specials/moving-to-america                                                    |
      | /storyworks/specials/moving-to-america-spanish                                            |
      | /storyworks/specials/moving-to-america-chinese                                            |
