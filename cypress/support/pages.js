//
// Web page/URL conversion utilities
//

const Pages = {
  'Culture Columns Index': {
    test: '/culture/columns',
    live: '/culture/columns'
  },
  'Culture Continue Reading Article': {
    test: '/culture/article/20150610-heritage-fashion-goes-punk',
    live: '/culture/article/20210525-the-ultimate-island-hideaways'
  },
  'Culture Inline Video Article': {
    test: '/culture/article/20150610-heritage-fashion-goes-punk',
    live: '/culture/article/20150610-heritage-fashion-goes-punk'
  },
  'Culture Homepage': {
    test: '/culture/',
    live: '/culture/'
  },
  'Culture Premium Article': {
    test: '/culture/article/20200902-designs-new-happy-mood',
    live: '/culture/article/20210525-the-ultimate-island-hideaways'
  },
  'Culture Premium Index': {
    test: '/culture/designed',
    live: '/culture/designed'
  },
  'Culture Tags Index': {
    test: '/culture/tags/world-cinema',
    live: '/culture/tags/world-cinema'
  },
  'Future Columns Genius Behind Index': {
    test: '/future/columns/the-genius-behind',
    live: '/future/columns/the-genius-behind'
  },
  'Future Columns Health': {
    test: '/future/columns/health',
    live: '/future/columns/health'
  },
  'Future Columns Index': {
    test: '/future/columns',
    live: '/future/columns'
  },
  'Future Homepage': {
    test: '/future/',
    live: '/future/'
  },
  'Future Now Homepage': {
    test: '/future/now',
    live: '/future/now'
  },
  'Future Premium Article': {
    test: '/future/article/20170703-how-can-we-manage-earths-land',
    live:
      '/future/article/20170816-the-monster-atomic-bomb-that-was-too-big-to-use'
  },
  'Future Premium Standard Article': {
    test: '/future/article/20170503-the-hidden-cost-of-transport-megaprojects',
    live: '/future/article/20210827-the-unlikely-protector-against-rising-seas-in-bangladesh'
  },
  'Future Preview Infographics':{
    test: '/future/preview/article/053e930b-562f-427e-a2ac-67b1071eefbe',
    live: '/future/preview/article/a5329ce7-989c-44a3-98dd-ad3355f6194c'
  },
  'Future Story With Inline Image': {
    test: '/future/article/20150930-the-best-and-worst-ways-to-spot-a-liar',
    live:
      '/future/article/20170816-the-monster-atomic-bomb-that-was-too-big-to-use'
  },
  'Future Story With Inline Video': {
    test: '/future/article/20150821-up-close-and-personal-with-the-airbus-a380',
    live: '/future/article/20150607-up-close-and-personal-with-the-airbus-a380'
  },
  'Future Story With Inline Youtube': {
    test: '/future/article/20150511-why-the-world-is-awesome-in-60-facts',
    live: '/future/article/20130807-60-facts-about-our-awesome-world'
  },
  'Travel Story With Inline Image': {
    test: '/travel/article/20190110-pamir-highway-a-wild-ride-across-central-asia',
    live: ''
  },
  'Future Story With Premium Inline Video': {
    test:
      '/future/article/20170317-the-era-of-computerised-catastrophic-failure-is-here',
    live:
      '/future/article/20170317-the-era-of-computerised-catastrophic-failure-is-here'
  },
  'Future Supersize Gallery': {
    test: '/future/gallery/20160902-air-ambulance-story-test-page-setup',
    live:
      '/future/gallery/20160914-inside-the-trauma-team-where-prince-william-is-a-pilot'
  },
  'Future Tags Asteroid Index': {
    test: '/future/tags/asteroid',
    live: '/future/tags/asteroid'
  },
  'Future Tags Index': {
    test: '/future/tags',
    live: '/future/tags'
  },
  'Hero Video Story': {
    test:
      '/future/article/20160106-the-airliner-flight-sims-that-can-save-lives',
    live:
      '/future/article/20150522-the-universe-as-a-stunning-show-of-light/future/article/20170301-lies-propaganda-and-fake-news-a-grand-challenge-of-our-age'
  },
  'Hero Video Premium Story': {
    test: '/future/article/20170307-americas-opioid-addiction---explained',
    live:
      '/future/article/20170301-lies-propaganda-and-fake-news-a-grand-challenge-of-our-age'
  },
  Infographic: {
    test: '/future/article/20160308-time-of-day-test',
    live:
      '/future/article/20160630-infographic-a-24-hour-guide-to-your-brain-and-body'
  },
  'Infographic - Custom Embedded Slideshow Gallery': {
    test: '/future/article/20160701-techno-panic-test-long-headline',
    live: '/future/article/20160701-historys-greatest-technopanics'
  },
  'Worklife Homepage': {
    test: '/worklife/',
    live: '/worklife/'
  },
  'Worklife Premium Infographics Article': {
    test: '/worklife/article/20190828-test-for-infographics',
    live: '/worklife/article/20191018-the-worlds-fastest-growing-cities'
  },
  'Worklife Premium Video Article': {
    test: '/worklife/article/20190823-video-article',
    live: '/worklife/article/20190509-the-27-year-old-inventor-helping-kids-speak-through-toys'
  },
  'Worklife Premium Image Gallery Article': {
    test: '/worklife/article/20190823-video-article',
    live: ''
  },
  'Worklife Preview Image gallery':{
    test: '/worklife/preview/article/856957b3-d29d-4ae5-9231-77c29debfc01',
    live: '/worklife/preview/article/5ec2d99b-5f7f-400b-b2e2-dc5c13a041fd'
  },
  'Worklife Preview Standard Story':{
    test: '/worklife/preview/article/8fd31c0f-b844-4cc7-8501-0dbe3d0c5dd5',
    live: '/worklife/preview/article/43885bde-013e-4b53-985e-23f44ac996e9'
  },
  'Worklife Preview Video':{
    test: '/worklife/preview/article/691a60ee-520e-4049-9e1f-59bbadd25c92',
    live: '/worklife/preview/article/0c03ba20-e39d-436f-948f-b82a3ed2bdd4'
  },
  'Worklife Regular Image Gallery Article':{
    test: '/worklife/article/20191017-image-gallery-dont-edit',
    live: '/worklife/article/20150805-why-we-love-these-relics'
  },
  'Worklife Regular Infographics Article':{
    test: '/worklife/article/20190909-custom-embedded',
    live: '/worklife/article/20150216-my-taxes-go-where'
  },
  'Worklife Regular Standard Article':{
    test: '/worklife/article/20191017-image-gallery-dont-edit',
    live: '/worklife/article/20191016-the-appeal-of-extreme-fast-food-snack-food-fusion'
  },
  'Worklife Regular Video Article':{
    test: '/worklife/article/20190828-video-article',
    live: '/worklife/article/20190718-the-arms-length-flats-of-tokyo'
  },
};

Pages.getUrl = function (pageName, env) {
  const url = Pages[pageName][env];
  if (!url) {
    const message = `No URL named ${pageName} for environment ${env}`;
    throw new Error('PWAException', message);
  }
  return url;
};

module.exports = Pages;