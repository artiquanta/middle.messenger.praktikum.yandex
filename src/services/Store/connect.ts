import Store, { StoreEvents } from './Store';
import Block from '../Block';
import isEqual from '../../utils/isEqual';
import { Indexed } from '../../types/types';

function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  return class extends Component {
    constructor(props: Indexed) {
      let state = mapStateToProps(Store.getState());

      super({ ...props, ...state });

      // Если есть изменения в пропсах - обновить компонент
      Store.on(StoreEvents.UPDATED, () => {
        const newState = mapStateToProps(Store.getState());
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        state = newState;
      });
    }
  };
}

export default connect;
