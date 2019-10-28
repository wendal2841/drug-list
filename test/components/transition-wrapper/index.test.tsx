import React from 'react';
import { mount } from 'enzyme';
import { TransitionWrapper } from 'components/transition-wrapper';
import { TransitionStatus } from 'react-transition-group/Transition';

jest.mock(
    'react-transition-group',
    () => ({
        Transition: (props: object): JSX.Element => (<div className="transition" {...props} />)
    }),
);

describe('components -> transition-wrapper', () => {
    const props = {
        isOpen: false,
    };

    it('should render Transition with props', () => {
        //When
        const transition = mount(<TransitionWrapper {...props} />).find('.transition');

        //Then
        expect(transition.prop('mountOnEnter')).toEqual(true);
        expect(transition.prop('unmountOnExit')).toEqual(true);
        expect(transition.prop('appear')).toEqual(true);
        expect(transition.prop('in')).toEqual(props.isOpen);
        expect(transition.prop('timeout')).toEqual({
            enter: 300,
            exit: 300,
        });
    });

    it('should render children and pass transition state', () => {
        //Given
        const transition = mount(<TransitionWrapper {...props} />).find('.transition');
        const children = transition.prop('children') as (state: TransitionStatus) => JSX.Element;

        //When
        const wrapper = children('entered');

        //Then
        expect(wrapper.props.className).toEqual('transition-wrapper');
        expect(wrapper.props.style).toEqual({
            transition: 'opacity 300ms ease-in-out',
            opacity: 1,
        });
    });

    it('should pass additional styles', () => {
        //Given
        const style = {
            width: '100px',
            height: '100px',
        };
        const transition = mount(<TransitionWrapper {...props} style={style} />).find('.transition');
        const children = transition.prop('children') as (state: TransitionStatus) => JSX.Element;

        //When
        const wrapper = children('entered');

        //Then
        expect(wrapper.props.style).toEqual({
            transition: 'opacity 300ms ease-in-out',
            opacity: 1,
            width: '100px',
            height: '100px',
        });
    });
});
