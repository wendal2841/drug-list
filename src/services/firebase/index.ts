import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
    // apiKey: 'AIzaSyBhIqSHDfOxaO7TIaUCOIim7hXN4nesopM',
    // authDomain: 'frontendjoobletest.firebaseapp.com',
    // databaseURL: 'https://frontendjoobletest.firebaseio.com',
    // projectId: 'frontendjoobletest',
    // storageBucket: 'frontendjoobletest.appspot.com',
    // messagingSenderId: '777235773882',
    // appId: '1:777235773882:web:ad05c7e549dcd81e6b4583',
    // measurementId: 'G-NYGTQ2VHKB'
    apiKey: 'AIzaSyD0Eysa2yhqyjHH7i2MfutVigFS0azThqs',
    authDomain: 'test-91ab7.firebaseapp.com',
    databaseURL: 'https://test-91ab7.firebaseio.com',
    projectId: 'test-91ab7',
    storageBucket: 'test-91ab7.appspot.com',
    messagingSenderId: '796741165316',
    appId: '1:796741165316:web:1f3badd0af2b535a2a3051',
    measurementId: 'G-9R754FKBJT'
});
const RSF = new ReduxSagaFirebase(firebaseApp);

export default RSF;
