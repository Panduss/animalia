import { ConfigTemplate } from './template';

export default {
  version: '0.1',
  environment: 'production',
  defaultLocale: 'en_GB',
  wikipedia: {
      baseUrl: 'https://en.wikipedia.org/w/api.php?action=query&origin=*&formatversion=2&prop=extracts%7Cpageimages%7Crevisions&',
      getThumbnail: '&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=300&rvprop=timestamp&format=json'
    }
} as ConfigTemplate;
