"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBlocks = getAllBlocks;

var _wpDataSelect = require("./wp-data-select");

/**
 * Internal dependencies
 */

/**
 * Returns an array with all blocks; Equivalent to calling wp.data.select( 'core/block-editor' ).getBlocks();
 *
 * @return {Promise} Promise resolving with an array containing all blocks in the document.
 */
function getAllBlocks() {
  return (0, _wpDataSelect.wpDataSelect)('core/block-editor', 'getBlocks');
}
//# sourceMappingURL=get-all-blocks.js.map