
import { VIEWS } from '../test-data.constants';

export const ATI = 'ati';

// ati calls have values that themselves contain =
export const getATIAnalyticsCalls = win => {
  const resources = win.performance.getEntriesByType('resource');
  const analyticsCalls = [];
  const collectionDomains = [];
  collectionDomains.push('hit.xiti');
  collectionDomains.push('ati.host');

  for (let i = 0; i < resources.length; i += 1) {
    const { name } = resources[i];

    // console.log(i + "=" + name)

    for (let j = 0; j < collectionDomains.length; j += 1) {
      if (name.indexOf(collectionDomains[j] > -1)) {
        // console.log(i + "=" + name)

        const a = name.split('?')[1];
        const b = a.substr(0).split('&');

        const aObj = {};
        for (let k = 0; k < b.length; k += 1) {
          const firstEquals = b[k].indexOf('=');
          const prop = b[k].substring(0, firstEquals);
          const val = b[k].substring(firstEquals + 1);

          // we have values that themselves contain strings
          // which themselves are split by ::
          // sheesh
          // so return an array of objects
          if (val.indexOf('::') !== -1) {
            const separatedStrs = val.split('::');

            const seperatedObjs = [];

            for (let l = 0; l < separatedStrs.length; l += 1) {
              const atiSeperatedTheme = separatedStrs[l].split('~');

              let atiSeperatedObj = {};
              for (let m = 0; m < atiSeperatedTheme.length; m += 1) {
                const atiValue = atiSeperatedTheme[m].split('=');
                if (atiValue.length > 1) {
                  const resultIndex = 1;
                  atiSeperatedObj[atiValue[0]] = atiValue[resultIndex];
                } else {
                  atiSeperatedObj = atiValue;
                }
              }
              seperatedObjs.push(atiSeperatedObj);
            }
            aObj[prop] = seperatedObjs;
          } else {
            aObj[prop] = val;
          }
        }

        analyticsCalls.push(aObj);
      }
    }
  }

  return analyticsCalls;
};

export const getAnalyticsCalls = (win, statsProvider) => {
  const resources = win.performance.getEntriesByType('resource');

  const analyticsCalls = [];

  const collectionDomains = [];
  if (statsProvider === ATI) {
    collectionDomains.push('hit.xiti');
    collectionDomains.push('ati.host');
  }

  for (let i = 0; i < resources.length; i += 1) {
    const { name } = resources[i];
    for (let j = 0; j < collectionDomains.length; j += 1) {
      if (name.indexOf(collectionDomains[j]) > -1) {
        const a = name.split('?');
        const b = a[1].split('&');
        const aObj = {};
        for (let jj = 0; jj < b.length; jj += 1) {
          const c = b[jj].split('=');
          aObj[c[0]] = decodeURIComponent(c[1]);
        }
        analyticsCalls.push(aObj);
      }
    }
  }

  return analyticsCalls;
};

export const checkElementBackgroundColor = (element, expectedValue) => {
  cy.get(element)
    .first()
    .scrollIntoView()
    .should('be.visible')
    .should('have.css', 'background-color')
    .and('eq', expectedValue);
};

export const checkElementBorderColor = (element, expectedValue) => {
  cy.get(element)
    .first()
    .scrollIntoView()
    .should('be.visible')
    .should('have.css', 'border-color')
    .and('eq', expectedValue);
};

export const assertElementHasText = element => {
  cy.get(element).first().scrollIntoView().should('be.visible').then($el => {
    expect($el.text()).to.not.equal('');
    expect($el.text()).to.not.equal(undefined);
  });
};

export const assetElementLink = (element, expectedValue) => {
  cy.get(element)
    .should('be.visible')
    .then($el => {
      const link = $el[0].href;
      expect(link).to.equal(expectedValue);
    });
};

export const assertElementPresent = element => {
  cy.get(element)
    .first()
    .scrollIntoView()
    .should('be.visible');
};

export const visitPWAPage = link => {
  // navigate to current article that we are testing for
  cy.visit(link+'?site=test');

  // check we have correctly navigated to it
  cy.location('pathname').should('include', link);

  // BBC_GNL_PWA_MAIN being available means the page has been properly rendered
  cy.window().should('have.property', 'BBC_GNL_PWA_MAIN');
};

export const setView = (view) => {
  cy.viewport(view.x, view.y);
  Cypress.config('viewportWidth', view.x);
  Cypress.config('viewportHeight', view.y);
};

export const setDesktopView = () => {
  cy.viewport(VIEWS.DESKTOP.x, VIEWS.DESKTOP.y);
};

export const setTabletView = () => {
  cy.viewport(VIEWS.TABLET.x, VIEWS.TABLET.y);
};

export const setMobileView = () => {
  cy.viewport(VIEWS.MOBILE.x, VIEWS.MOBILE.y);
};

export const getPlayerRef = (win, containingDivCSSselector) => {
  const playerContainer = win.document.querySelector(`${containingDivCSSselector} div[id^='bbcMediaPlayer']`);
  let playerRef;
  const players = win.embeddedMedia.api.players();
  // It may be more sensible to use pl._settings.domid and just check against the id string of the div container
  for (let i in players) {
    const pl = players[i];
    if (pl._settings.container === playerContainer) {
      playerRef = pl;
      return playerRef;
    }
  }
  return false;
};

/*
This is a useful example of how to listen directly to player events. i.e. player.bind('playing', onPlaying);
Create similar utility functions for any of the player events listed here:
https://confluence.dev.bbc.co.uk/display/mp/SMP+Events

For the continuous play plugin see the "Plugin events" section here:
https://confluence.dev.bbc.co.uk/display/mp/Autoplay+%28new+Continuous+Play%29+plugin

For the ads plugin:
player.bind('adsPlugin', (event) => {
  event.id
);
event.id can be one of:
- "adsPlugin"
- "adRequest"
- "adManagerLoaded"
- "adStarted"
- "adEnded"
- "adImpression"
- "adError"
- "adDuration"
- "adProgress"
- "adData"
- "adClick"

This event is also chucked out of the ads plugin:
player.bind('bbc.smp.plugins.ads.event.AdsPluginExternalEvent.ALL_ADS_COMPLETED', (event) => {
  // all ads have completed (pre and post roll)
);



 */
export const waitForPlaying = player => {
  return new Cypress.Promise(resolve => {
    if (player.paused() === false) {
      // already playing
      resolve();
    }
    const onPlaying = () => {
      player.unbind('playing', onPlaying);
      resolve();
    };
    player.bind('playing', onPlaying);
  });
};

export default {
  getATIAnalyticsCalls,
  getAnalyticsCalls,
  checkElementBackgroundColor,
  checkElementBorderColor,
  assetElementLink,
  assertElementHasText,
  assertElementPresent,
  visitPWAPage,
  setDesktopView,
  setTabletView,
  setMobileView,
  setView
};