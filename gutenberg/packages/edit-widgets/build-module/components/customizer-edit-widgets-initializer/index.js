import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { navigateRegions } from '@wordpress/components';
import { useSimulatedMediaQuery } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { ComplementaryArea } from '@wordpress/interface';
/**
 * Internal dependencies
 */

import './sync-customizer';
import Header from '../header';
import Sidebar from '../sidebar';
import WidgetAreasBlockEditorProvider from '../widget-areas-block-editor-provider';
import WidgetAreasBlockEditorContent from '../widget-areas-block-editor-content';

function CustomizerEditWidgetsInitializer(_ref) {
  var settings = _ref.settings;
  useSimulatedMediaQuery('resizable-editor-section', 360);
  var blockEditorSettings = useMemo(function () {
    return _objectSpread({}, settings, {
      hasFixedToolbar: true
    });
  }, [settings]);
  return createElement(WidgetAreasBlockEditorProvider, {
    blockEditorSettings: blockEditorSettings
  }, createElement("div", {
    className: "edit-widgets-customizer-edit-widgets-initializer__content",
    role: "region",
    "aria-label": __('Widgets screen content'),
    tabIndex: "-1"
  }, createElement(Header, {
    isCustomizer: true
  }), createElement(WidgetAreasBlockEditorContent, null), createElement(ComplementaryArea.Slot, {
    scope: "core/edit-widgets"
  }), createElement(Sidebar, null)));
}

export default navigateRegions(CustomizerEditWidgetsInitializer);
//# sourceMappingURL=index.js.map