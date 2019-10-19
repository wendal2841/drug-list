import * as React from 'react';
import { App } from 'pages/app';
import { IPropsApp } from 'pages/app/types';
import { mount } from 'enzyme';

describe('pages/app', () => {
    const defaultProps: IPropsApp = {

    };

    it('Should render app', () => {
        //Given
        const wrapper = mount(<App {...defaultProps} />);

        //When
        const element = wrapper.find('.app');

        //Then
        expect(element.text()).toEqual('App');
    });
});
