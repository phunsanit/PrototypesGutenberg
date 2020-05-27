import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, Dropdown, Button } from '@wordpress/components';
import { PostSchedule as PostScheduleForm, PostScheduleLabel, PostScheduleCheck } from '@wordpress/editor';
export function PostSchedule() {
  return createElement(PostScheduleCheck, null, createElement(PanelRow, {
    className: "edit-post-post-schedule"
  }, createElement("span", null, __('Publish')), createElement(Dropdown, {
    position: "bottom left",
    contentClassName: "edit-post-post-schedule__dialog",
    renderToggle: function renderToggle(_ref) {
      var onToggle = _ref.onToggle,
          isOpen = _ref.isOpen;
      return createElement(Fragment, null, createElement(Button, {
        className: "edit-post-post-schedule__toggle",
        onClick: onToggle,
        "aria-expanded": isOpen,
        isLink: true
      }, createElement(PostScheduleLabel, null)));
    },
    renderContent: function renderContent() {
      return createElement(PostScheduleForm, null);
    }
  })));
}
export default PostSchedule;
//# sourceMappingURL=index.js.map