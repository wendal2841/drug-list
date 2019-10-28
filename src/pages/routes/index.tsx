import * as React from 'react';
import { IPropsRoutes } from './types';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import MedicineList from 'pages/medicine-list';

export const Routes: React.FC<IPropsRoutes> = ({ store, history }): JSX.Element => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={MedicineList} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);
