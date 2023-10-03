import { DnDContext } from '@/context/DnDProvider';
import { useContext, useState } from 'react';

const isDragOverElementStarted = (ref, e) => ref.current === e.target;
const isDragOverElementFinished = (ref, e) => !ref.current.contains(e.relatedTarget);

export function useDnD({ ref }) {
  const { setIsDragging } = useContext(DnDContext);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // e.dataTransfer.setData('text/plain', id);
    console.log('dragStart', e);
  };

  const handleDragEnter = (e) => {
    console.log('%cdragEnter', 'background: green', {
      target: e.target,
      relatedTarget: e.relatedTarget,
    });
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    console.log('%cdLeave', 'background: red', {
      target: e.target,
      relatedTarget: e.relatedTarget,
      current: ref.current,
    });
    e.preventDefault();
    // Check if the related target is not a descendant of the card
    if (isDragOverElementFinished(ref, e)) {
      setIsDraggingOver(false);
    }
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDraggingOver(false); // The dragged card is no longer over this card
  };

  const registerDropZone = () => ({
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  });

  const registerDraggable = () => ({
    draggable: true,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  });

  return {
    isDraggingOver,
    registerDraggable,
    registerDropZone,
  };
}
