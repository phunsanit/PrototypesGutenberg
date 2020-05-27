"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _ = require("../");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var LinkControlSearchInput = function LinkControlSearchInput(_ref) {
  var placeholder = _ref.placeholder,
      value = _ref.value,
      onChange = _ref.onChange,
      onSelect = _ref.onSelect,
      renderSuggestions = _ref.renderSuggestions,
      fetchSuggestions = _ref.fetchSuggestions,
      showInitialSuggestions = _ref.showInitialSuggestions,
      errorMessage = _ref.errorMessage;

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedSuggestion = _useState2[0],
      setSelectedSuggestion = _useState2[1];
  /**
   * Handles the user moving between different suggestions. Does not handle
   * choosing an individual item.
   *
   * @param {string} selection the url of the selected suggestion.
   * @param {Object} suggestion the suggestion object.
   */


  var selectItemHandler = function selectItemHandler(selection, suggestion) {
    onChange(selection);
    setSelectedSuggestion(suggestion);
  };

  function selectSuggestionOrCurrentInputValue(event) {
    // Avoid default forms behavior, since it's being handled custom here.
    event.preventDefault(); // Interpret the selected value as either the selected suggestion, if
    // exists, or otherwise the current input value as entered.

    onSelect(selectedSuggestion || {
      url: value
    });
  }

  return (0, _element.createElement)("form", {
    onSubmit: selectSuggestionOrCurrentInputValue
  }, (0, _element.createElement)("div", {
    className: "block-editor-link-control__search-input-wrapper"
  }, (0, _element.createElement)(_.URLInput, {
    className: "block-editor-link-control__search-input",
    value: value,
    onChange: selectItemHandler,
    placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : (0, _i18n.__)('Search or type url'),
    __experimentalRenderSuggestions: renderSuggestions,
    __experimentalFetchLinkSuggestions: fetchSuggestions,
    __experimentalHandleURLSuggestions: true,
    __experimentalShowInitialSuggestions: showInitialSuggestions
  }), (0, _element.createElement)("div", {
    className: "block-editor-link-control__search-actions"
  }, (0, _element.createElement)(_components.Button, {
    type: "submit",
    label: (0, _i18n.__)('Submit'),
    icon: _icons.keyboardReturn,
    className: "block-editor-link-control__search-submit"
  }))), errorMessage && (0, _element.createElement)(_components.Notice, {
    className: "block-editor-link-control__search-error",
    status: "error",
    isDismissible: false
  }, errorMessage));
};

var _default = LinkControlSearchInput;
exports.default = _default;
//# sourceMappingURL=search-input.js.map