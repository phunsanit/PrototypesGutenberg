import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Slot, Fill } from '@wordpress/components';

function PinnedItems(_ref) {
  var scope = _ref.scope,
      props = _objectWithoutProperties(_ref, ["scope"]);

  return createElement(Fill, _extends({
    name: "PinnedItems/".concat(scope)
  }, props));
}

function PinnedItemsSlot(_ref2) {
  var scope = _ref2.scope,
      className = _ref2.className,
      props = _objectWithoutProperties(_ref2, ["scope", "className"]);

  return createElement(Slot, _extends({
    name: "PinnedItems/".concat(scope)
  }, props), function (fills) {
    return !isEmpty(fills) && createElement("div", {
      className: classnames(className, 'interface-pinned-items')
    }, fills);
  });
}

PinnedItems.Slot = PinnedItemsSlot;
export default PinnedItems;
//# sourceMappingURL=index.js.map