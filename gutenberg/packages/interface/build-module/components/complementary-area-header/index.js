import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { close } from '@wordpress/icons';

var ComplementaryAreaHeader = function ComplementaryAreaHeader(_ref) {
  var smallScreenTitle = _ref.smallScreenTitle,
      toggleShortcut = _ref.toggleShortcut,
      onClose = _ref.onClose,
      children = _ref.children,
      className = _ref.className,
      closeLabel = _ref.closeLabel;
  return createElement(Fragment, null, createElement("div", {
    className: "components-panel__header interface-complementary-area-header__small"
  }, smallScreenTitle && createElement("span", {
    className: "interface-complementary-area-header__small-title"
  }, smallScreenTitle), createElement(Button, {
    onClick: onClose,
    icon: close,
    label: closeLabel
  })), createElement("div", {
    className: classnames('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1
  }, children, createElement(Button, {
    onClick: onClose,
    icon: close,
    label: closeLabel,
    shortcut: toggleShortcut
  })));
};

export default ComplementaryAreaHeader;
//# sourceMappingURL=index.js.map