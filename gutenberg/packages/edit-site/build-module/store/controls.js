import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * WordPress dependencies
 */
import { createRegistryControl } from '@wordpress/data';
var controls = {
  SELECT: createRegistryControl(function (registry) {
    return function (_ref) {
      var _registry$select;

      var storeName = _ref.storeName,
          selectorName = _ref.selectorName,
          args = _ref.args;
      return (_registry$select = registry.select(storeName))[selectorName].apply(_registry$select, _toConsumableArray(args));
    };
  })
};
export default controls;
//# sourceMappingURL=controls.js.map