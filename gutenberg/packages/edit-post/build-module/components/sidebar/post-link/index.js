import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ExternalLink } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose, ifCondition, withState } from '@wordpress/compose';
import { cleanForSlug } from '@wordpress/editor';
import { safeDecodeURIComponent } from '@wordpress/url';
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
    prefixElement = prefix && createElement("span", {
      className: "edit-post-post-link__link-prefix"
    }, prefix);
    postNameElement = postSlug && createElement("span", {
      className: "edit-post-post-link__link-post-name"
    }, postSlug);
    suffixElement = suffix && createElement("span", {
      className: "edit-post-post-link__link-suffix"
    }, suffix);
  }

  return createElement(PanelBody, {
    title: __('Permalink'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, isEditable && createElement("div", {
    className: "editor-post-link"
  }, createElement(TextControl, {
    label: __('URL Slug'),
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
      editPermalink(cleanForSlug(event.target.value));

      if (forceEmptyField) {
        setState({
          forceEmptyField: false
        });
      }
    }
  }), createElement("p", null, __('The last part of the URL.'), ' ', createElement(ExternalLink, {
    href: "https://wordpress.org/support/article/writing-posts/#post-field-descriptions"
  }, __('Read about permalinks')))), createElement("h3", {
    className: "edit-post-post-link__preview-label"
  }, postTypeLabel || __('View post')), createElement("div", {
    className: "edit-post-post-link__preview-link-container"
  }, createElement(ExternalLink, {
    className: "edit-post-post-link__link",
    href: postLink,
    target: "_blank"
  }, isEditable ? createElement(Fragment, null, prefixElement, postNameElement, suffixElement) : postLink)));
}

export default compose([withSelect(function (select) {
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
    isViewable: get(postType, ['viewable'], false),
    postSlug: safeDecodeURIComponent(getEditedPostSlug()),
    postTypeLabel: get(postType, ['labels', 'view_item'])
  };
}), ifCondition(function (_ref2) {
  var isEnabled = _ref2.isEnabled,
      postLink = _ref2.postLink,
      isViewable = _ref2.isViewable,
      permalinkParts = _ref2.permalinkParts;
  return isEnabled && postLink && isViewable && permalinkParts;
}), withDispatch(function (dispatch) {
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
}), withState({
  forceEmptyField: false
})])(PostLink);
//# sourceMappingURL=index.js.map