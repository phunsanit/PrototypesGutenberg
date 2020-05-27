"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeEditor = initializeEditor;
Object.defineProperty(exports, "Editor", {
  enumerable: true,
  get: function get() {
    return _editor2.default;
  }
});

require("@wordpress/core-data");

require("@wordpress/block-editor");

require("@wordpress/editor");

require("@wordpress/viewport");

require("@wordpress/notices");

var _blockLibrary = require("@wordpress/block-library");

require("@wordpress/format-library");

require("./store");

var _editor2 = _interopRequireDefault(require("./editor"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var blocksRegistered = false;
/**
 * Initializes the Editor.
 */

function initializeEditor() {
  if (blocksRegistered) {
    return;
  } // register and setup blocks


  (0, _blockLibrary.registerCoreBlocks)();
  blocksRegistered = true;
}
//# sourceMappingURL=index.native.js.map