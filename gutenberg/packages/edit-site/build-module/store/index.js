/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
/**
 * Internal dependencies
 */

import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import controls from './controls';
import { STORE_KEY } from './constants';
var store = registerStore(STORE_KEY, {
  reducer: reducer,
  actions: actions,
  selectors: selectors,
  controls: controls,
  persist: ['preferences']
});
export default store;
//# sourceMappingURL=index.js.map