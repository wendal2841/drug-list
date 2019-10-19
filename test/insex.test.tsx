import * as React from 'react';
import sinon from 'sinon';
import ReactDom from 'react-dom';
import * as redux from 'redux';
import configureStore from 'redux-mock-store';
import * as createSagaMiddleware from 'redux-saga';
import * as reduxDevtoolsExtension from 'redux-devtools-extension';
import * as reducers from 'reducers';
import * as history from 'history';
import * as reactRouterRedux from 'react-router-redux';
import * as sagas from 'sagas';

jest.mock(
    'pages/routes',
    () => ({
        Routes: (props: object): JSX.Element => (<div {...props} />),
    }),
);

it('render test', () => {
    //Given
    const historySpy = sinon.spy();
    const routerMiddlewareSpy = sinon.spy();
    const createSagaMiddlewareRunStub = sinon.spy();
    const createSagaMiddlewareStub = sinon.stub().returns({ run: createSagaMiddlewareRunStub });
    const applyMiddlewareSpy = sinon.spy();
    const createStoreStub = sinon.stub().returns(configureStore()());
    const rootReducerSpy = sinon.spy();
    const rootSagaSpy = sinon.spy();
    const composeWithDevToolsSpy = sinon.spy();
    const renderSpy = sinon.spy();
    const getElementByIdStub = sinon.stub().returns('element');

    sinon.replace(history, 'createBrowserHistory', historySpy);
    sinon.replace(reactRouterRedux, 'routerMiddleware', routerMiddlewareSpy);
    sinon.replace(createSagaMiddleware, 'default', createSagaMiddlewareStub);
    sinon.replace(redux, 'applyMiddleware', applyMiddlewareSpy);
    sinon.replace(redux, 'createStore', createStoreStub);
    sinon.replace(reducers, 'rootReducer', rootReducerSpy);
    sinon.replace(sagas, 'rootSaga', rootSagaSpy);
    sinon.replace(reduxDevtoolsExtension, 'composeWithDevTools', composeWithDevToolsSpy);
    sinon.replace(document, 'getElementById', getElementByIdStub);
    sinon.replace(ReactDom, 'render', renderSpy);

    //When
    require('index');

    //Then
    expect(historySpy.calledOnceWithExactly()).toBeTruthy();
    expect(routerMiddlewareSpy.calledOnceWithExactly(historySpy())).toBeTruthy();
    expect(createSagaMiddlewareStub.calledOnceWithExactly()).toBeTruthy();

    expect(applyMiddlewareSpy.calledOnceWithExactly(
        createSagaMiddlewareStub(),routerMiddlewareSpy())
    ).toBeTruthy();

    expect(composeWithDevToolsSpy.calledOnceWithExactly(applyMiddlewareSpy())).toBeTruthy();

    expect(createStoreStub.calledOnceWithExactly(
        rootReducerSpy, composeWithDevToolsSpy())
    ).toBeTruthy();

    expect(createSagaMiddlewareRunStub.calledOnceWithExactly(rootSagaSpy)).toBeTruthy();

    expect(getElementByIdStub.calledOnceWithExactly('root')).toBeTruthy();
    expect(renderSpy.calledOnce).toBeTruthy();

    expect(renderSpy.getCall(0).args[0].props.store).toEqual(createStoreStub());
    expect(renderSpy.getCall(0).args[0].props.history).toEqual(historySpy());
    expect(renderSpy.getCall(0).args[1]).toEqual(getElementByIdStub());
});
