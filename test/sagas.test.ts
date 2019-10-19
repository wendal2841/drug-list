import { rootSaga, sagas } from 'sagas';
import { fork } from 'redux-saga/effects';

it('rootSaga test', () => {
    //When
    const generator = rootSaga();

    //Then
    expect(generator.next().value).toEqual(sagas.map(saga => fork(saga)));
    expect(generator.next().done).toBeTruthy();
});
