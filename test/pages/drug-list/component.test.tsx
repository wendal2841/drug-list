import * as React from 'react';
import sinon from 'sinon';
import { DrugList } from 'pages/drug-list/component';
import { IPropsDrugList } from 'pages/drug-list/types';
import { mount } from 'enzyme';
import { drugRow } from 'components/drug-row';

jest.mock(
    'antd',
    () => ({
        List: (props: object): JSX.Element => (<div className="list" {...props} />),
    }),
);

describe('pages => drug-list => component', () => {
    const getDrugsSpy = sinon.spy();
    const defaultProps: IPropsDrugList = {
        drugs: [],
        getDrugs: getDrugsSpy,
    };

    it('constructor test', () => {
        //When
        new DrugList(defaultProps);

        //Then
        expect(getDrugsSpy.calledOnce).toBeTruthy();
    });

    it('should render List', () => {
        //Given
        const wrapper = mount<DrugList>(<DrugList {...defaultProps} />);

        //When
        const element = wrapper.find('.list');

        //Then
        expect(element.prop('itemLayout')).toEqual('horizontal');
        expect(element.prop('dataSource')).toEqual(defaultProps.drugs);
        expect(element.prop('renderItem')).toEqual(drugRow);
    })
});
