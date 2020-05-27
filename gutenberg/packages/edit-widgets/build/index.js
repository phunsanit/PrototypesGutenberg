"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.customizerInitialize = customizerInitialize;

var _element = require("@wordpress/element");

require("@wordpress/notices");

var _blockLibrary = require("@wordpress/block-library");

require("./hooks");

var _editWidgetsInitializer = _interopRequireDefault(require("./components/edit-widgets-initializer"));

var _customizerEditWidgetsInitializer = _interopRequireDefault(require("./components/customizer-edit-widgets-initializer"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Initializes the block editor in the widgets screen.
 *
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} settings Block editor settings.
 */
function initialize(id, settings) {
  (0, _blockLibrary.registerCoreBlocks)();

  if (process.env.GUTENBERG_PHASE === 2) {
    (0, _blockLibrary.__experimentalRegisterExperimentalCoreBlocks)(settings);
  }

  (0, _element.render)((0, _element.createElement)(_editWidgetsInitializer.default, {
    settings: settings
  }), document.getElementById(id));
}
/**
 * Initializes the block editor in the widgets Customizer section.
 *
 * @param {string} id       ID of the root element to render the section in.
 * @param {Object} settings Block editor settings.
 */


function customizerInitialize(id, settings) {
  (0, _blockLibrary.registerCoreBlocks)();

  if (process.env.GUTENBERG_PHASE === 2) {
    (0, _blockLibrary.__experimentalRegisterExperimentalCoreBlocks)(settings);
  }

  (0, _element.render)((0, _element.createElement)(_customizerEditWidgetsInitializer.default, {
    settings: settings
  }), document.getElementById(id));
}
//# sourceMappingURL=index.js.map