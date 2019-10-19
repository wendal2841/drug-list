import { connect } from 'react-redux';
import { IStore } from 'types';
import { IStoreDrugList, IDispatchDrugList } from './types';
import * as selectors from 'entities/drug/selectors';
import * as actions from 'entities/drug/actions';
import { DrugList } from './component';

export const mapStateToProps = (store: IStore): IStoreDrugList => ({
    drugs: selectors.getDrugs(store),
});

export const mapDispatchToProps: IDispatchDrugList = {
    getDrugs: actions.getDrugs,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrugList)
