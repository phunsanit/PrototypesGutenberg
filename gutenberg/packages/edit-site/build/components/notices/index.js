"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Notices;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
function Notices() {
  var notices = (0, _data.useSelect)(function (select) {
    return select('core/notices').getNotices().filter(function (notice) {
      return notice.type === 'snackbar';
    });
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core/notices'),
      removeNotice = _useDispatch.removeNotice;

  return (0, _element.createElement)(_components.SnackbarList, {
    className: "edit-site-notices",
    notices: notices,
    onRemove: removeNotice
  });
}
//# sourceMappingURL=index.js.map