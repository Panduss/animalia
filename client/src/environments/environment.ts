export const environment = {
    production: false,
    wikipedia: {
        baseUrl: 'https://en.wikipedia.org/w/api.php?action=query&origin=*&formatversion=2&prop=extracts%7Cpageimages%7Crevisions&',
        getThumbnail: '&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=300&rvprop=timestamp&format=json'
    },
    api: 'http://localhost:5000/animals/'
};
