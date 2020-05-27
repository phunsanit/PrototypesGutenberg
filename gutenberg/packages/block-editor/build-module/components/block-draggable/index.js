import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Draggable } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

var BlockDraggable = function BlockDraggable(_ref) {
  var children = _ref.children,
      clientIds = _ref.clientIds;

  var _useSelect = useSelect(function (select) {
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

  var isDragging = useRef(false);

  var _useDispatch = useDispatch('core/block-editor'),
      startDraggingBlocks = _useDispatch.startDraggingBlocks,
      stopDraggingBlocks = _useDispatch.stopDraggingBlocks; // Stop dragging blocks if the block draggable is unmounted


  useEffect(function () {
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
  return createElement(Draggable, {
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

export default BlockDraggable;
//# sourceMappingURL=index.js.map