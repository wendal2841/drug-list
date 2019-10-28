import React from 'react';
import { Transition } from 'react-transition-group';
import { IPropsTransitionWrapper } from './types';
import { TRANSITION_DURATION, TRANSITION_STYLES } from './constants'
import { TransitionStatus } from 'react-transition-group/Transition';

export const TransitionWrapper: React.FC<IPropsTransitionWrapper> = ({
    children,
    isOpen,
    style,
}): JSX.Element => (
    <Transition
        mountOnEnter
        unmountOnExit
        appear
        in={isOpen}
        timeout={{
            enter: TRANSITION_DURATION,
            exit: TRANSITION_DURATION,
        }}
    >
        {
            (state: TransitionStatus): JSX.Element => (
                <div
                    className="transition-wrapper"
                    style={{
                        transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                        ...style,
                        ...TRANSITION_STYLES[state]
                    }}
                >
                    { children }
                </div>
            )
        }
    </Transition>
);
