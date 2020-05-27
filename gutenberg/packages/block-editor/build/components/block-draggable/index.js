"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var BlockDraggable = function BlockDraggable(_ref) {
  var children = _ref.children,
      clientIds = _ref.clientIds;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlockIndex = _select.getBlockIndex,
        getBlockRootClientId = _select.getBlockRootClientId,
        getTemplateLock = _select.getTemplateLock;

    var rootClientId = clientIds.length === 1 ? getBlockRootClientId(clientIds[0]) : null;
    var templateLock = rootClientId ? getTemplateLock(rootClientId) : null;
    return {
      index: getBlockIndex(clientIds[0], rootClientId),
      srcRootClientId: rootClientId,
      isDraggable: clientIds.length === 1 && 'all' !== templateLock
    };
  }, [clientIds]),
      srcRootClientId = _useSelect.srcRootClientId,
      index = _useSelect.index,
      isDraggable = _useSelect.isDraggable;

  var isDragging = (0, _element.useRef)(false);

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      startDraggingBlocks = _useDispatch.startDraggingBlocks,
      stopDraggingBlocks = _useDispatch.stopDraggingBlocks; // Stop dragging blocks if the block draggable is unmounted


  (0, _element.useEffect)(function () {
    return function () {
      if (isDragging.current) {
        stopDraggingBlocks();
      }
    };
  }, []);

  if (!isDraggable) {
    return children({
      isDraggable: false
    });
  }

  var blockElementId = "block-".concat(clientIds[0]);
  var transferData = {
    type: 'block',
    srcIndex: index,
    srcClientId: clientIds[0],
    srcRootClientId: srcRootClientId
  };
  return (0, _element.createElement)(_components.Draggable, {
    elementId: blockElementId,
    transferData: transferData,
    onDragStart: function onDragStart() {
      startDraggingBlocks();
      isDragging.current = true;
    },
    onDragEnd: function onDragEnd() {
      stopDraggingBlocks();
      isDragging.current = false;
    }
  }, function (_ref2) {
    var onDraggableStart = _ref2.onDraggableStart,
        onDraggableEnd = _ref2.onDraggableEnd;
    return children({
      isDraggable: true,
      onDraggableStart: onDraggableStart,
      onDraggableEnd: onDraggableEnd
    });
  });
};

var _default = BlockDraggable;
exports.default = _default;
//# sourceMappingURL=index.js.map