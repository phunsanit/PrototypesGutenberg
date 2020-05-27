"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var editIcon = (0, _element.createElement)(_components.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0, _element.createElement)(_components.Path, {
  d: "M20.1 5.1L16.9 2 6.2 12.7l-1.3 4.4 4.5-1.3L20.1 5.1zM4 20.8h8v-1.5H4v1.5z"
}));
var selectIcon = (0, _element.createElement)(_components.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0, _element.createElement)(_components.Path, {
  d: "M9.4 20.5L5.2 3.8l14.6 9-2 .3c-.2 0-.4.1-.7.1-.9.2-1.6.3-2.2.5-.8.3-1.4.5-1.8.8-.4.3-.8.8-1.3 1.5-.4.5-.8 1.2-1.2 2l-.3.6-.9 1.9zM7.6 7.1l2.4 9.3c.2-.4.5-.8.7-1.1.6-.8 1.1-1.4 1.6-1.8.5-.4 1.3-.8 2.2-1.1l1.2-.3-8.1-5z"
}));

function ToolSelector() {
  var isNavigationTool = (0, _data.useSelect)(function (select) {
    return select('core/block-editor').isNavigationMode();
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      setNavigationMode = _useDispatch.setNavigationMode;

  var isMediumViewport = (0, _compose.useViewportMatch)('medium');

  if (!isMediumViewport) {
    return null;
  }

  var onSwitchMode = function onSwitchMode(mode) {
    setNavigationMode(mode === 'edit' ? false : true);
  };

  return (0, _element.createElement)(_components.Dropdown, {
    renderToggle: function renderToggle(_ref) {
      var isOpen = _ref.isOpen,
          onToggle = _ref.onToggle;
      return (0, _element.createElement)(_components.Button, {
        icon: isNavigationTool ? selectIcon : editIcon,
        "aria-expanded": isOpen,
        onClick: onToggle,
        label: (0, _i18n.__)('Tools')
      });
    },
    position: "bottom right",
    renderContent: function renderContent() {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.NavigableMenu, {
        role: "menu",
        "aria-label": (0, _i18n.__)('Tools')
      }, (0, _element.createElement)(_components.MenuItemsChoice, {
        value: isNavigationTool ? 'select' : 'edit',
        onSelect: onSwitchMode,
        choices: [{
          value: 'edit',
          label: (0, _element.createElement)(_element.Fragment, null, editIcon, (0, _i18n.__)('Edit'))
        }, {
          value: 'select',
          label: (0, _element.createElement)(_element.Fragment, null, selectIcon, (0, _i18n.__)('Select'))
        }]
      })), (0, _element.createElement)("div", {
        className: "block-editor-tool-selector__help"
      }, (0, _i18n.__)('Tools offer different interactions for block selection & editing. To select, press Escape, to go back to editing, press Enter.')));
    }
  });
}

var _default = ToolSelector;
exports.default = _default;
//# sourceMappingURL=index.js.map