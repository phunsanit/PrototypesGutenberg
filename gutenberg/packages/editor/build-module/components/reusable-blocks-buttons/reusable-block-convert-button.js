import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { every } from 'lodash';
/**
 * WordPress dependencies
 */

import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport, isReusableBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { BlockSettingsMenuControls } from '@wordpress/block-editor';
export function ReusableBlockConvertButton(_ref) {
  var isVisible = _ref.isVisible,
      isReusable = _ref.isReusable,
      onConvertToStatic = _ref.onConvertToStatic,
      onConvertToReusable = _ref.onConvertToReusable;

  if (!isVisible) {
    return null;
  }

  return createElement(BlockSettingsMenuControls, null, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(Fragment, null, !isReusable && createElement(MenuItem, {
      onClick: function onClick() {
        onConvertToReusable();
        onClose();
      }
    }, __('Add to Reusable blocks')), isReusable && createElement(MenuItem, {
      onClick: function onClick() {
        onConvertToStatic();
        onClose();
      }
    }, __('Convert to Regular Block')));
  });
}
export default compose([withSelect(function (select, _ref3) {
  var clientIds = _ref3.clientIds;

  var _select = select('core/block-editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      canInsertBlockType = _select.canInsertBlockType;

  var _select2 = select('core/editor'),
      getReusableBlock = _select2.__experimentalGetReusableBlock;

  var _select3 = select('core'),
      canUser = _select3.canUser;

  var blocks = getBlocksByClientId(clientIds);
  var isReusable = blocks.length === 1 && blocks[0] && isReusableBlock(blocks[0]) && !!getReusableBlock(blocks[0].attributes.ref); // Show 'Convert to Regular Block' when selected block is a reusable block

  var isVisible = isReusable || // Hide 'Add to Reusable blocks' when reusable blocks are disabled
  canInsertBlockType('core/block') && every(blocks, function (block) {
    return (// Guard against the case where a regular block has *just* been converted
      !!block && // Hide 'Add to Reusable blocks' on invalid blocks
      block.isValid && // Hide 'Add to Reusable blocks' when block doesn't support being made reusable
      hasBlockSupport(block.name, 'reusable', true)
    );
  }) && // Hide 'Add to Reusable blocks' when current doesn't have permission to do that
  !!canUser('create', 'blocks');
  return {
    isReusable: isReusable,
    isVisible: isVisible
  };
}), withDispatch(function (dispatch, _ref4) {
  var clientIds = _ref4.clientIds;

  var _dispatch = dispatch('core/editor'),
      convertBlockToReusable = _dispatch.__experimentalConvertBlockToReusable,
      convertBlockToStatic = _dispatch.__experimentalConvertBlockToStatic;

  return {
    onConvertToStatic: function onConvertToStatic() {
      convertBlockToStatic(clientIds[0]);
    },
    onConvertToReusable: function onConvertToReusable() {
      convertBlockToReusable(clientIds);
    }
  };
})])(ReusableBlockConvertButton);
//# sourceMappingURL=reusable-block-convert-button.js.map