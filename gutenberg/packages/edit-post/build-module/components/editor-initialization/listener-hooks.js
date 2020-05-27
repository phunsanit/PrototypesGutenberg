/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { STORE_KEY, VIEW_AS_LINK_SELECTOR, VIEW_AS_PREVIEW_LINK_SELECTOR } from '../../store/constants';
/**
 * This listener hook monitors for block selection and triggers the appropriate
 * sidebar state.
 *
 * @param {number} postId  The current post id.
 */

export var useBlockSelectionListener = function useBlockSelectionListener(postId) {
  var _useSelect = useSelect(function (select) {
    return {
      hasBlockSelection: !!select('core/block-editor').getBlockSelectionStart(),
      isEditorSidebarOpened: select(STORE_KEY).isEditorSidebarOpened()
    };
  }, [postId]),
      hasBlockSelection = _useSelect.hasBlockSelection,
      isEditorSidebarOpened = _useSelect.isEditorSidebarOpened;

  var _useDispatch = useDispatch(STORE_KEY),
      openGeneralSidebar = _useDispatch.openGeneralSidebar;

  useEffect(function () {
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

export var useUpdatePostLinkListener = function useUpdatePostLinkListener(postId) {
  var _useSelect2 = useSelect(function (select) {
    return {
      newPermalink: select('core/editor').getCurrentPost().link
    };
  }, [postId]),
      newPermalink = _useSelect2.newPermalink;

  var nodeToUpdate = useRef();
  useEffect(function () {
    nodeToUpdate.current = document.querySelector(VIEW_AS_PREVIEW_LINK_SELECTOR) || document.querySelector(VIEW_AS_LINK_SELECTOR);
  }, [postId]);
  useEffect(function () {
    if (!newPermalink || !nodeToUpdate.current) {
      return;
    }

    nodeToUpdate.current.setAttribute('href', newPermalink);
  }, [newPermalink]);
};
//# sourceMappingURL=listener-hooks.js.map