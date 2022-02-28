export const ENVIRONMENTS = {
  TEST: 'test',
  LIVE: 'live'
};

// Removing other verticals until they have been PWA'd
export const MODULE_NAMES = ['worklife', 'future'];

export const ARTICLE_TYPES = {
  INFOGRAPHICS: 'embedded',
  VIDEO: 'video',
  STANDARD: 'standard',
  IMAGE_GALLERY: 'inline_image_gallery'
};


export const MODULE_COLOURS = {
  worklife: {
    main: 'rgb(0, 82, 161)',
    alt: 'rgb(139, 238, 217)',
    shareBtn: 'rgb(25, 62, 109)'
  },
  future: {
    main: 'rgb(0, 40, 86)',
    alt: 'rgb(255, 200, 87)',
    shareBtn: 'rgb(25, 62, 109)'
  },
  earth: {
    main: '#0fbb56',
    alt: '#002856',
    shareBtn: 'rgb(25, 62, 109)'
  },
  culture: {
    main: '#482878',
    alt: '#5ad2f4',
    shareBtn: 'rgb(25, 62, 109)'
  },
  travel: {
    main: '#589e50',
    alt: '#002856',
    shareBtn: 'rgb(25, 62, 109)'
  }
};

const commonSocialIcons = [
  {
    selector: '.facebook-icon.gelicon--facebook',
    name: 'facebook'
  },
  {
    selector: '.twitter-icon.gelicon--twitter',
    name: 'twitter'
  },
  {
    selector: '.linkedin-icon.gelicon--linkedin',
    name: 'linkedin'
  },
  {
    selector: '.email-icon.gelicon--mail',
    name: 'email'
  }
];

export const FOLLOW_US_LINKS = {
  worklife: [
    {
      name: 'facebook',
      link: 'https://www.facebook.com/BBCWorklife',
      id: 'facebookShareOption'
    },
    {
      name: 'twitter',
      link: 'https://www.twitter.com/BBC_Worklife',
      id: 'twitterShareOption'
    },
    {
      name: 'instagram',
      link: 'https://www.instagram.com/BBC_Worklife',
      id: 'instagramShareOption'
    },
    {
      name: 'email',
      link: 'http://pages.emails.bbc.com/subscribe/',
      id: 'emailShareOption'
    }
  ],
  future: [
    {
      name: 'facebook',
      link: 'https://www.facebook.com/BBCFuture',
      id: 'facebookShareOption'
    },
    {
      name: 'twitter',
      link: 'https://twitter.com/BBC_FUTURE',
      id: 'twitterShareOption'
    },
    {
      name: 'instagram',
      link: 'https://www.instagram.com/bbcfuture_official',
      id: 'instagramShareOption'
    },
    {
      name: 'email',
      link: 'http://pages.emails.bbc.com/subscribe/',
      id: 'emailShareOption'
    }
  ]
};
/*
 * Social Share Buttons can be different between verticals
 * https://jira.dev.bbc.co.uk/browse/WWVERTICAL-7113
 */
export const MODULE_SOCIAL_BUTTONS = {
  worklife: {
    desktop: commonSocialIcons,
    mobile: [
      ...commonSocialIcons,
      {
        selector: '.whatsapp-icon.gelicon--whatsapp',
        name: 'whatsapp'
      }
    ]
  },
  future: {
    desktop: commonSocialIcons,
    mobile: [
      ...commonSocialIcons,
      {
        selector: '.whatsapp-icon.gelicon--whatsapp',
        name: 'whatsapp'
      }
    ]
  }
};

export const COLLECTIONS_TYPES = {
  REGULAR: 'regular',
  PREMIUM: 'premium'
};

export const INDEX_PAGES_TYPES = {
  HOMEPAGE: 'homepage',
  REGULAR_COLLECTION: 'regular_collection',
  PREMIUM_COLLECTION: 'premium_collection',
  TAG_INDEX: 'tag_index'
};

export const ARTICLES = {
  [COLLECTIONS_TYPES.REGULAR]: {
    [ARTICLE_TYPES.INFOGRAPHICS]: {
      [ENVIRONMENTS.TEST]: '/worklife/article/20190909-custom-embedded',
      [ENVIRONMENTS.LIVE]:
        '/future/article/20141027-the-ultimate-limits-infographic'
    },
    [ARTICLE_TYPES.VIDEO]: {
      [ENVIRONMENTS.TEST]: '/worklife/article/20190828-video-article',
      [ENVIRONMENTS.LIVE]:
        '/worklife/article/20190718-the-arms-length-flats-of-tokyo'
    },
    [ARTICLE_TYPES.STANDARD]: {
      [ENVIRONMENTS.TEST]: '/worklife/article/20191017-image-gallery-dont-edit',
      [ENVIRONMENTS.LIVE]:
        '/worklife/article/20191016-the-appeal-of-extreme-fast-food-snack-food-fusion'
    },
    [ARTICLE_TYPES.IMAGE_GALLERY]: {
      [ENVIRONMENTS.TEST]: '/worklife/article/20191017-image-gallery-dont-edit',
      [ENVIRONMENTS.LIVE]:
        '/future/article/20170607-why-printers-add-secret-tracking-dots'
    }
  },
  [COLLECTIONS_TYPES.PREMIUM]: {
    [ARTICLE_TYPES.INFOGRAPHICS]: {
      [ENVIRONMENTS.TEST]: '/worklife/article/20190828-test-for-infographics',
      [ENVIRONMENTS.LIVE]:
        '/worklife/article/20191018-the-worlds-fastest-growing-cities'
    },
    [ARTICLE_TYPES.VIDEO]: {
      [ENVIRONMENTS.TEST]: '/worklife/article/20190823-video-article',
      [ENVIRONMENTS.LIVE]:
        '/worklife/article/20190509-the-27-year-old-inventor-helping-kids-speak-through-toys'
    },
    [ARTICLE_TYPES.STANDARD]: {
      [ENVIRONMENTS.TEST]:
        '/future/article/20181008-the-new-phones-that-are-stuck-in-the-past',
      [ENVIRONMENTS.LIVE]:
        '/worklife/article/20190722-what-is-the-worklife-101'
    },
    [ARTICLE_TYPES.IMAGE_GALLERY]: {
      [ENVIRONMENTS.TEST]:
        '/worklife/article/20191017-image-premium-gallery-dont-edit',
      [ENVIRONMENTS.LIVE]: ''
    }
  }
};

export const INDEX_PAGES = {
  [INDEX_PAGES_TYPES.HOMEPAGE]: {
    link: '/worklife/'
  },
  [INDEX_PAGES_TYPES.REGULAR_COLLECTION]: {
    link: '/worklife/office-space/'
  },
  [INDEX_PAGES_TYPES.PREMIUM_COLLECTION]: {
    link: '/worklife/bright-sparks-2',
    color: 'rgb(232, 74, 23)',
    description:
      'Bright Sparks - Please enter editorial info here for when the section is Shared edited by priya',
    name: 'Bright Sparks 2'
  },
  [INDEX_PAGES_TYPES.TAG_INDEX]: {
    link: '/worklife/columns/work-ethic/'
  }
};

export const VIEWS = {
  DESKTOP: {
    x: 1280,
    y: 720
  },
  TABLET: {
    x: 768,
    y: 720
  },
  SMALL_TABLET: {
    x: 700,
    y: 720
  },
  MOBILE: {
    x: 360,
    y: 640
  }
};

export default {
  MODULE_NAMES,
  ENVIRONMENTS,
  ARTICLE_TYPES,
  COLLECTIONS_TYPES,
  INDEX_PAGES_TYPES,
  INDEX_PAGES,
  ARTICLES,
  MODULE_COLOURS,
  MODULE_SOCIAL_BUTTONS,
  FOLLOW_US_LINKS,
  VIEWS
};