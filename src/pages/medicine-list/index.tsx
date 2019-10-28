import { connect } from 'react-redux';
import { IStore } from 'types';
import { IStoreMedicineList, IDispatchMedicineList } from './types';
import * as selectors from 'entities/medicines/selectors';
import * as actions from 'entities/medicines/actions';
import { MedicineList } from './component';

export const mapStateToProps = (store: IStore): IStoreMedicineList => ({
    medicines: selectors.getMedicines(store),
});

export const mapDispatchToProps: IDispatchMedicineList = {
    getMedicines: actions.getMedicines,
    addMedicine: actions.addMedicine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicineList)
