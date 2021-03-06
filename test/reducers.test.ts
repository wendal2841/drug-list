import * as redux from 'redux';
import sinon from 'sinon';
import { entitiesReducer } from 'entities/reducers';

it('combineReducers test', () => {
    //Given
    const combineReducersSpy = sinon.spy(redux, 'combineReducers');
    const expected = {
        entities: entitiesReducer,
    };

    //When
    require('reducers');

    //Then
    expect(combineReducersSpy.calledOnceWithExactly(expected)).toBeTruthy();
});
