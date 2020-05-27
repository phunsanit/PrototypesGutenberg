import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose, ifCondition } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import PostVisibility from '../post-visibility';
import PostTrash from '../post-trash';
import PostSchedule from '../post-schedule';
import PostSticky from '../post-sticky';
import PostAuthor from '../post-author';
import PostSlug from '../post-slug';
import PostFormat from '../post-format';
import PostPendingStatus from '../post-pending-status';
import PluginPostStatusInfo from '../plugin-post-status-info';
/**
 * Module Constants
 */

var PANEL_NAME = 'post-status';

function PostStatus(_ref) {
  var isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel;
  return createElement(PanelBody, {
    className: "edit-post-post-status",
    title: __('Status & visibility'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, createElement(PluginPostStatusInfo.Slot, null, function (fills) {
    return createElement(Fragment, null, createElement(PostVisibility, null), createElement(PostSchedule, null), createElement(PostFormat, null), createElement(PostSticky, null), createElement(PostPendingStatus, null), createElement(PostSlug, null), createElement(PostAuthor, null), fills, createElement(PostTrash, null));
  }));
}

export default compose([withSelect(function (select) {
  // We use isEditorPanelRemoved to hide the panel if it was programatically removed. We do
  // not use isEditorPanelEnabled since this panel should not be disabled through the UI.
  var _select = select('core/edit-post'),
      isEditorPanelRemoved = _select.isEditorPanelRemoved,
      isEditorPanelOpened = _select.isEditorPanelOpened;

  return {
    isRemoved: isEditorPanelRemoved(PANEL_NAME),
    isOpened: isEditorPanelOpened(PANEL_NAME)
  };
}), ifCondition(function (_ref2) {
  var isRemoved = _ref2.isRemoved;
  return !isRemoved;
}), withDispatch(function (dispatch) {
  return {
    onTogglePanel: function onTogglePanel() {
      return dispatch('core/edit-post').toggleEditorPanelOpened(PANEL_NAME);
    }
  };
})])(PostStatus);
//# sourceMappingURL=index.js.map