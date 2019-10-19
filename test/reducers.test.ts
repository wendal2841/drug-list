import * as redux from 'redux';
import sinon from 'sinon';

it('combineReducers test', () => {
    //Given
    const combineReducersSpy = sinon.spy(redux, 'combineReducers');
    const expected = {};

    //When
    require('reducers');

    //Then
    expect(combineReducersSpy.calledOnceWithExactly(expected)).toBeTruthy();
});
