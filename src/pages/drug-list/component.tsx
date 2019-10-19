import * as React from 'react';
import { List } from 'antd';
import { ITEM_LAYOUT } from './constants';
import { IPropsDrugList } from './types';
import { drugRow } from 'components/drug-row';

export class DrugList extends React.PureComponent<IPropsDrugList> {
    constructor(props: IPropsDrugList) {
        super(props);

        props.getDrugs();
    }

    render(): JSX.Element {
        const { drugs } = this.props;

        return (
            <List
                itemLayout={ITEM_LAYOUT}
                dataSource={drugs}
                renderItem={drugRow}
            />
        )
    }
}
