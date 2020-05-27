"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
function CopyContentMenuItem(_ref) {
  var createNotice = _ref.createNotice,
      editedPostContent = _ref.editedPostContent;
  var ref = (0, _element.useRef)();
  var hasCopied = (0, _compose.useCopyOnClick)(ref, editedPostContent);
  (0, _element.useEffect)(function () {
    if (!hasCopied) {
      return;
    }

    createNotice('info', (0, _i18n.__)('All content copied.'), {
      isDismissible: true,
      type: 'snackbar'
    });
  }, [hasCopied]);
  return (0, _element.createElement)(_components.MenuItem, {
    ref: ref
  }, hasCopied ? (0, _i18n.__)('Copied!') : (0, _i18n.__)('Copy all content'));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    editedPostContent: select('core/editor').getEditedPostAttribute('content')
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/notices'),
      createNotice = _dispatch.createNotice;

  return {
    createNotice: createNotice
  };
}), (0, _compose.ifCondition)(function (_ref2) {
  var editedPostContent = _ref2.editedPostContent;
  return editedPostContent.length > 0;
}))(CopyContentMenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map