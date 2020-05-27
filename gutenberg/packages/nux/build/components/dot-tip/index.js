"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotTip = DotTip;
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function onClick(event) {
  // Tips are often nested within buttons. We stop propagation so that clicking
  // on a tip doesn't result in the button being clicked.
  event.stopPropagation();
}

function DotTip(_ref) {
  var _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'middle right' : _ref$position,
      children = _ref.children,
      isVisible = _ref.isVisible,
      hasNextTip = _ref.hasNextTip,
      onDismiss = _ref.onDismiss,
      onDisable = _ref.onDisable;
  var anchorParent = (0, _element.useRef)(null);
  var onFocusOutsideCallback = (0, _element.useCallback)(function (event) {
    if (!anchorParent.current) {
      return;
    }

    if (anchorParent.current.contains(event.relatedTarget)) {
      return;
    }

    onDisable();
  }, [onDisable, anchorParent]);

  if (!isVisible) {
    return null;
  }

  return (0, _element.createElement)(_components.Popover, {
    className: "nux-dot-tip",
    position: position,
    noArrow: true,
    focusOnMount: "container",
    shouldAnchorIncludePadding: true,
    role: "dialog",
    "aria-label": (0, _i18n.__)('Editor tips'),
    onClick: onClick,
    onFocusOutside: onFocusOutsideCallback
  }, (0, _element.createElement)("p", null, children), (0, _element.createElement)("p", null, (0, _element.createElement)(_components.Button, {
    isLink: true,
    onClick: onDismiss
  }, hasNextTip ? (0, _i18n.__)('See next tip') : (0, _i18n.__)('Got it'))), (0, _element.createElement)(_components.Button, {
    className: "nux-dot-tip__disable",
    icon: _icons.close,
    label: (0, _i18n.__)('Disable tips'),
    onClick: onDisable
  }));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
  var tipId = _ref2.tipId;

  var _select = select('core/nux'),
      isTipVisible = _select.isTipVisible,
      getAssociatedGuide = _select.getAssociatedGuide;

  var associatedGuide = getAssociatedGuide(tipId);
  return {
    isVisible: isTipVisible(tipId),
    hasNextTip: !!(associatedGuide && associatedGuide.nextTipId)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var tipId = _ref3.tipId;

  var _dispatch = dispatch('core/nux'),
      dismissTip = _dispatch.dismissTip,
      disableTips = _dispatch.disableTips;

  return {
    onDismiss: function onDismiss() {
      dismissTip(tipId);
    },
    onDisable: function onDisable() {
      disableTips();
    }
  };
}))(DotTip);

exports.default = _default;
//# sourceMappingURL=index.js.map