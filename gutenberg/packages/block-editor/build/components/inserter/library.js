"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _menu = _interopRequireDefault(require("./menu"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function InserterLibrary(_ref) {
  var rootClientId = _ref.rootClientId,
      clientId = _ref.clientId,
      isAppender = _ref.isAppender,
      showInserterHelpPanel = _ref.showInserterHelpPanel,
      selectBlockOnInsert = _ref.__experimentalSelectBlockOnInsert,
      _ref$onSelect = _ref.onSelect,
      onSelect = _ref$onSelect === void 0 ? _lodash.noop : _ref$onSelect;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlockRootClientId = _select.getBlockRootClientId;

    rootClientId = rootClientId || getBlockRootClientId(clientId) || undefined;
    return {
      rootClientId: rootClientId
    };
  }),
      destinationRootClientId = _useSelect.destinationRootClientId;

  return (0, _element.createElement)(_menu.default, {
    onSelect: onSelect,
    rootClientId: destinationRootClientId,
    clientId: clientId,
    isAppender: isAppender,
    showInserterHelpPanel: showInserterHelpPanel,
    __experimentalSelectBlockOnInsert: selectBlockOnInsert
  });
}

var _default = InserterLibrary;
exports.default = _default;
//# sourceMappingURL=library.js.map