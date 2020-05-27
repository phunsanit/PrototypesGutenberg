import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import InserterMenu from './menu';

function InserterLibrary(_ref) {
  var rootClientId = _ref.rootClientId,
      clientId = _ref.clientId,
      isAppender = _ref.isAppender,
      showInserterHelpPanel = _ref.showInserterHelpPanel,
      selectBlockOnInsert = _ref.__experimentalSelectBlockOnInsert,
      _ref$onSelect = _ref.onSelect,
      onSelect = _ref$onSelect === void 0 ? noop : _ref$onSelect;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getBlockRootClientId = _select.getBlockRootClientId;

    rootClientId = rootClientId || getBlockRootClientId(clientId) || undefined;
    return {
      rootClientId: rootClientId
    };
  }),
      destinationRootClientId = _useSelect.destinationRootClientId;

  return createElement(InserterMenu, {
    onSelect: onSelect,
    rootClientId: destinationRootClientId,
    clientId: clientId,
    isAppender: isAppender,
    showInserterHelpPanel: showInserterHelpPanel,
    __experimentalSelectBlockOnInsert: selectBlockOnInsert
  });
}

export default InserterLibrary;
//# sourceMappingURL=library.js.map