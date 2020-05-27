"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EditNavigationNotices;

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
function EditNavigationNotices() {
  var _useDispatch = (0, _data.useDispatch)('core/notices'),
      removeNotice = _useDispatch.removeNotice;

  var notices = (0, _data.useSelect)(function (select) {
    return select('core/notices').getNotices();
  }, []);
  var dismissibleNotices = (0, _lodash.filter)(notices, {
    isDismissible: true,
    type: 'default'
  });
  var nonDismissibleNotices = (0, _lodash.filter)(notices, {
    isDismissible: false,
    type: 'default'
  });
  var snackbarNotices = (0, _lodash.filter)(notices, {
    type: 'snackbar'
  });
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.NoticeList, {
    notices: nonDismissibleNotices,
    className: "edit-navigation-notices__notice-list"
  }), (0, _element.createElement)(_components.NoticeList, {
    notices: dismissibleNotices,
    className: "edit-navigation-notices__notice-list",
    onRemove: removeNotice
  }), (0, _element.createElement)(_components.SnackbarList, {
    notices: snackbarNotices,
    className: "edit-navigation-notices__snackbar-list",
    onRemove: removeNotice
  }));
}
//# sourceMappingURL=index.js.map