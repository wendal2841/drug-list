import * as React from 'react';
import { IMedicine } from 'entities/medicine/types';
import { Button } from 'antd';

export const MedicineRow: React.FC<IMedicine> = ({ code, name, price }): JSX.Element => (
    <div className="medicine-row" >
        <span className="medicine-row__code" >Code: { code }</span>
        <span className="medicine-row__name" >Name: { name }</span>
        <span className="medicine-row__price" >Price: { price }</span>
        <Button className="medicine-row__edit" type="primary" >Edit</Button>
        <Button className="medicine-row__delete" type="danger">Delete</Button>
    </div>
);
