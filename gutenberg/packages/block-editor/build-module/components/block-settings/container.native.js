import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { BottomSheet, BottomSheetConsumer, ColorSettings, colorsUtils } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { InspectorControls, SETTINGS_DEFAULTS as defaultSettings } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import styles from './container.native.scss';

function BottomSheetSettings(_ref) {
  var editorSidebarOpened = _ref.editorSidebarOpened,
      closeGeneralSidebar = _ref.closeGeneralSidebar,
      props = _objectWithoutProperties(_ref, ["editorSidebarOpened", "closeGeneralSidebar"]);

  return createElement(BottomSheet, _extends({
    isVisible: editorSidebarOpened,
    onClose: closeGeneralSidebar,
    hideHeader: true,
    contentStyle: styles.content
  }, props), createElement(BottomSheetConsumer, null, function (_ref2) {
    var currentScreen = _ref2.currentScreen,
        extraProps = _ref2.extraProps,
        bottomSheetProps = _objectWithoutProperties(_ref2, ["currentScreen", "extraProps"]);

    switch (currentScreen) {
      case colorsUtils.subsheets.color:
        return createElement(ColorSettings, _extends({
          defaultSettings: defaultSettings
        }, bottomSheetProps, extraProps));

      case colorsUtils.subsheets.settings:
      default:
        return createElement(InspectorControls.Slot, null);
    }
  }));
}

export default compose([withSelect(function (select) {
  var _select = select('core/edit-post'),
      isEditorSidebarOpened = _select.isEditorSidebarOpened;

  return {
    editorSidebarOpened: isEditorSidebarOpened()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      closeGeneralSidebar = _dispatch.closeGeneralSidebar;

  return {
    closeGeneralSidebar: closeGeneralSidebar
  };
})])(BottomSheetSettings);
//# sourceMappingURL=container.native.js.map