import * as React from 'react';
import { IMedicine } from 'entities/medicine/types';
import { Button } from 'antd';

export const medicineRow = (item: IMedicine) => (
    <div className="medicine-row" >
        <span className="medicine-row__code" >Code: { item.code }</span>
        <span className="medicine-row__name" >Name: { item.name }</span>
        <span className="medicine-row__price" >Price: { item.price }</span>
        <Button className="medicine-row__edit" type="primary" >Edit</Button>
        <Button className="medicine-row__delete" type="danger">Delete</Button>
    </div>
);
