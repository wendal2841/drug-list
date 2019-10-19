import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import * as ReactDom from 'react-dom';
import { rootReducer } from 'reducers';
import { rootSaga } from 'sagas';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Routes } from 'pages/routes';
import './styles.less';

const history = createBrowserHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware,
            reduxRouterMiddleware,
        )
    ),
);
sagaMiddleware.run(rootSaga);

ReactDom.render(<Routes store={store} history={history} />, document.getElementById('root'));

