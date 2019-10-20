import { connect } from 'react-redux';
import { IStore } from 'types';
import { IStoreMedicineList, IDispatchMedicineList } from './types';
import * as selectors from 'entities/medicine/selectors';
import * as actions from 'entities/medicine/actions';
import { MedicineList } from './component';

export const mapStateToProps = (store: IStore): IStoreMedicineList => ({
    medicineList: selectors.getMedicineList(store),
});

export const mapDispatchToProps: IDispatchMedicineList = {
    getMedicine: actions.getMedicine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicineList)
