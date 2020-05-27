"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arePrePublishChecksEnabled = arePrePublishChecksEnabled;

var _wpDataSelect = require("./wp-data-select");

/**
 * Internal dependencies
 */

/**
 * Verifies if publish checks are enabled.
 *
 * @return {boolean} Boolean which represents the state of prepublish checks.
 */
function arePrePublishChecksEnabled() {
  return (0, _wpDataSelect.wpDataSelect)('core/editor', 'isPublishSidebarEnabled');
}
//# sourceMappingURL=are-pre-publish-checks-enabled.js.map