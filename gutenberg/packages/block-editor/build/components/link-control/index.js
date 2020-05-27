"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _element = require("@wordpress/element");

var _url = require("@wordpress/url");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _dom = require("@wordpress/dom");

var _settingsDrawer = _interopRequireDefault(require("./settings-drawer"));

var _searchItem = _interopRequireDefault(require("./search-item"));

var _searchInput = _interopRequireDefault(require("./search-input"));

var _searchCreateButton = _interopRequireDefault(require("./search-create-button"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createSlotFill = (0, _components.createSlotFill)('BlockEditorLinkControlViewer'),
    ViewerSlot = _createSlotFill.Slot,
    ViewerFill = _createSlotFill.Fill; // Used as a unique identifier for the "Create" option within search results.
// Used to help distinguish the "Create" suggestion within the search results in
// order to handle it as a unique case.


var CREATE_TYPE = '__CREATE__';
/**
 * Creates a wrapper around a promise which allows it to be programmatically
 * cancelled.
 * See: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 *
 * @param {Promise} promise the Promise to make cancelable
 */

var makeCancelable = function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject({
        isCanceled: true
      }) : resolve(val);
    }, function (error) {
      return hasCanceled_ ? reject({
        isCanceled: true
      }) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled_ = true;
    }
  };
};
/**
 * Default properties associated with a link control value.
 *
 * @typedef WPLinkControlDefaultValue
 *
 * @property {string}   url           Link URL.
 * @property {string=}  title         Link title.
 * @property {boolean=} opensInNewTab Whether link should open in a new browser
 *                                    tab. This value is only assigned if not
 *                                    providing a custom `settings` prop.
 */

/* eslint-disable jsdoc/valid-types */

/**
 * Custom settings values associated with a link.
 *
 * @typedef {{[setting:string]:any}} WPLinkControlSettingsValue
 */

/* eslint-enable */

/**
 * Custom settings values associated with a link.
 *
 * @typedef WPLinkControlSetting
 *
 * @property {string} id    Identifier to use as property for setting value.
 * @property {string} title Human-readable label to show in user interface.
 */

/* eslint-disable jsdoc/valid-types */

/**
 * Properties associated with a link control value, composed as a union of the
 * default properties and any custom settings values.
 *
 * @typedef {WPLinkControlDefaultValue&WPLinkControlSettingsValue} WPLinkControlValue
 */

/* eslint-enable */

/** @typedef {(nextValue:WPLinkControlValue)=>void} WPLinkControlOnChangeProp */

/**
 * Properties associated with a search suggestion used within the LinkControl.
 *
 * @typedef WPLinkControlSuggestion
 *
 * @property {string} id    Identifier to use to uniquely identify the suggestion.
 * @property {string} type  Identifies the type of the suggestion (eg: `post`,
 *                          `page`, `url`...etc)
 * @property {string} title Human-readable label to show in user interface.
 * @property {string} url   A URL for the suggestion.
 */

/** @typedef {(title:string)=>WPLinkControlSuggestion} WPLinkControlCreateSuggestionProp */

/**
 * @typedef WPLinkControlProps
 *
 * @property {(WPLinkControlSetting[])=}            settings               An array of settings objects. Each object will used to
 *                                                                         render a `ToggleControl` for that setting.
 * @property {boolean=}                             forceIsEditingLink     If passed as either `true` or `false`, controls the
 *                                                                         internal editing state of the component to respective
 *                                                                         show or not show the URL input field.
 * @property {WPLinkControlValue=}                  value                  Current link value.
 * @property {WPLinkControlOnChangeProp=}           onChange               Value change handler, called with the updated value if
 *                                                                         the user selects a new link or updates settings.
 * @property {boolean=}                             noDirectEntry          Whether to disable direct entries or not.
 * @property {boolean=}                             showSuggestions        Whether to present suggestions when typing the URL.
 * @property {boolean=}                             showInitialSuggestions Whether to present initial suggestions immediately.
 * @property {WPLinkControlCreateSuggestionProp=}   createSuggestion       Handler to manage creation of link value from suggestion.
 */

/**
 * Renders a link control. A link control is a controlled input which maintains
 * a value associated with a link (HTML anchor element) and relevant settings
 * for how that link is expected to behave.
 *
 * @param {WPLinkControlProps} props Component props.
 */


function LinkControl(_ref) {
  var searchInputPlaceholder = _ref.searchInputPlaceholder,
      value = _ref.value,
      settings = _ref.settings,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _lodash.noop : _ref$onChange,
      _ref$noDirectEntry = _ref.noDirectEntry,
      noDirectEntry = _ref$noDirectEntry === void 0 ? false : _ref$noDirectEntry,
      _ref$showSuggestions = _ref.showSuggestions,
      showSuggestions = _ref$showSuggestions === void 0 ? true : _ref$showSuggestions,
      showInitialSuggestions = _ref.showInitialSuggestions,
      forceIsEditingLink = _ref.forceIsEditingLink,
      createSuggestion = _ref.createSuggestion;
  var cancelableOnCreate = (0, _element.useRef)();
  var cancelableCreateSuggestion = (0, _element.useRef)();
  var wrapperNode = (0, _element.useRef)();
  var instanceId = (0, _compose.useInstanceId)(LinkControl);

  var _useState = (0, _element.useState)(value && value.url || ''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = (0, _element.useState)(forceIsEditingLink !== undefined ? forceIsEditingLink : !value || !value.url),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isEditingLink = _useState4[0],
      setIsEditingLink = _useState4[1];

  var _useState5 = (0, _element.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isResolvingLink = _useState6[0],
      setIsResolvingLink = _useState6[1];

  var _useState7 = (0, _element.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      errorMessage = _useState8[0],
      setErrorMessage = _useState8[1];

  var isEndingEditWithFocus = (0, _element.useRef)(false);

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getSettings = _select.getSettings;

    return {
      fetchSearchSuggestions: getSettings().__experimentalFetchLinkSuggestions
    };
  }, []),
      fetchSearchSuggestions = _useSelect.fetchSearchSuggestions;

  var displayURL = value && (0, _url.filterURLForDisplay)((0, _url.safeDecodeURI)(value.url)) || '';
  (0, _element.useEffect)(function () {
    if (forceIsEditingLink !== undefined && forceIsEditingLink !== isEditingLink) {
      setIsEditingLink(forceIsEditingLink);
    }
  }, [forceIsEditingLink]);
  (0, _element.useEffect)(function () {
    // When `isEditingLink` is set to `false`, a focus loss could occur
    // since the link input may be removed from the DOM. To avoid this,
    // reinstate focus to a suitable target if focus has in-fact been lost.
    // Note that the check is necessary because while typically unsetting
    // edit mode would render the read-only mode's link element, it isn't
    // guaranteed. The link input may continue to be shown if the next value
    // is still unassigned after calling `onChange`.
    var hadFocusLoss = isEndingEditWithFocus.current && wrapperNode.current && !wrapperNode.current.contains(document.activeElement);

    if (hadFocusLoss) {
      // Prefer to focus a natural focusable descendent of the wrapper,
      // but settle for the wrapper if there are no other options.
      var nextFocusTarget = _dom.focus.focusable.find(wrapperNode.current)[0] || wrapperNode.current;
      nextFocusTarget.focus();
    }

    isEndingEditWithFocus.current = false;
  }, [isEditingLink]);
  /**
   * Handles cancelling any pending Promises that have been made cancelable.
   */

  (0, _element.useEffect)(function () {
    return function () {
      // componentDidUnmount
      if (cancelableOnCreate.current) {
        cancelableOnCreate.current.cancel();
      }

      if (cancelableCreateSuggestion.current) {
        cancelableCreateSuggestion.current.cancel();
      }
    };
  }, []);
  /**
   * onChange LinkControlSearchInput event handler
   *
   * @param {string} val Current value returned by the search.
   */

  var onInputChange = function onInputChange() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    setInputValue(val);
  };

  var handleDirectEntry = noDirectEntry ? function () {
    return Promise.resolve([]);
  } : function (val) {
    var type = 'URL';
    var protocol = (0, _url.getProtocol)(val) || '';

    if (protocol.includes('mailto')) {
      type = 'mailto';
    }

    if (protocol.includes('tel')) {
      type = 'tel';
    }

    if ((0, _lodash.startsWith)(val, '#')) {
      type = 'internal';
    }

    return Promise.resolve([{
      id: val,
      title: val,
      url: type === 'URL' ? (0, _url.prependHTTP)(val) : val,
      type: type
    }]);
  };

  var handleEntitySearch = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(val, args) {
      var results, couldBeURL;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([fetchSearchSuggestions(val, _objectSpread({}, args.isInitialSuggestions ? {
                perPage: 3
              } : {})), handleDirectEntry(val)]);

            case 2:
              results = _context.sent;
              couldBeURL = !val.includes(' '); // If it's potentially a URL search then concat on a URL search suggestion
              // just for good measure. That way once the actual results run out we always
              // have a URL option to fallback on.

              results = couldBeURL && !args.isInitialSuggestions ? results[0].concat(results[1]) : results[0]; // Here we append a faux suggestion to represent a "CREATE" option. This
              // is detected in the rendering of the search results and handled as a
              // special case. This is currently necessary because the suggestions
              // dropdown will only appear if there are valid suggestions and
              // therefore unless the create option is a suggestion it will not
              // display in scenarios where there are no results returned from the
              // API. In addition promoting CREATE to a first class suggestion affords
              // the a11y benefits afforded by `URLInput` to all suggestions (eg:
              // keyboard handling, ARIA roles...etc).
              //
              // Note also that the value of the `title` and `url` properties must correspond
              // to the text value of the `<input>`. This is because `title` is used
              // when creating the suggestion. Similarly `url` is used when using keyboard to select
              // the suggestion (the <form> `onSubmit` handler falls-back to `url`).

              return _context.abrupt("return", isURLLike(val) ? results : results.concat({
                // the `id` prop is intentionally ommitted here because it
                // is never exposed as part of the component's public API.
                // see: https://github.com/WordPress/gutenberg/pull/19775#discussion_r378931316.
                title: val,
                // must match the existing `<input>`s text value
                url: val,
                // must match the existing `<input>`s text value
                type: CREATE_TYPE
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleEntitySearch(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Cancels editing state and marks that focus may need to be restored after
   * the next render, if focus was within the wrapper when editing finished.
   */


  function stopEditing() {
    var _wrapperNode$current;

    isEndingEditWithFocus.current = !!((_wrapperNode$current = wrapperNode.current) === null || _wrapperNode$current === void 0 ? void 0 : _wrapperNode$current.contains(document.activeElement));
    setIsEditingLink(false);
  }
  /**
   * Determines whether a given value could be a URL. Note this does not
   * guarantee the value is a URL only that it looks like it might be one. For
   * example, just because a string has `www.` in it doesn't make it a URL,
   * but it does make it highly likely that it will be so in the context of
   * creating a link it makes sense to treat it like one.
   *
   * @param {string} val the candidate for being URL-like (or not).
   * @return {boolean}   whether or not the value is potentially a URL.
   */


  function isURLLike(val) {
    var isInternal = (0, _lodash.startsWith)(val, '#');
    return (0, _url.isURL)(val) || val && val.includes('www.') || isInternal;
  } // Effects


  var getSearchHandler = (0, _element.useCallback)(function (val, args) {
    if (!showSuggestions) {
      return Promise.resolve([]);
    }

    return isURLLike(val) ? handleDirectEntry(val, args) : handleEntitySearch(val, args);
  }, [handleDirectEntry, fetchSearchSuggestions]);

  var handleOnCreate = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(suggestionTitle) {
      var newSuggestion;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setIsResolvingLink(true);
              setErrorMessage(null);
              _context2.prev = 2;
              // Make cancellable in order that we can avoid setting State
              // if the component unmounts during the call to `createSuggestion`
              cancelableCreateSuggestion.current = makeCancelable( // Using Promise.resolve to allow createSuggestion to return a
              // non-Promise based value.
              Promise.resolve(createSuggestion(suggestionTitle)));
              _context2.next = 6;
              return cancelableCreateSuggestion.current.promise;

            case 6:
              newSuggestion = _context2.sent;
              // ********
              // NOTE: if the above Promise rejects then code below here will never run
              // ********
              setIsResolvingLink(false); // Only set link if request is resolved, otherwise enable edit mode.

              if (newSuggestion) {
                onChange(newSuggestion);
                stopEditing();
              } else {
                setIsEditingLink(true);
              }

              _context2.next = 18;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](2);

              if (!(_context2.t0 && _context2.t0.isCanceled)) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return");

            case 15:
              setErrorMessage(_context2.t0.message || (0, _i18n.__)('An unknown error occurred during creation. Please try again.'));
              setIsResolvingLink(false);
              setIsEditingLink(true);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 11]]);
    }));

    return function handleOnCreate(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var handleSelectSuggestion = function handleSelectSuggestion(suggestion) {
    var _value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    setIsEditingLink(false);

    var __value = _objectSpread({}, _value); // Some direct entries don't have types or IDs, and we still need to clear the previous ones.


    delete __value.type;
    delete __value.id;
    onChange(_objectSpread({}, __value, {}, suggestion));
  }; // Render Components


  var renderSearchResults = function renderSearchResults(_ref4) {
    var suggestionsListProps = _ref4.suggestionsListProps,
        buildSuggestionItemProps = _ref4.buildSuggestionItemProps,
        suggestions = _ref4.suggestions,
        selectedSuggestion = _ref4.selectedSuggestion,
        isLoading = _ref4.isLoading,
        isInitialSuggestions = _ref4.isInitialSuggestions;
    var resultsListClasses = (0, _classnames.default)('block-editor-link-control__search-results', {
      'is-loading': isLoading
    });
    var directLinkEntryTypes = ['url', 'mailto', 'tel', 'internal'];
    var isSingleDirectEntryResult = suggestions.length === 1 && directLinkEntryTypes.includes(suggestions[0].type.toLowerCase());
    var shouldShowCreateSuggestion = createSuggestion && !isSingleDirectEntryResult && !isInitialSuggestions; // According to guidelines aria-label should be added if the label
    // itself is not visible.
    // See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role

    var searchResultsLabelId = "block-editor-link-control-search-results-label-".concat(instanceId);
    var labelText = isInitialSuggestions ? (0, _i18n.__)('Recently updated') : (0, _i18n.sprintf)(
    /* translators: %s: search term. */
    (0, _i18n.__)('Search results for "%s"'), inputValue); // VisuallyHidden rightly doesn't accept custom classNames
    // so we conditionally render it as a wrapper to visually hide the label
    // when that is required.

    var searchResultsLabel = (0, _element.createElement)(isInitialSuggestions ? _element.Fragment : _components.VisuallyHidden, {}, // empty props
    (0, _element.createElement)("span", {
      className: "block-editor-link-control__search-results-label",
      id: searchResultsLabelId
    }, labelText));
    return (0, _element.createElement)("div", {
      className: "block-editor-link-control__search-results-wrapper"
    }, searchResultsLabel, (0, _element.createElement)("div", (0, _extends2.default)({}, suggestionsListProps, {
      className: resultsListClasses,
      "aria-labelledby": searchResultsLabelId
    }), suggestions.map(function (suggestion, index) {
      if (shouldShowCreateSuggestion && CREATE_TYPE === suggestion.type) {
        return (0, _element.createElement)(_searchCreateButton.default, {
          searchTerm: inputValue,
          onClick: /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return handleOnCreate(suggestion.title);

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })) // Intentionally only using `type` here as
          // the constant is enough to uniquely
          // identify the single "CREATE" suggestion.
          ,
          key: suggestion.type,
          itemProps: buildSuggestionItemProps(suggestion, index),
          isSelected: index === selectedSuggestion
        });
      } // If we're not handling "Create" suggestions above then
      // we don't want them in the main results so exit early


      if (CREATE_TYPE === suggestion.type) {
        return null;
      }

      return (0, _element.createElement)(_searchItem.default, {
        key: "".concat(suggestion.id, "-").concat(suggestion.type),
        itemProps: buildSuggestionItemProps(suggestion, index),
        suggestion: suggestion,
        index: index,
        onClick: function onClick() {
          stopEditing();
          onChange(_objectSpread({}, value, {}, suggestion));
        },
        isSelected: index === selectedSuggestion,
        isURL: directLinkEntryTypes.includes(suggestion.type.toLowerCase()),
        searchTerm: inputValue
      });
    })));
  };

  return (0, _element.createElement)("div", {
    tabIndex: -1,
    ref: wrapperNode,
    className: "block-editor-link-control"
  }, isResolvingLink && (0, _element.createElement)("div", {
    className: "block-editor-link-control__loading"
  }, (0, _element.createElement)(_components.Spinner, null), " ", (0, _i18n.__)('Creating'), "\u2026"), (isEditingLink || !value) && !isResolvingLink && (0, _element.createElement)(_searchInput.default, {
    placeholder: searchInputPlaceholder,
    value: inputValue,
    onChange: onInputChange,
    onSelect: /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(suggestion) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(CREATE_TYPE === suggestion.type)) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 3;
                return handleOnCreate(inputValue);

              case 3:
                _context4.next = 6;
                break;

              case 5:
                if (!noDirectEntry || Object.keys(suggestion).length > 1) {
                  handleSelectSuggestion(suggestion, value);
                  stopEditing();
                }

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref6.apply(this, arguments);
      };
    }(),
    renderSuggestions: showSuggestions ? renderSearchResults : null,
    fetchSuggestions: getSearchHandler,
    showInitialSuggestions: showInitialSuggestions,
    errorMessage: errorMessage
  }), value && !isEditingLink && !isResolvingLink && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    "aria-label": (0, _i18n.__)('Currently selected'),
    "aria-selected": "true",
    className: (0, _classnames.default)('block-editor-link-control__search-item', {
      'is-current': true
    })
  }, (0, _element.createElement)("span", {
    className: "block-editor-link-control__search-item-header"
  }, (0, _element.createElement)(_components.ExternalLink, {
    className: "block-editor-link-control__search-item-title",
    href: value.url
  }, value && value.title || displayURL), value && value.title && (0, _element.createElement)("span", {
    className: "block-editor-link-control__search-item-info"
  }, displayURL)), (0, _element.createElement)(_components.Button, {
    isSecondary: true,
    onClick: function onClick() {
      return setIsEditingLink(true);
    },
    className: "block-editor-link-control__search-item-action"
  }, (0, _i18n.__)('Edit')), (0, _element.createElement)(ViewerSlot, {
    fillProps: value
  }))), (0, _element.createElement)(_settingsDrawer.default, {
    value: value,
    settings: settings,
    onChange: onChange
  }));
}

LinkControl.ViewerFill = ViewerFill;
var _default = LinkControl;
exports.default = _default;
//# sourceMappingURL=index.js.map