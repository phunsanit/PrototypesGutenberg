import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(installBlockType);

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { apiFetch, select } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */

import { loadAssets } from './controls';
/**
 * Returns an action object used in signalling that the downloadable blocks
 * have been requested and is loading.
 *
 * @param {string} filterValue Search string.
 *
 * @return {Object} Action object.
 */

export function fetchDownloadableBlocks(filterValue) {
  return {
    type: 'FETCH_DOWNLOADABLE_BLOCKS',
    filterValue: filterValue
  };
}
/**
 * Returns an action object used in signalling that the downloadable blocks
 * have been updated.
 *
 * @param {Array}  downloadableBlocks Downloadable blocks.
 * @param {string} filterValue        Search string.
 *
 * @return {Object} Action object.
 */

export function receiveDownloadableBlocks(downloadableBlocks, filterValue) {
  return {
    type: 'RECEIVE_DOWNLOADABLE_BLOCKS',
    downloadableBlocks: downloadableBlocks,
    filterValue: filterValue
  };
}
/**
 * Returns an action object used in signalling that the user does not have
 * permission to install blocks.
 *
 * @param {boolean} hasPermission User has permission to install blocks.
 *
 * @return {Object} Action object.
 */

export function setInstallBlocksPermission(hasPermission) {
  return {
    type: 'SET_INSTALL_BLOCKS_PERMISSION',
    hasPermission: hasPermission
  };
}
/**
 * Action triggered to install a block plugin.
 *
 * @param {Object} item The block item returned by search.
 *
 * @return {boolean} Whether the block was successfully installed & loaded.
 */

export function installBlockType(_ref) {
  var id, name, assets, success, response, registeredBlocks;
  return _regeneratorRuntime.wrap(function installBlockType$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = _ref.id, name = _ref.name, assets = _ref.assets;
          success = false;
          _context.next = 4;
          return clearErrorNotice(id);

        case 4:
          _context.prev = 4;

          if (!(!Array.isArray(assets) || !assets.length)) {
            _context.next = 7;
            break;
          }

          throw new Error(__('Block has no assets.'));

        case 7:
          _context.next = 9;
          return setIsInstalling(true);

        case 9:
          _context.next = 11;
          return apiFetch({
            path: '__experimental/block-directory/install',
            data: {
              slug: id
            },
            method: 'POST'
          });

        case 11:
          response = _context.sent;

          if (!(response.success !== true)) {
            _context.next = 14;
            break;
          }

          throw new Error(__('Unable to install this block.'));

        case 14:
          _context.next = 16;
          return addInstalledBlockType({
            id: id,
            name: name
          });

        case 16:
          _context.next = 18;
          return loadAssets(assets);

        case 18:
          _context.next = 20;
          return select('core/blocks', 'getBlockTypes');

        case 20:
          registeredBlocks = _context.sent;

          if (registeredBlocks.length) {
            _context.next = 23;
            break;
          }

          throw new Error(__('Unable to get block types.'));

        case 23:
          success = true;
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](4);
          _context.next = 30;
          return setErrorNotice(id, _context.t0.message || __('An error occurred.'));

        case 30:
          _context.next = 32;
          return setIsInstalling(false);

        case 32:
          return _context.abrupt("return", success);

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[4, 26]]);
}
/**
 * Returns an action object used to add a newly installed block type.
 *
 * @param {Object} item The block item with the block id and name.
 *
 * @return {Object} Action object.
 */

export function addInstalledBlockType(item) {
  return {
    type: 'ADD_INSTALLED_BLOCK_TYPE',
    item: item
  };
}
/**
 * Returns an action object used to indicate install in progress
 *
 * @param {boolean} isInstalling
 *
 * @return {Object} Action object.
 */

export function setIsInstalling(isInstalling) {
  return {
    type: 'SET_INSTALLING_BLOCK',
    isInstalling: isInstalling
  };
}
/**
 * Sets an error notice string to be displayed to the user
 *
 * @param {string} blockId The ID of the block plugin. eg: my-block
 * @param {string} notice  The message shown in the notice.
 *
 * @return {Object} Action object.
 */

export function setErrorNotice(blockId, notice) {
  return {
    type: 'SET_ERROR_NOTICE',
    blockId: blockId,
    notice: notice
  };
}
/**
 * Sets the error notice to empty for specific block
 *
 * @param {string} blockId The ID of the block plugin. eg: my-block
 *
 * @return {Object} Action object.
 */

export function clearErrorNotice(blockId) {
  return {
    type: 'SET_ERROR_NOTICE',
    blockId: blockId,
    notice: false
  };
}
//# sourceMappingURL=actions.js.map