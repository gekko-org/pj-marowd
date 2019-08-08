/* eslint-disable */
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBCTUDGs3SAzmBQUOv-kQq7s_PYaWOpdio',
    authDomain: 'pj-marowd.firebaseapp.com',
    databaseURL: 'https://pj-marowd.firebaseio.com',
    projectId: 'pj-marowd',
    storageBucket: 'pj-marowd.appspot.com',
    messagingSenderId: '878555019849',
    appId: '1:878555019849:web:22d4242096f12135'
};

const settings = { timestampsInSnapshots: true };
firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase
