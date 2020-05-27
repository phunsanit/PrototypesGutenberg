import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { ExternalLink, Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { CanvasImage, EditorImage, BlockLibraryImage, DocumentationImage, InserterIconImage } from './images';
export default function WelcomeGuide() {
  var isActive = useSelect(function (select) {
    return select('core/edit-post').isFeatureActive('welcomeGuide');
  }, []);

  var _useDispatch = useDispatch('core/edit-post'),
      toggleFeature = _useDispatch.toggleFeature;

  if (!isActive) {
    return null;
  }

  return createElement(Guide, {
    className: "edit-post-welcome-guide",
    contentLabel: __('Welcome to the block editor'),
    finishButtonText: __('Get started'),
    onFinish: function onFinish() {
      return toggleFeature('welcomeGuide');
    },
    pages: [{
      image: createElement(CanvasImage, null),
      content: createElement(Fragment, null, createElement("h1", {
        className: "edit-post-welcome-guide__heading"
      }, __('Welcome to the block editor')), createElement("p", {
        className: "edit-post-welcome-guide__text"
      }, __('In the WordPress editor, each paragraph, image, or video is presented as a distinct “block” of content.')))
    }, {
      image: createElement(EditorImage, null),
      content: createElement(Fragment, null, createElement("h1", {
        className: "edit-post-welcome-guide__heading"
      }, __('Make each block your own')), createElement("p", {
        className: "edit-post-welcome-guide__text"
      }, __('Each block comes with its own set of controls for changing things like color, width, and alignment. These will show and hide automatically when you have a block selected.')))
    }, {
      image: createElement(BlockLibraryImage, null),
      content: createElement(Fragment, null, createElement("h1", {
        className: "edit-post-welcome-guide__heading"
      }, __('Get to know the block library')), createElement("p", {
        className: "edit-post-welcome-guide__text"
      }, createInterpolateElement(__('All of the blocks available to you live in the block library. You’ll find it wherever you see the <InserterIconImage /> icon.'), {
        InserterIconImage: createElement(InserterIconImage, {
          className: "edit-post-welcome-guide__inserter-icon"
        })
      })))
    }, {
      image: createElement(DocumentationImage, null),
      content: createElement(Fragment, null, createElement("h1", {
        className: "edit-post-welcome-guide__heading"
      }, __('Learn how to use the block editor')), createElement("p", {
        className: "edit-post-welcome-guide__text"
      }, __('New to the block editor? Want to learn more about using it? '), createElement(ExternalLink, {
        href: __('https://wordpress.org/support/article/wordpress-editor/')
      }, __("Here's a detailed guide."))))
    }]
  });
}
//# sourceMappingURL=index.js.map