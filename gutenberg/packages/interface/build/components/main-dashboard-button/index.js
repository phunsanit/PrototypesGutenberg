"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var slotName = '__experimentalMainDashboardButton';

var _createSlotFill = (0, _components.createSlotFill)(slotName),
    Fill = _createSlotFill.Fill,
    MainDashboardButtonSlot = _createSlotFill.Slot;

var MainDashboardButton = Fill;

var Slot = function Slot(_ref) {
  var children = _ref.children;
  var slot = (0, _components.__experimentalUseSlot)(slotName);
  var hasFills = Boolean(slot.fills && slot.fills.length);

  if (!hasFills) {
    return children;
  }

  return (0, _element.createElement)(MainDashboardButtonSlot, {
    bubblesVirtually: true
  });
};

MainDashboardButton.Slot = Slot;
var _default = MainDashboardButton;
exports.default = _default;
//# sourceMappingURL=index.js.map