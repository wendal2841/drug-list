import * as React from 'react';
import { Button } from 'antd';
import { IPropsMedicineRow } from './types';

export const MedicineRow = React.memo(({
    medicine,
    editMedicine,
    deleteMedicine,
}: IPropsMedicineRow) => {
    const { id, code, name, price } = medicine;
    const onEdit = (): void => editMedicine(medicine);
    const onDelete = (): void => deleteMedicine(id || '');

    return (
        <div className="medicine-row" onDoubleClick={onEdit} >
            <div className="medicine-row__content" >
                <div className="medicine-row__code" >Code: { code }</div>
                <div className="medicine-row__name" >Name: { name }</div>
                <div className="medicine-row__price" >Price: { price }</div>
            </div>
            <div className="medicine-row__buttons">
                <Button
                    className="medicine-row__edit"
                    type="primary"
                    onClick={onEdit}
                >
                    Edit
                </Button>
                <Button
                    className="medicine-row__delete"
                    type="danger"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
});
