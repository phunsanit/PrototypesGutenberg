import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalBlockNavigationTree } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
export default function NavigationStructurePanel(_ref) {
  var blocks = _ref.blocks,
      initialOpen = _ref.initialOpen;
  var selectedBlockClientIds = useSelect(function (select) {
    return select('core/block-editor').getSelectedBlockClientIds();
  }, []);

  var _useDispatch = useDispatch('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var showNavigationStructure = !!blocks.length;
  return createElement(Panel, {
    className: "edit-navigation-menu-editor__navigation-structure-panel"
  }, createElement(PanelBody, {
    title: __('Navigation structure'),
    initialOpen: initialOpen
  }, showNavigationStructure && createElement(__experimentalBlockNavigationTree, {
    blocks: blocks,
    selectedBlockClientId: selectedBlockClientIds[0],
    selectBlock: selectBlock,
    __experimentalWithBlockNavigationSlots: true,
    __experimentalWithBlockNavigationBlockSettings: true,
    __experimentalWithBlockNavigationBlockSettingsMinLevel: 2,
    showNestedBlocks: true,
    showAppender: true,
    showBlockMovers: true
  })));
}
//# sourceMappingURL=navigation-structure-panel.js.map