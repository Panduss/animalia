export const environment = {
    production: true,
    wikipedia: {
        baseUrl: 'https://en.wikipedia.org/w/api.php?action=query&origin=*&formatversion=2&prop=extracts%7Cpageimages%7Crevisions&',
        getThumbnail: '&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=300&rvprop=timestamp&format=json'
    },
    firebase: {
        apiKey: 'AIzaSyCY5d5Y6seYkmGy3lQwOLQ1aJsPt0TA_3s',
        authDomain: 'animalia-01.firebaseapp.com',
        databaseURL: 'https://animalia-01.firebaseio.com',
        projectId: 'animalia-01',
        storageBucket: '',
        messagingSenderId: '446143950423',
        appId: '1:446143950423:web:9729020662434e62adbd12'
    },
    api: 'http://localhost:5000'
};
