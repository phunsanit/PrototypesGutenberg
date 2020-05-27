import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Notice } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
export var DownloadableBlockNotice = function DownloadableBlockNotice(_ref) {
  var block = _ref.block,
      _onClick = _ref.onClick;
  var errorNotice = useSelect(function (select) {
    return select('core/block-directory').getErrorNoticeForBlock(block.id);
  }, [block]);

  if (!errorNotice) {
    return null;
  }

  return createElement(Notice, {
    status: "error",
    isDismissible: false,
    className: "block-directory-downloadable-block-notice"
  }, createElement("div", {
    className: "block-directory-downloadable-block-notice__content"
  }, errorNotice), createElement(Button, {
    isSmall: true,
    isPrimary: true,
    onClick: function onClick() {
      _onClick(block);
    }
  }, __('Retry')));
};
export default DownloadableBlockNotice;
//# sourceMappingURL=index.js.map