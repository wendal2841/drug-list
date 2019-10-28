import * as React from 'react';
import { IPropsMedicineList, IStateMedicineList } from './types';
import { MedicineRow } from 'components/medicine-row';
import { AddMedicine } from 'components/add-medicine';

export class MedicineList extends React.PureComponent<IPropsMedicineList, IStateMedicineList> {
    state: IStateMedicineList = { isOpenModalAdd: false };

    constructor(props: IPropsMedicineList) {
        super(props);

        props.getMedicines();
    }

    addMedicine = (): void => {
        const { addMedicine } = this.props;

        this.setState({ isOpenModalAdd: true });

        addMedicine({
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        });
    };
    onCloseModalAdd = (): void => this.setState({ isOpenModalAdd: false });

    render(): JSX.Element {
        const { medicines, deleteMedicine } = this.props;
        const { isOpenModalAdd } = this.state;

        return (
            <div className="medicine-list" >
                {
                    medicines.map(it => (
                        <MedicineRow key={it.id} {...it} deleteMedicine={deleteMedicine} />
                    ))
                }
                <div className="add-medicine" onClick={this.addMedicine} >+</div>
                <AddMedicine isOpen={isOpenModalAdd} onClose={this.onCloseModalAdd} />
            </div>
        )
    }
}
