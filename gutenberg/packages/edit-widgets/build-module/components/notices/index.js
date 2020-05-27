import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter } from 'lodash';
/**
 * WordPress dependencies
 */

import { SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

function Notices() {
  var _useSelect = useSelect(function (select) {
    return {
      notices: select('core/notices').getNotices()
    };
  }, []),
      notices = _useSelect.notices;

  var snackbarNotices = filter(notices, {
    type: 'snackbar'
  });

  var _useDispatch = useDispatch('core/notices'),
      removeNotice = _useDispatch.removeNotice;

  return createElement(SnackbarList, {
    notices: snackbarNotices,
    className: "edit-widgets-notices__snackbar",
    onRemove: removeNotice
  });
}

export default Notices;
//# sourceMappingURL=index.js.map