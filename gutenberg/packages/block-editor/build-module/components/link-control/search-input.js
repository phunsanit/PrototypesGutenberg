import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Notice } from '@wordpress/components';
import { keyboardReturn } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import { URLInput } from '../';

var LinkControlSearchInput = function LinkControlSearchInput(_ref) {
  var placeholder = _ref.placeholder,
      value = _ref.value,
      onChange = _ref.onChange,
      onSelect = _ref.onSelect,
      renderSuggestions = _ref.renderSuggestions,
      fetchSuggestions = _ref.fetchSuggestions,
      showInitialSuggestions = _ref.showInitialSuggestions,
      errorMessage = _ref.errorMessage;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
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

  return createElement("form", {
    onSubmit: selectSuggestionOrCurrentInputValue
  }, createElement("div", {
    className: "block-editor-link-control__search-input-wrapper"
  }, createElement(URLInput, {
    className: "block-editor-link-control__search-input",
    value: value,
    onChange: selectItemHandler,
    placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : __('Search or type url'),
    __experimentalRenderSuggestions: renderSuggestions,
    __experimentalFetchLinkSuggestions: fetchSuggestions,
    __experimentalHandleURLSuggestions: true,
    __experimentalShowInitialSuggestions: showInitialSuggestions
  }), createElement("div", {
    className: "block-editor-link-control__search-actions"
  }, createElement(Button, {
    type: "submit",
    label: __('Submit'),
    icon: keyboardReturn,
    className: "block-editor-link-control__search-submit"
  }))), errorMessage && createElement(Notice, {
    className: "block-editor-link-control__search-error",
    status: "error",
    isDismissible: false
  }, errorMessage));
};

export default LinkControlSearchInput;
//# sourceMappingURL=search-input.js.map