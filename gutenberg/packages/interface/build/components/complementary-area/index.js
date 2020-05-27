"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _plugins = require("@wordpress/plugins");

var _icons = require("@wordpress/icons");

var _complementaryAreaHeader = _interopRequireDefault(require("../complementary-area-header"));

var _pinnedItems = _interopRequireDefault(require("../pinned-items"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ComplementaryAreaSlot(_ref) {
  var scope = _ref.scope,
      props = (0, _objectWithoutProperties2.default)(_ref, ["scope"]);
  return (0, _element.createElement)(_components.Slot, (0, _extends2.default)({
    name: "ComplementaryArea/".concat(scope)
  }, props));
}

function ComplementaryAreaFill(_ref2) {
  var scope = _ref2.scope,
      children = _ref2.children,
      className = _ref2.className;
  return (0, _element.createElement)(_components.Fill, {
    name: "ComplementaryArea/".concat(scope)
  }, (0, _element.createElement)(_components.Animate, {
    type: "slide-in",
    options: {
      origin: 'left'
    }
  }, function () {
    return (0, _element.createElement)("div", {
      className: className
    }, children);
  }));
}

function useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall) {
  var previousIsSmall = (0, _element.useRef)(false);
  var shouldOpenWhenNotSmall = (0, _element.useRef)(false);

  var _useDispatch = (0, _data.useDispatch)('core/interface'),
      enableComplementaryArea = _useDispatch.enableComplementaryArea,
      disableComplementaryArea = _useDispatch.disableComplementaryArea;

  (0, _element.useEffect)(function () {
    // If the complementary area is active and the editor is switching from a big to a small window size.
    if (isActive && isSmall && !previousIsSmall.current) {
      // Disable the complementary area.
      disableComplementaryArea(scope); // Flag the complementary area to be reopened when the window size goes from small to big.

      shouldOpenWhenNotSmall.current = true;
    } else if ( // If there is a flag indicating the complementary area should be enabled when we go from small to big window size
    // and we are going from a small to big window size.
    shouldOpenWhenNotSmall.current && !isSmall && previousIsSmall.current) {
      // Remove the flag indicating the complementary area should be enabled.
      shouldOpenWhenNotSmall.current = false; // Enable the complementary area.

      enableComplementaryArea(scope, identifier);
    } else if ( // If the flag is indicating the current complementary should be reopened but another complementary area becomes active,
    // remove the flag.
    shouldOpenWhenNotSmall.current && activeArea && activeArea !== identifier) {
      shouldOpenWhenNotSmall.current = false;
    }

    if (isSmall !== previousIsSmall.current) {
      previousIsSmall.current = isSmall;
    }
  }, [isActive, isSmall, scope, identifier, activeArea]);
}

function ComplementaryArea(_ref3) {
  var children = _ref3.children,
      className = _ref3.className,
      _ref3$closeLabel = _ref3.closeLabel,
      closeLabel = _ref3$closeLabel === void 0 ? (0, _i18n.__)('Close plugin') : _ref3$closeLabel,
      identifier = _ref3.identifier,
      header = _ref3.header,
      headerClassName = _ref3.headerClassName,
      icon = _ref3.icon,
      _ref3$isPinnable = _ref3.isPinnable,
      isPinnable = _ref3$isPinnable === void 0 ? true : _ref3$isPinnable,
      panelClassName = _ref3.panelClassName,
      scope = _ref3.scope,
      smallScreenTitle = _ref3.smallScreenTitle,
      title = _ref3.title,
      toggleShortcut = _ref3.toggleShortcut;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/interface'),
        getActiveComplementaryArea = _select.getActiveComplementaryArea,
        isItemPinned = _select.isItemPinned;

    var _activeArea = getActiveComplementaryArea(scope);

    return {
      isActive: _activeArea === identifier,
      isPinned: isItemPinned(scope, identifier),
      activeArea: _activeArea,
      isSmall: select('core/viewport').isViewportMatch('< medium')
    };
  }, [identifier, scope]),
      isActive = _useSelect.isActive,
      isPinned = _useSelect.isPinned,
      activeArea = _useSelect.activeArea,
      isSmall = _useSelect.isSmall;

  useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall);

  var _useDispatch2 = (0, _data.useDispatch)('core/interface'),
      enableComplementaryArea = _useDispatch2.enableComplementaryArea,
      disableComplementaryArea = _useDispatch2.disableComplementaryArea;

  var _useDispatch3 = (0, _data.useDispatch)('core/interface'),
      pinItem = _useDispatch3.pinItem,
      unpinItem = _useDispatch3.unpinItem;

  return (0, _element.createElement)(_element.Fragment, null, isPinned && isPinnable && (0, _element.createElement)(_pinnedItems.default, {
    scope: scope
  }, (0, _element.createElement)(_components.Button, {
    icon: icon,
    label: title,
    onClick: function onClick() {
      return isActive ? disableComplementaryArea(scope) : enableComplementaryArea(scope, identifier);
    },
    isPressed: isActive,
    "aria-expanded": isActive,
    shortcut: toggleShortcut
  })), isActive && (0, _element.createElement)(ComplementaryAreaFill, {
    className: (0, _classnames.default)('interface-complementary-area', className),
    scope: scope
  }, (0, _element.createElement)(_complementaryAreaHeader.default, {
    className: headerClassName,
    closeLabel: closeLabel,
    onClose: function onClose() {
      return disableComplementaryArea(scope);
    },
    smallScreenTitle: smallScreenTitle,
    toggleShortcut: toggleShortcut
  }, header || (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("strong", null, title), isPinnable && (0, _element.createElement)(_components.Button, {
    className: "interface-complementary-area__pin-unpin-item",
    icon: isPinned ? _icons.starFilled : _icons.starEmpty,
    label: isPinned ? (0, _i18n.__)('Unpin from toolbar') : (0, _i18n.__)('Pin to toolbar'),
    onClick: function onClick() {
      return (isPinned ? unpinItem : pinItem)(scope, identifier);
    },
    isPressed: isPinned,
    "aria-expanded": isPinned
  }))), (0, _element.createElement)(_components.Panel, {
    className: panelClassName
  }, children)));
}

var ComplementaryAreaWrapped = (0, _plugins.withPluginContext)(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    identifier: ownProps.identifier || "".concat(context.name, "/").concat(ownProps.name)
  };
})(ComplementaryArea);
ComplementaryAreaWrapped.Slot = ComplementaryAreaSlot;
var _default = ComplementaryAreaWrapped;
exports.default = _default;
//# sourceMappingURL=index.js.map