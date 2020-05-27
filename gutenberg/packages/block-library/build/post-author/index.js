"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = exports.metadata = void 0;

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/post-author",
  category: "layout",
  attributes: {
    align: {
      type: "string"
    },
    avatarSize: {
      type: "number"
    },
    showAvatar: {
      type: "boolean"
    },
    showBio: {
      type: "boolean"
    },
    byline: {
      type: "string"
    },
    backgroundColor: {
      type: "string"
    },
    textColor: {
      type: "string"
    },
    customBackgroundColor: {
      type: "string"
    },
    customTextColor: {
      type: "string"
    }
  },
  context: ["postType", "postId"],
  supports: {
    html: false
  }
};
exports.metadata = metadata;
var name = metadata.name;
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Post Author'),
  icon: _icon.default,
  edit: _edit.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map