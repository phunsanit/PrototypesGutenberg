"use strict";

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/*
Widget area edits made in the Customizer are synced to Customizer
changesets as an object, encoded as a JSON string, where the keys
are widget area IDs and the values are serialized block content.
This file takes care of that syncing using the 2-way data binding
supported by `WP_Customize_Control`s. The process is as follows:

- On load, the client checks if the current changeset has
widget areas that it can parse and use to hydrate the store.
It will load all widget areas for the current theme, but if
the changeset has content for a given area, it will replace
its actual published content with the changeset's.

- On edit, the client updates the 2-way bound input with a new object that maps
widget area IDs and the values are serialized block content, encoded
as a JSON string.

- On publish, a PHP action will parse the JSON string in the
changeset and update all the widget areas in it, to store the
new content.
*/
var waitForSelectValue = function waitForSelectValue(listener, value, changeTrigger) {
  return new Promise(function (resolve) {
    changeTrigger();

    if (listener() === value) {
      resolve();
      return;
    }

    var unsubscribe = window.wp.data.subscribe(function () {
      if (listener() === value) {
        unsubscribe();
        resolve();
      }
    });
  });
}; // Get widget areas from the store in an `id => blocks` mapping.


var getWidgetAreasObject = function getWidgetAreasObject() {
  var _window$wp$data$selec = window.wp.data.select('core'),
      getEntityRecords = _window$wp$data$selec.getEntityRecords,
      getEditedEntityRecord = _window$wp$data$selec.getEditedEntityRecord;

  return getEntityRecords('root', 'widgetArea').reduce(function (widgetAreasObject, _ref) {
    var id = _ref.id;
    widgetAreasObject[id] = getEditedEntityRecord('root', 'widgetArea', id).blocks;
    return widgetAreasObject;
  }, {});
}; // Serialize the provided blocks and render them in the widget area with the provided ID.


var previewBlocksInWidgetArea = (0, _lodash.throttle)(function (id, blocks) {
  var customizePreviewIframe = document.querySelector('#customize-preview > iframe');

  if (!customizePreviewIframe || !customizePreviewIframe.contentDocument) {
    return;
  }

  var widgetArea = customizePreviewIframe.contentDocument.querySelector("[data-customize-partial-placement-context*='\"sidebar_id\":\"".concat(id, "\"']"));

  if (widgetArea) {
    widgetArea.innerHTML = (0, _blocks.serialize)(blocks);
    widgetArea.parentElement.innerHTML = widgetArea.outerHTML;
  }
}, 1000); // Update the hidden input that has 2-way data binding with Customizer settings.

var updateSettingInputValue = (0, _lodash.throttle)(function (nextWidgetAreas) {
  var settingInput = document.getElementById('_customize-input-gutenberg_widget_blocks');

  if (settingInput) {
    settingInput.value = JSON.stringify(Object.keys(nextWidgetAreas).reduce(function (value, id) {
      value[id] = (0, _blocks.serialize)(nextWidgetAreas[id]);
      return value;
    }, {}));
    settingInput.dispatchEvent(new window.Event('change'));
  }
}, 1000); // Check that all the necessary globals are present.

if (window.wp && window.wp.customize && window.wp.data) {
  var ran = false; // Wait for the Customizer to finish bootstrapping.

  window.wp.customize.bind('ready', function () {
    return window.wp.customize.previewer.bind('ready', function () {
      // The Customizer will call this on every preview refresh,
      // but we only want to run it once to avoid running another
      // store setup that would set changeset edits and save
      // widget blocks unintentionally.
      if (ran) {
        return;
      }

      ran = true; // Try to parse a previous changeset from the hidden input.

      var widgetAreas;

      try {
        widgetAreas = JSON.parse(document.getElementById('_customize-input-gutenberg_widget_blocks').value);
        widgetAreas = Object.keys(widgetAreas).reduce(function (value, id) {
          value[id] = (0, _blocks.parse)(widgetAreas[id]);
          return value;
        }, {});
      } catch (err) {
        widgetAreas = {};
      } // Wait for setup to finish before overwriting sidebars with changeset data,
      // if any, and subscribe to registry changes after that so that we can preview
      // changes and update the hidden input's value when any of the widget areas change.


      waitForSelectValue(function () {
        return window.wp.data.select('core').hasFinishedResolution('getEntityRecords', ['root', 'widgetArea']);
      }, true, function () {
        return window.wp.data.select('core').getEntityRecords('root', 'widgetArea');
      }).then(function () {
        Object.keys(widgetAreas).forEach(function (id) {
          window.wp.data.dispatch('core').editEntityRecord('root', 'widgetArea', id, {
            content: (0, _blocks.serialize)(widgetAreas[id]),
            blocks: widgetAreas[id]
          });
        });
        widgetAreas = getWidgetAreasObject();
        window.wp.data.subscribe(function () {
          var nextWidgetAreas = getWidgetAreasObject();
          var didUpdate = false;

          for (var _i = 0, _Object$keys = Object.keys(nextWidgetAreas); _i < _Object$keys.length; _i++) {
            var id = _Object$keys[_i];

            if (widgetAreas[id] !== nextWidgetAreas[id]) {
              previewBlocksInWidgetArea(id, nextWidgetAreas[id]);
              didUpdate = true;
            }
          }

          if (didUpdate) {
            updateSettingInputValue(nextWidgetAreas);
          }

          widgetAreas = nextWidgetAreas;
        });
      });
    });
  });
}
//# sourceMappingURL=sync-customizer.js.map