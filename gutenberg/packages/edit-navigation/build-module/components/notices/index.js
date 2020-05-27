import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter } from 'lodash';
/**
 * WordPress dependencies
 */

import { NoticeList, SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
export default function EditNavigationNotices() {
  var _useDispatch = useDispatch('core/notices'),
      removeNotice = _useDispatch.removeNotice;

  var notices = useSelect(function (select) {
    return select('core/notices').getNotices();
  }, []);
  var dismissibleNotices = filter(notices, {
    isDismissible: true,
    type: 'default'
  });
  var nonDismissibleNotices = filter(notices, {
    isDismissible: false,
    type: 'default'
  });
  var snackbarNotices = filter(notices, {
    type: 'snackbar'
  });
  return createElement(Fragment, null, createElement(NoticeList, {
    notices: nonDismissibleNotices,
    className: "edit-navigation-notices__notice-list"
  }), createElement(NoticeList, {
    notices: dismissibleNotices,
    className: "edit-navigation-notices__notice-list",
    onRemove: removeNotice
  }), createElement(SnackbarList, {
    notices: snackbarNotices,
    className: "edit-navigation-notices__snackbar-list",
    onRemove: removeNotice
  }));
}
//# sourceMappingURL=index.js.map