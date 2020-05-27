"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WelcomeGuide;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _images = require("./images");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function WelcomeGuide() {
  var isActive = (0, _data.useSelect)(function (select) {
    return select('core/edit-post').isFeatureActive('welcomeGuide');
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      toggleFeature = _useDispatch.toggleFeature;

  if (!isActive) {
    return null;
  }

  return (0, _element.createElement)(_components.Guide, {
    className: "edit-post-welcome-guide",
    contentLabel: (0, _i18n.__)('Welcome to the block editor'),
    finishButtonText: (0, _i18n.__)('Get started'),
    onFinish: function onFinish() {
      return toggleFeature('welcomeGuide');
    },
    pages: [{
      image: (0, _element.createElement)(_images.CanvasImage, null),
      content: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("h1", {
        className: "edit-post-welcome-guide__heading"
      }, (0, _i18n.__)('Welcome to the block editor')), (0, _element.createElement)("p", {
        className: "edit-post-welcome-guide__text"
      }, (0, _i18n.__)('In the WordPress editor, each paragraph, image, or video is presented as a distinct “block” of content.')))
    }, {
      image: (0, _element.createElement)(_images.EditorImage, null),
      content: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("h1", {
        className: "edit-post-welcome-guide__heading"
      }, (0, _i18n.__)('Make each block your own')), (0, _element.createElement)("p", {
        className: "edit-post-welcome-guide__text"
      }, (0, _i18n.__)('Each block comes with its own set of controls for changing things like color, width, and alignment. These will show and hide automatically when you have a block selected.')))
    }, {
      image: (0, _element.createElement)(_images.BlockLibraryImage, null),
      content: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("h1", {
        className: "edit-post-welcome-guide__heading"
      }, (0, _i18n.__)('Get to know the block library')), (0, _element.createElement)("p", {
        className: "edit-post-welcome-guide__text"
      }, (0, _element.createInterpolateElement)((0, _i18n.__)('All of the blocks available to you live in the block library. You’ll find it wherever you see the <InserterIconImage /> icon.'), {
        InserterIconImage: (0, _element.createElement)(_images.InserterIconImage, {
          className: "edit-post-welcome-guide__inserter-icon"
        })
      })))
    }, {
      image: (0, _element.createElement)(_images.DocumentationImage, null),
      content: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("h1", {
        className: "edit-post-welcome-guide__heading"
      }, (0, _i18n.__)('Learn how to use the block editor')), (0, _element.createElement)("p", {
        className: "edit-post-welcome-guide__text"
      }, (0, _i18n.__)('New to the block editor? Want to learn more about using it? '), (0, _element.createElement)(_components.ExternalLink, {
        href: (0, _i18n.__)('https://wordpress.org/support/article/wordpress-editor/')
      }, (0, _i18n.__)("Here's a detailed guide."))))
    }]
  });
}
//# sourceMappingURL=index.js.map