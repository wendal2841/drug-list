import * as React from 'react';
import { IPropsMedicineList, IStateMedicineList } from './types';
import { MedicineRow } from 'components/medicine-row';
import { AddMedicine } from 'components/add-medicine';
import { IMedicine } from 'entities/medicines/types';

export class MedicineList extends React.PureComponent<IPropsMedicineList, IStateMedicineList> {
    state: IStateMedicineList = { isOpenModalAdd: false };

    constructor(props: IPropsMedicineList) {
        super(props);

        props.getMedicines();
    }

    addMedicine = (): void => this.setState({ isOpenModalAdd: true });
    onEditMedicine = (selectedMedicine: IMedicine): void => this.setState({
        isOpenModalAdd: true,
        selectedMedicine,
    });

    onCloseModalAdd = (): void => this.setState({
        isOpenModalAdd: false,
        selectedMedicine: undefined
    });

    render(): JSX.Element {
        const { medicines, deleteMedicine, addMedicine, editMedicine } = this.props;
        const { isOpenModalAdd, selectedMedicine } = this.state;

        return (
            <div className="medicine-list" >
                {
                    medicines.map(it => (
                        <MedicineRow
                            key={it.id}
                            medicine={it}
                            editMedicine={this.onEditMedicine}
                            deleteMedicine={deleteMedicine}
                        />
                    ))
                }
                <div className="add-medicine" onClick={this.addMedicine} >+</div>
                <AddMedicine
                    isOpen={isOpenModalAdd}
                    medicine={selectedMedicine}
                    addMedicine={addMedicine}
                    editMedicine={editMedicine}
                    onClose={this.onCloseModalAdd}
                />
            </div>
        )
    }
}
