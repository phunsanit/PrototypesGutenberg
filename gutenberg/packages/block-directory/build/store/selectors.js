"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestingDownloadableBlocks = isRequestingDownloadableBlocks;
exports.getDownloadableBlocks = getDownloadableBlocks;
exports.hasInstallBlocksPermission = hasInstallBlocksPermission;
exports.getInstalledBlockTypes = getInstalledBlockTypes;
exports.isInstalling = isInstalling;
exports.getErrorNotices = getErrorNotices;
exports.getErrorNoticeForBlock = getErrorNoticeForBlock;

/**
 * Returns true if application is requesting for downloadable blocks.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} Downloadable blocks
 */
function isRequestingDownloadableBlocks(state) {
  return state.downloadableBlocks.isRequestingDownloadableBlocks;
}
/**
 * Returns the available uninstalled blocks
 *
 * @param {Object} state       Global application state.
 * @param {string} filterValue Search string.
 *
 * @return {Array} Downloadable blocks
 */


function getDownloadableBlocks(state, filterValue) {
  if (!state.downloadableBlocks.results[filterValue]) {
    return [];
  }

  return state.downloadableBlocks.results[filterValue];
}
/**
 * Returns true if user has permission to install blocks.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} User has permission to install blocks.
 */


function hasInstallBlocksPermission(state) {
  return state.hasPermission;
}
/**
 * Returns the block types that have been installed on the server.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} Block type items.
 */


function getInstalledBlockTypes(state) {
  return state.blockManagement.installedBlockTypes;
}
/**
 * Returns true if application is calling install endpoint.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether its currently installing
 */


function isInstalling(state) {
  return state.blockManagement.isInstalling;
}
/**
 * Returns the error notices
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Object with error notices.
 */


function getErrorNotices(state) {
  return state.errorNotices;
}
/**
 * Returns the error notice for a given block.
 *
 * @param {Object} state   Global application state.
 * @param {string} blockId The ID of the block plugin. eg: my-block
 *
 * @return {string|boolean} The error text, or false if no error.
 */


function getErrorNoticeForBlock(state, blockId) {
  return state.errorNotices[blockId] || false;
}
//# sourceMappingURL=selectors.js.map