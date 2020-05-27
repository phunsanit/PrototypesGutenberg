"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostSchedule = PostSchedule;
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostSchedule() {
  return (0, _element.createElement)(_editor.PostScheduleCheck, null, (0, _element.createElement)(_components.PanelRow, {
    className: "edit-post-post-schedule"
  }, (0, _element.createElement)("span", null, (0, _i18n.__)('Publish')), (0, _element.createElement)(_components.Dropdown, {
    position: "bottom left",
    contentClassName: "edit-post-post-schedule__dialog",
    renderToggle: function renderToggle(_ref) {
      var onToggle = _ref.onToggle,
          isOpen = _ref.isOpen;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
        className: "edit-post-post-schedule__toggle",
        onClick: onToggle,
        "aria-expanded": isOpen,
        isLink: true
      }, (0, _element.createElement)(_editor.PostScheduleLabel, null)));
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_editor.PostSchedule, null);
    }
  })));
}

var _default = PostSchedule;
exports.default = _default;
//# sourceMappingURL=index.js.map