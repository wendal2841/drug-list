import * as React from 'react';
import { IPropsMedicineList, IStateMedicineList } from './types';
import { MedicineRow } from 'components/medicine-row';
import { AddMedicine } from 'components/add-medicine';

export class MedicineList extends React.PureComponent<IPropsMedicineList, IStateMedicineList> {
    state: IStateMedicineList = { isOpenModalAdd: false };

    constructor(props: IPropsMedicineList) {
        super(props);

        props.getMedicine();
    }

    addMedicine = (): void => this.setState({ isOpenModalAdd: true });
    onCloseModalAdd = (): void => this.setState({ isOpenModalAdd: false });

    render(): JSX.Element {
        const { medicineList } = this.props;
        const { isOpenModalAdd } = this.state;

        return (
            <div className="medicine-list" >
                {
                    medicineList.map(it => (
                        <MedicineRow key={it.code} {...it} />
                    ))
                }
                <div className="add-medicine" onClick={this.addMedicine} >+</div>
                <AddMedicine isOpen={isOpenModalAdd} onClose={this.onCloseModalAdd} />
            </div>
        )
    }
}
