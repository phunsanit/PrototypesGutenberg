/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { useBlockEditContext } from '../block-edit';
/**
 * Hook that retrieves the setting for the given editor feature.
 * It works with nested objects using by finding the value at path.
 *
 * @param {string} featurePath  The path to the feature.
 *
 * @return {any} Returns the value defined for the setting.
 *
 * @example
 * ```js
 * const isEnabled = useEditorFeature( 'typography.dropCap' );
 * ```
 */

export default function useEditorFeature(featurePath) {
  var _useBlockEditContext = useBlockEditContext(),
      blockName = _useBlockEditContext.name;

  var path = "__experimentalFeatures.".concat(featurePath);
  var setting = useSelect(function (select) {
    var _select = select('core/blocks'),
        getBlockSupport = _select.getBlockSupport;

    var blockSupportValue = getBlockSupport(blockName, path);

    if (blockSupportValue !== undefined) {
      return blockSupportValue;
    }

    var _select2 = select('core/block-editor'),
        getSettings = _select2.getSettings;

    return get(getSettings(), path);
  }, [blockName, path]);
  return setting;
}
//# sourceMappingURL=index.js.map