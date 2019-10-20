import * as React from 'react';
import { Button, List } from 'antd';
import { IPropsMedicineList } from './types';
import { medicineRow } from 'components/medicine-row';

export class MedicineList extends React.PureComponent<IPropsMedicineList> {
    constructor(props: IPropsMedicineList) {
        super(props);

        props.getMedicine();
    }

    render(): JSX.Element {
        const { medicineList } = this.props;

        return (
            <div className="medicine-list" >
                <List
                    itemLayout="horizontal"
                    dataSource={medicineList}
                    renderItem={medicineRow}
                />
                <Button
                    className="medicine-list__add-medicine"
                    type="primary"
                >
                    +
                </Button>
            </div>
        )
    }
}
