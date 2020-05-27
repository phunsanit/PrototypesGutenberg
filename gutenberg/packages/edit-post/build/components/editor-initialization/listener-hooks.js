"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdatePostLinkListener = exports.useBlockSelectionListener = void 0;

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

var _constants = require("../../store/constants");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * This listener hook monitors for block selection and triggers the appropriate
 * sidebar state.
 *
 * @param {number} postId  The current post id.
 */
var useBlockSelectionListener = function useBlockSelectionListener(postId) {
  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      hasBlockSelection: !!select('core/block-editor').getBlockSelectionStart(),
      isEditorSidebarOpened: select(_constants.STORE_KEY).isEditorSidebarOpened()
    };
  }, [postId]),
      hasBlockSelection = _useSelect.hasBlockSelection,
      isEditorSidebarOpened = _useSelect.isEditorSidebarOpened;

  var _useDispatch = (0, _data.useDispatch)(_constants.STORE_KEY),
      openGeneralSidebar = _useDispatch.openGeneralSidebar;

  (0, _element.useEffect)(function () {
    if (!isEditorSidebarOpened) {
      return;
    }

    if (hasBlockSelection) {
      openGeneralSidebar('edit-post/block');
    } else {
      openGeneralSidebar('edit-post/document');
    }
  }, [hasBlockSelection, isEditorSidebarOpened]);
};
/**
 * This listener hook monitors any change in permalink and updates the view
 * post link in the admin bar.
 *
 * @param {number} postId
 */


exports.useBlockSelectionListener = useBlockSelectionListener;

var useUpdatePostLinkListener = function useUpdatePostLinkListener(postId) {
  var _useSelect2 = (0, _data.useSelect)(function (select) {
    return {
      newPermalink: select('core/editor').getCurrentPost().link
    };
  }, [postId]),
      newPermalink = _useSelect2.newPermalink;

  var nodeToUpdate = (0, _element.useRef)();
  (0, _element.useEffect)(function () {
    nodeToUpdate.current = document.querySelector(_constants.VIEW_AS_PREVIEW_LINK_SELECTOR) || document.querySelector(_constants.VIEW_AS_LINK_SELECTOR);
  }, [postId]);
  (0, _element.useEffect)(function () {
    if (!newPermalink || !nodeToUpdate.current) {
      return;
    }

    nodeToUpdate.current.setAttribute('href', newPermalink);
  }, [newPermalink]);
};

exports.useUpdatePostLinkListener = useUpdatePostLinkListener;
//# sourceMappingURL=listener-hooks.js.map