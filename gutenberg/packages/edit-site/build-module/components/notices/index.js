import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { SnackbarList } from '@wordpress/components';
export default function Notices() {
  var notices = useSelect(function (select) {
    return select('core/notices').getNotices().filter(function (notice) {
      return notice.type === 'snackbar';
    });
  }, []);

  var _useDispatch = useDispatch('core/notices'),
      removeNotice = _useDispatch.removeNotice;

  return createElement(SnackbarList, {
    className: "edit-site-notices",
    notices: notices,
    onRemove: removeNotice
  });
}
//# sourceMappingURL=index.js.map