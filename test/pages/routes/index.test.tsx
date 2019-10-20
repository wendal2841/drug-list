import * as React from 'react';
import { mount } from 'enzyme';
import { IPropsRoutes } from 'pages/routes/types';
import configureStore from 'redux-mock-store';
import { Routes } from 'pages/routes';
import { createBrowserHistory } from 'history';
import MedicineList from 'pages/medicine-list';

jest.mock(
    'react-redux',
    () => ({
        Provider: (props: object): JSX.Element => (<div className="provider" {...props} />),
        connect: (): () => JSX.Element => (): JSX.Element => (<div />)
    }),
);
jest.mock(
    'react-router-redux',
    () => ({
        ConnectedRouter: (props: object): JSX.Element => (<div className="connected-router" {...props} />),
    }),
);
jest.mock(
    'react-router',
    () => ({
        Switch: (props: object): JSX.Element => (<div className="switch" {...props} />),
        Route: (props: object): JSX.Element => (<div className="route" {...props} />),
    }),
);

describe('pages => Routes', () => {
    const defaultProps: IPropsRoutes  = {
        store: configureStore()(),
        history: createBrowserHistory(),
    };

    it('Should render element Provider', () => {
        //When
        const wrapper = mount(<Routes {...defaultProps} />);
        const element = wrapper.find('.provider');

        //Then
        expect(element.prop('store')).toEqual(defaultProps.store);
    });

    it('Should render element ConnectedRouter', () => {
        //When
        const wrapper = mount(<Routes {...defaultProps} />);
        const element = wrapper.find('.connected-router');

        //Then
        expect(element.prop('history')).toEqual(defaultProps.history);
    });

    it('Should render element Switch', () => {
        //When
        const wrapper = mount(<Routes {...defaultProps} />);
        const element = wrapper.find('.switch');

        //Then
        expect(element).toHaveLength(1);
    });

    it('Should render element Route', () => {
        //When
        const wrapper = mount(<Routes {...defaultProps} />);
        const element = wrapper.find('.route');

        //Then
        expect(element.at(0).prop('exact')).toEqual(true);
        expect(element.at(0).prop('path')).toEqual('/');
        expect(element.at(0).prop('component')).toEqual(MedicineList);
    });
});
