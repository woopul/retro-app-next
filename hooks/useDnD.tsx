import { DATA_TRANSFER_JSON } from '@/constants/dataTransfer';
import { DnDContext } from '@/context/DnDProvider';
import { RefObject, useContext, useState } from 'react';

const isDragOverElementStarted = (ref: RefObject<HTMLElement>, e: React.DragEvent<HTMLElement>) =>
  ref.current === e.target;
const isDragOverElementFinished = (ref: RefObject<HTMLElement>, e: React.DragEvent<HTMLElement>) =>
  !ref.current?.contains(e.relatedTarget as Node);

type UseDnDType = {
  ref: RefObject<HTMLElement>;
  dataTransfer?: string;
  onDrop?: (e: React.DragEvent<HTMLElement>) => void;
  name?: string;
};

const log = (
  { target, currentTarget, relatedTarget }: React.DragEvent<HTMLElement>,
  name: string,
  color: string,
  additionalData: object = {},
) =>
  console.log(`%c${name}`, `background: ${color}`, {
    ...additionalData,
    target,
    currentTarget,
    relatedTarget,
  });

export function useDnD({ ref, dataTransfer = '', onDrop, name }: UseDnDType) {
  const { setIsDragging, draggedOverRef, draggedElementRef, isDragging } = useContext(DnDContext);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData(DATA_TRANSFER_JSON, dataTransfer);
    draggedElementRef.current = ref.current;
    log(e, 'Start', 'lightgreen');
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    draggedOverRef.current = ref.current;
    setIsDraggingOver(draggedOverRef.current !== draggedElementRef.current);
    log(e, 'Enter', 'green');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    // Check if the related target is not a descendant of the card
    if (isDragOverElementFinished(ref, e)) {
      draggedOverRef.current = null;
      setIsDraggingOver(false);
    }
    log(e, 'Leave', 'red');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setIsDragging(false);
    setIsDraggingOver(false);
    log(e, 'End', '#000');
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDraggingOver(false); // The dragged card is no longer over this card
    onDrop?.(e);
    log(e, 'Drop', 'blue', { name });
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
