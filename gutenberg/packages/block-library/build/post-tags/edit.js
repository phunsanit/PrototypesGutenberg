"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostTagsEdit;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _coreData = require("@wordpress/core-data");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function PostTagsDisplay() {
  var _useEntityProp = (0, _coreData.useEntityProp)('postType', 'post', 'tags'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 1),
      tags = _useEntityProp2[0];

  var tagLinks = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getEntityRecord = _select.getEntityRecord;

    var loaded = true;
    var links = tags.map(function (tagId) {
      var tag = getEntityRecord('taxonomy', 'post_tag', tagId);

      if (!tag) {
        return loaded = false;
      }

      return (0, _element.createElement)("a", {
        key: tagId,
        href: tag.link
      }, tag.name);
    });
    return loaded && links;
  }, [tags]);
  return tagLinks && (tagLinks.length === 0 ? (0, _i18n.__)('No tags.') : tagLinks.reduce(function (prev, curr) {
    return [prev, ' | ', curr];
  }));
}

function PostTagsEdit() {
  if (!(0, _coreData.useEntityId)('postType', 'post')) {
    return 'Post Tags Placeholder';
  }

  return (0, _element.createElement)(PostTagsDisplay, null);
}
//# sourceMappingURL=edit.js.map