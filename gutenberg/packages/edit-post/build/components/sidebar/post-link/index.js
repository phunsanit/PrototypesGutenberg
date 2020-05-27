"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

var _url = require("@wordpress/url");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Module Constants
 */
var PANEL_NAME = 'post-link';

function PostLink(_ref) {
  var isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel,
      isEditable = _ref.isEditable,
      postLink = _ref.postLink,
      permalinkParts = _ref.permalinkParts,
      editPermalink = _ref.editPermalink,
      forceEmptyField = _ref.forceEmptyField,
      setState = _ref.setState,
      postSlug = _ref.postSlug,
      postTypeLabel = _ref.postTypeLabel;
  var prefix = permalinkParts.prefix,
      suffix = permalinkParts.suffix;
  var prefixElement, postNameElement, suffixElement;

  if (isEditable) {
    prefixElement = prefix && (0, _element.createElement)("span", {
      className: "edit-post-post-link__link-prefix"
    }, prefix);
    postNameElement = postSlug && (0, _element.createElement)("span", {
      className: "edit-post-post-link__link-post-name"
    }, postSlug);
    suffixElement = suffix && (0, _element.createElement)("span", {
      className: "edit-post-post-link__link-suffix"
    }, suffix);
  }

  return (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Permalink'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, isEditable && (0, _element.createElement)("div", {
    className: "editor-post-link"
  }, (0, _element.createElement)(_components.TextControl, {
    label: (0, _i18n.__)('URL Slug'),
    value: forceEmptyField ? '' : postSlug,
    onChange: function onChange(newValue) {
      editPermalink(newValue); // When we delete the field the permalink gets
      // reverted to the original value.
      // The forceEmptyField logic allows the user to have
      // the field temporarily empty while typing.

      if (!newValue) {
        if (!forceEmptyField) {
          setState({
            forceEmptyField: true
          });
        }

        return;
      }

      if (forceEmptyField) {
        setState({
          forceEmptyField: false
        });
      }
    },
    onBlur: function onBlur(event) {
      editPermalink((0, _editor.cleanForSlug)(event.target.value));

      if (forceEmptyField) {
        setState({
          forceEmptyField: false
        });
      }
    }
  }), (0, _element.createElement)("p", null, (0, _i18n.__)('The last part of the URL.'), ' ', (0, _element.createElement)(_components.ExternalLink, {
    href: "https://wordpress.org/support/article/writing-posts/#post-field-descriptions"
  }, (0, _i18n.__)('Read about permalinks')))), (0, _element.createElement)("h3", {
    className: "edit-post-post-link__preview-label"
  }, postTypeLabel || (0, _i18n.__)('View post')), (0, _element.createElement)("div", {
    className: "edit-post-post-link__preview-link-container"
  }, (0, _element.createElement)(_components.ExternalLink, {
    className: "edit-post-post-link__link",
    href: postLink,
    target: "_blank"
  }, isEditable ? (0, _element.createElement)(_element.Fragment, null, prefixElement, postNameElement, suffixElement) : postLink)));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isPermalinkEditable = _select.isPermalinkEditable,
      getCurrentPost = _select.getCurrentPost,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      getPermalinkParts = _select.getPermalinkParts,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getEditedPostSlug = _select.getEditedPostSlug;

  var _select2 = select('core/edit-post'),
      isEditorPanelEnabled = _select2.isEditorPanelEnabled,
      isEditorPanelOpened = _select2.isEditorPanelOpened;

  var _select3 = select('core'),
      getPostType = _select3.getPostType;

  var _getCurrentPost = getCurrentPost(),
      link = _getCurrentPost.link;

  var postTypeName = getEditedPostAttribute('type');
  var postType = getPostType(postTypeName);
  return {
    postLink: link,
    isEditable: isPermalinkEditable(),
    isPublished: isCurrentPostPublished(),
    isOpened: isEditorPanelOpened(PANEL_NAME),
    permalinkParts: getPermalinkParts(),
    isEnabled: isEditorPanelEnabled(PANEL_NAME),
    isViewable: (0, _lodash.get)(postType, ['viewable'], false),
    postSlug: (0, _url.safeDecodeURIComponent)(getEditedPostSlug()),
    postTypeLabel: (0, _lodash.get)(postType, ['labels', 'view_item'])
  };
}), (0, _compose.ifCondition)(function (_ref2) {
  var isEnabled = _ref2.isEnabled,
      postLink = _ref2.postLink,
      isViewable = _ref2.isViewable,
      permalinkParts = _ref2.permalinkParts;
  return isEnabled && postLink && isViewable && permalinkParts;
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      toggleEditorPanelOpened = _dispatch.toggleEditorPanelOpened;

  var _dispatch2 = dispatch('core/editor'),
      editPost = _dispatch2.editPost;

  return {
    onTogglePanel: function onTogglePanel() {
      return toggleEditorPanelOpened(PANEL_NAME);
    },
    editPermalink: function editPermalink(newSlug) {
      editPost({
        slug: newSlug
      });
    }
  };
}), (0, _compose.withState)({
  forceEmptyField: false
})])(PostLink);

exports.default = _default;
//# sourceMappingURL=index.js.map