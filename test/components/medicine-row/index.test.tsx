import { mount } from 'enzyme';
import { medicineRow } from 'components/medicine-row';
import { IMedicine } from 'entities/medicine/types';

describe('components => medicine-row', () => {
    it('should render drug-row', () => {
        //Given
        const expected = '{"code":"code","name":"name","price":100,"shelfLife":424352345,"compositionAndFormOfRelease":"compositionAndFormOfRelease","indication":"indication","contraindications":"contraindications"}';
        const drug: IMedicine = {
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        };
        const Component = medicineRow(drug);

        //When
        const wrapper = mount(Component);

        //Then
        expect(wrapper.text()).toEqual(expected);
    });
});
