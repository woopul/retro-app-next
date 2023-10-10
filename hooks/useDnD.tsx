import { DnDContext } from '@/context/DnDProvider';
import { RefObject, useContext, useState } from 'react';

const isDragOverElementStarted = (ref: RefObject<HTMLElement>, e: React.DragEvent<HTMLElement>) =>
  ref.current === e.target;
const isDragOverElementFinished = (ref: RefObject<HTMLElement>, e: React.DragEvent<HTMLElement>) =>
  !ref.current?.contains(e.relatedTarget as Node);

type UseDnDType = {
  ref: RefObject<HTMLElement>;
  dataTransfer?: string;
};

export function useDnD({ ref, dataTransfer = '' }: UseDnDType) {
  const { setIsDragging, draggedOverRef, draggedElementRef, isDragging } = useContext(DnDContext);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', dataTransfer);
    console.log('dragStart', e);
    draggedElementRef.current = ref.current;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    console.log('%cdragEnter', 'background: green', {
      target: e.target,
      relatedTarget: e.relatedTarget,
    });
    e.preventDefault();
    draggedOverRef.current = ref.current;
    setIsDraggingOver(draggedOverRef.current !== draggedElementRef.current);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
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

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setIsDragging(false);
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDraggingOver(false); // The dragged card is no longer over this card
    console.log('%cdrop', 'background: blue', { draggedOverRef, isDragging });
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
    draggedOverRef,
    registerDraggable,
    registerDropZone,
  };
}
