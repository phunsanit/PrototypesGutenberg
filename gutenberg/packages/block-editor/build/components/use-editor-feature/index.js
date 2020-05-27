"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useEditorFeature;

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _blockEdit = require("../block-edit");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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
function useEditorFeature(featurePath) {
  var _useBlockEditContext = (0, _blockEdit.useBlockEditContext)(),
      blockName = _useBlockEditContext.name;

  var path = "__experimentalFeatures.".concat(featurePath);
  var setting = (0, _data.useSelect)(function (select) {
    var _select = select('core/blocks'),
        getBlockSupport = _select.getBlockSupport;

    var blockSupportValue = getBlockSupport(blockName, path);

    if (blockSupportValue !== undefined) {
      return blockSupportValue;
    }

    var _select2 = select('core/block-editor'),
        getSettings = _select2.getSettings;

    return (0, _lodash.get)(getSettings(), path);
  }, [blockName, path]);
  return setting;
}
//# sourceMappingURL=index.js.map