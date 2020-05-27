import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Animate, Button, Panel, Slot, Fill } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { withPluginContext } from '@wordpress/plugins';
import { starEmpty, starFilled } from '@wordpress/icons';
import { useEffect, useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import ComplementaryAreaHeader from '../complementary-area-header';
import PinnedItems from '../pinned-items';

function ComplementaryAreaSlot(_ref) {
  var scope = _ref.scope,
      props = _objectWithoutProperties(_ref, ["scope"]);

  return createElement(Slot, _extends({
    name: "ComplementaryArea/".concat(scope)
  }, props));
}

function ComplementaryAreaFill(_ref2) {
  var scope = _ref2.scope,
      children = _ref2.children,
      className = _ref2.className;
  return createElement(Fill, {
    name: "ComplementaryArea/".concat(scope)
  }, createElement(Animate, {
    type: "slide-in",
    options: {
      origin: 'left'
    }
  }, function () {
    return createElement("div", {
      className: className
    }, children);
  }));
}

function useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall) {
  var previousIsSmall = useRef(false);
  var shouldOpenWhenNotSmall = useRef(false);

  var _useDispatch = useDispatch('core/interface'),
      enableComplementaryArea = _useDispatch.enableComplementaryArea,
      disableComplementaryArea = _useDispatch.disableComplementaryArea;

  useEffect(function () {
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
      closeLabel = _ref3$closeLabel === void 0 ? __('Close plugin') : _ref3$closeLabel,
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

  var _useSelect = useSelect(function (select) {
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

  var _useDispatch2 = useDispatch('core/interface'),
      enableComplementaryArea = _useDispatch2.enableComplementaryArea,
      disableComplementaryArea = _useDispatch2.disableComplementaryArea;

  var _useDispatch3 = useDispatch('core/interface'),
      pinItem = _useDispatch3.pinItem,
      unpinItem = _useDispatch3.unpinItem;

  return createElement(Fragment, null, isPinned && isPinnable && createElement(PinnedItems, {
    scope: scope
  }, createElement(Button, {
    icon: icon,
    label: title,
    onClick: function onClick() {
      return isActive ? disableComplementaryArea(scope) : enableComplementaryArea(scope, identifier);
    },
    isPressed: isActive,
    "aria-expanded": isActive,
    shortcut: toggleShortcut
  })), isActive && createElement(ComplementaryAreaFill, {
    className: classnames('interface-complementary-area', className),
    scope: scope
  }, createElement(ComplementaryAreaHeader, {
    className: headerClassName,
    closeLabel: closeLabel,
    onClose: function onClose() {
      return disableComplementaryArea(scope);
    },
    smallScreenTitle: smallScreenTitle,
    toggleShortcut: toggleShortcut
  }, header || createElement(Fragment, null, createElement("strong", null, title), isPinnable && createElement(Button, {
    className: "interface-complementary-area__pin-unpin-item",
    icon: isPinned ? starFilled : starEmpty,
    label: isPinned ? __('Unpin from toolbar') : __('Pin to toolbar'),
    onClick: function onClick() {
      return (isPinned ? unpinItem : pinItem)(scope, identifier);
    },
    isPressed: isPinned,
    "aria-expanded": isPinned
  }))), createElement(Panel, {
    className: panelClassName
  }, children)));
}

var ComplementaryAreaWrapped = withPluginContext(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    identifier: ownProps.identifier || "".concat(context.name, "/").concat(ownProps.name)
  };
})(ComplementaryArea);
ComplementaryAreaWrapped.Slot = ComplementaryAreaSlot;
export default ComplementaryAreaWrapped;
//# sourceMappingURL=index.js.map