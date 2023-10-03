import { DnDContext, DraggableItemType } from '@/context/DnDContextProvider';
import { useContext, useState } from 'react';

export function useDnD({ ref }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', id);
    console.log('dragStart', e);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Check if the related target is not a descendant of the card
    if (!ref.current?.contains(e.relatedTarget)) {
      setIsDraggingOver(false);
    }
  };

  const handleDragEnd = (e) => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false); // The dragged card is no longer over this card
  };

  const registerDropZone = () => ({
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  });

  return {
    registerDraggable,
    registerDropZone,
  };
}
