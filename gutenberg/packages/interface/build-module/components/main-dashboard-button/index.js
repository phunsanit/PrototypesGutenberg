import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalUseSlot as useSlot, createSlotFill } from '@wordpress/components';
var slotName = '__experimentalMainDashboardButton';

var _createSlotFill = createSlotFill(slotName),
    Fill = _createSlotFill.Fill,
    MainDashboardButtonSlot = _createSlotFill.Slot;

var MainDashboardButton = Fill;

var Slot = function Slot(_ref) {
  var children = _ref.children;
  var slot = useSlot(slotName);
  var hasFills = Boolean(slot.fills && slot.fills.length);

  if (!hasFills) {
    return children;
  }

  return createElement(MainDashboardButtonSlot, {
    bubblesVirtually: true
  });
};

MainDashboardButton.Slot = Slot;
export default MainDashboardButton;
//# sourceMappingURL=index.js.map