import { mount } from 'enzyme';
import { drugRow } from 'components/drug-row';
import { IDrug } from 'entities/drug/types';

describe('components => drug-row', () => {
    it('should render drug-row', () => {
        //Given
        const expected = '{"name":"name"}';
        const drug: IDrug = {
            name: 'name',
        };
        const Component = drugRow(drug);

        //When
        const wrapper = mount(Component);

        //Then
        expect(wrapper.text()).toEqual(expected);
    });
});
