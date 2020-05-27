import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalTreeGrid as TreeGrid } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockNavigationBranch from './branch';
import { BlockNavigationContext } from './context';
/**
 * Wrap `BlockNavigationRows` with `TreeGrid`. BlockNavigationRows is a
 * recursive component (it renders itself), so this ensures TreeGrid is only
 * present at the very top of the navigation grid.
 *
 * @param {Object} props
 */

export default function BlockNavigationTree(_ref) {
  var __experimentalWithBlockNavigationSlots = _ref.__experimentalWithBlockNavigationSlots,
      __experimentalWithBlockNavigationBlockSettings = _ref.__experimentalWithBlockNavigationBlockSettings,
      __experimentalWithBlockNavigationBlockSettingsMinLevel = _ref.__experimentalWithBlockNavigationBlockSettingsMinLevel,
      props = _objectWithoutProperties(_ref, ["__experimentalWithBlockNavigationSlots", "__experimentalWithBlockNavigationBlockSettings", "__experimentalWithBlockNavigationBlockSettingsMinLevel"]);

  var contextValue = useMemo(function () {
    return {
      __experimentalWithBlockNavigationSlots: __experimentalWithBlockNavigationSlots,
      __experimentalWithBlockNavigationBlockSettings: __experimentalWithBlockNavigationBlockSettings,
      __experimentalWithBlockNavigationBlockSettingsMinLevel: typeof __experimentalWithBlockNavigationBlockSettingsMinLevel === 'number' ? __experimentalWithBlockNavigationBlockSettingsMinLevel : 0
    };
  }, [__experimentalWithBlockNavigationSlots, __experimentalWithBlockNavigationBlockSettings, __experimentalWithBlockNavigationBlockSettingsMinLevel]);
  return createElement(TreeGrid, {
    className: "block-editor-block-navigation-tree",
    "aria-label": __('Block navigation structure')
  }, createElement(BlockNavigationContext.Provider, {
    value: contextValue
  }, createElement(BlockNavigationBranch, props)));
}
//# sourceMappingURL=tree.js.map