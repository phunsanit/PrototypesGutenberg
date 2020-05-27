import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useCopyOnClick, compose, ifCondition } from '@wordpress/compose';
import { useRef, useEffect } from '@wordpress/element';

function CopyContentMenuItem(_ref) {
  var createNotice = _ref.createNotice,
      editedPostContent = _ref.editedPostContent;
  var ref = useRef();
  var hasCopied = useCopyOnClick(ref, editedPostContent);
  useEffect(function () {
    if (!hasCopied) {
      return;
    }

    createNotice('info', __('All content copied.'), {
      isDismissible: true,
      type: 'snackbar'
    });
  }, [hasCopied]);
  return createElement(MenuItem, {
    ref: ref
  }, hasCopied ? __('Copied!') : __('Copy all content'));
}

export default compose(withSelect(function (select) {
  return {
    editedPostContent: select('core/editor').getEditedPostAttribute('content')
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/notices'),
      createNotice = _dispatch.createNotice;

  return {
    createNotice: createNotice
  };
}), ifCondition(function (_ref2) {
  var editedPostContent = _ref2.editedPostContent;
  return editedPostContent.length > 0;
}))(CopyContentMenuItem);
//# sourceMappingURL=index.js.map