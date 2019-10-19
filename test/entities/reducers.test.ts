import * as redux from 'redux';
import sinon from 'sinon';
import drugReducer from 'entities/drug/reducer';

it('entitiesReducer test', () => {
    //Given
    const combineReducersSpy = sinon.spy(redux, 'combineReducers');
    const expected = {
        drug: drugReducer,
    };

    //When
    require('entities/reducers');

    //Then
    expect(combineReducersSpy.calledOnceWithExactly(expected)).toBeTruthy();
});
