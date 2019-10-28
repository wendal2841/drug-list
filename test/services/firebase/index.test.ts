import sinon from 'sinon';
import * as firebase from 'firebase';

describe('services => firebase', () => {
    it('initializeApp test', () => {
        //Given
        const initializeAppSpy = sinon.spy();

        sinon.replace(firebase, 'initializeApp', initializeAppSpy);

        const options = {
            apiKey: 'AIzaSyD0Eysa2yhqyjHH7i2MfutVigFS0azThqs',
            authDomain: 'test-91ab7.firebaseapp.com',
            databaseURL: 'https://test-91ab7.firebaseio.com',
            projectId: 'test-91ab7',
            storageBucket: 'test-91ab7.appspot.com',
            messagingSenderId: '796741165316',
            appId: '1:796741165316:web:1f3badd0af2b535a2a3051',
            measurementId: 'G-9R754FKBJT'
        };

        //When
        const actual = require('services/firebase');

        //Then
        expect(initializeAppSpy.calledOnceWithExactly(options)).toBeTruthy();
        expect(actual).toBeTruthy();
    });
});
