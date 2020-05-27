"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAssets = loadAssets;
exports.default = exports.loadStyle = exports.loadScript = void 0;

/**
 * Loads a JavaScript file.
 *
 * @param {string} asset The url for this file.
 *
 * @return {Promise} Promise which will resolve when the asset is loaded.
 */
var loadScript = function loadScript(asset) {
  if (!asset || !/\.js$/.test(asset)) {
    return Promise.reject(new Error('No script found.'));
  }

  return new Promise(function (resolve, reject) {
    var existing = document.querySelector("script[src=\"".concat(asset, "\"]"));

    if (existing) {
      existing.parentNode.removeChild(existing);
    }

    var script = document.createElement('script');
    script.src = asset;

    script.onload = function () {
      return resolve(true);
    };

    script.onerror = function () {
      return reject(new Error('Error loading script.'));
    };

    document.body.appendChild(script);
  });
};
/**
 * Loads a CSS file.
 *
 * @param {string} asset The url for this file.
 *
 * @return {Promise} Promise which will resolve when the asset is added.
 */


exports.loadScript = loadScript;

var loadStyle = function loadStyle(asset) {
  if (!asset || !/\.css$/.test(asset)) {
    return Promise.reject(new Error('No style found.'));
  }

  return new Promise(function (resolve, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = asset;

    link.onload = function () {
      return resolve(true);
    };

    link.onerror = function () {
      return reject(new Error('Error loading style.'));
    };

    document.body.appendChild(link);
  });
};
/**
 * Load the asset files for a block
 *
 * @param {Array} assets A collection of URLs for the assets.
 *
 * @return {Object} Control descriptor.
 */


exports.loadStyle = loadStyle;

function loadAssets(assets) {
  return {
    type: 'LOAD_ASSETS',
    assets: assets
  };
}

var controls = {
  LOAD_ASSETS: function LOAD_ASSETS(_ref) {
    var assets = _ref.assets;
    var scripts = assets.map(function (asset) {
      return asset.match(/\.js$/) !== null ? loadScript(asset) : loadStyle(asset);
    });
    return Promise.all(scripts);
  }
};
var _default = controls;
exports.default = _default;
//# sourceMappingURL=controls.js.map