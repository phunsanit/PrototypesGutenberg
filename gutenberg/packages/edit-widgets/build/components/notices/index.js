"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function Notices() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      notices: select('core/notices').getNotices()
    };
  }, []),
      notices = _useSelect.notices;

  var snackbarNotices = (0, _lodash.filter)(notices, {
    type: 'snackbar'
  });

  var _useDispatch = (0, _data.useDispatch)('core/notices'),
      removeNotice = _useDispatch.removeNotice;

  return (0, _element.createElement)(_components.SnackbarList, {
    notices: snackbarNotices,
    className: "edit-widgets-notices__snackbar",
    onRemove: removeNotice
  });
}

var _default = Notices;
exports.default = _default;
//# sourceMappingURL=index.js.map