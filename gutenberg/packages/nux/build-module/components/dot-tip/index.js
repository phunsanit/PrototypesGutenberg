import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { Popover, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { useCallback, useRef } from '@wordpress/element';
import { close } from '@wordpress/icons';

function onClick(event) {
  // Tips are often nested within buttons. We stop propagation so that clicking
  // on a tip doesn't result in the button being clicked.
  event.stopPropagation();
}

export function DotTip(_ref) {
  var _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'middle right' : _ref$position,
      children = _ref.children,
      isVisible = _ref.isVisible,
      hasNextTip = _ref.hasNextTip,
      onDismiss = _ref.onDismiss,
      onDisable = _ref.onDisable;
  var anchorParent = useRef(null);
  var onFocusOutsideCallback = useCallback(function (event) {
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

  return createElement(Popover, {
    className: "nux-dot-tip",
    position: position,
    noArrow: true,
    focusOnMount: "container",
    shouldAnchorIncludePadding: true,
    role: "dialog",
    "aria-label": __('Editor tips'),
    onClick: onClick,
    onFocusOutside: onFocusOutsideCallback
  }, createElement("p", null, children), createElement("p", null, createElement(Button, {
    isLink: true,
    onClick: onDismiss
  }, hasNextTip ? __('See next tip') : __('Got it'))), createElement(Button, {
    className: "nux-dot-tip__disable",
    icon: close,
    label: __('Disable tips'),
    onClick: onDisable
  }));
}
export default compose(withSelect(function (select, _ref2) {
  var tipId = _ref2.tipId;

  var _select = select('core/nux'),
      isTipVisible = _select.isTipVisible,
      getAssociatedGuide = _select.getAssociatedGuide;

  var associatedGuide = getAssociatedGuide(tipId);
  return {
    isVisible: isTipVisible(tipId),
    hasNextTip: !!(associatedGuide && associatedGuide.nextTipId)
  };
}), withDispatch(function (dispatch, _ref3) {
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
//# sourceMappingURL=index.js.map