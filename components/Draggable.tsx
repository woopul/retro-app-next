import { DraggableItemType } from '@/context/DnDContextProvider';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { ContentEditable } from './ContentEditable';

const isDragOverElementStarted = (ref, e) => ref.current === e.target;
const isDragOverElementFinished = (ref, e) => !ref.current.contains(e.relatedTarget);

export const Draggable = ({ id, title }: DraggableItemType) => {
  const [content, setContent] = useState(title);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDraggingOverCard, setIsDraggingOverCard] = useState(false);
  const [isDraggingOverSpace, setIsDraggingOverSpace] = useState(false);
  const { updateCardTitle, setCurrentDragOverId, resetCurrentDragOverId } = useDragAndDrop();
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const spaceAboveCardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(title);
  }, [title]);

  useEffect(() => {
    console.log({ id, isDraggingOver });
    if (isDraggingOver) {
      setCurrentDragOverId(id);
      return;
    }
    resetCurrentDragOverId();
  }, [isDraggingOver]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', id);
    console.log('dragStart', e);
  };

  const handleDragEnter = (e) => {
    console.log('%cdragEnter', 'background: green', {
      id,
      target: e.target,
      relatedTarget: e.relatedTarget,
    });
    e.preventDefault();
    setIsDraggingOver(true);
    setIsDraggingOverCard(isDragOverElementStarted(cardRef, e));
    setIsDraggingOverSpace(isDragOverElementStarted(spaceAboveCardRef, e));
  };

  const handleDragLeave = (e) => {
    console.log('%cdLeave', 'background: red', {
      id,
      target: e.target,
      relatedTarget: e.relatedTarget,
      current: cardContainerRef.current,
    });
    e.preventDefault();
    const { relatedTarget, target } = e;

    // Check if the related target is not a descendant of the card
    if (!cardContainerRef.current?.contains(relatedTarget)) {
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

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      ref={cardContainerRef}
      className="w-full"
    >
      <div
        className={cn(
          'tranition-all pt-0 duration-300 ease-in-out',
          isDraggingOver && 'border border-dashed border-orange-200 pt-20',
          isDraggingOverSpace && 'bg-green-500/30',
        )}
        ref={spaceAboveCardRef}
      ></div>
      <div
        className={cn(
          'min-h-20 flex w-full max-w-xs flex-col justify-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
          isDraggingOverCard && 'bg-green-500/30 transition-all duration-300 ease-in-out',
        )}
        ref={cardRef}
      >
        <ContentEditable
          onChange={(newTitle) => updateCardTitle({ id, newTitle })}
          html={content}
        />

        <h5 draggable={false}>id : {id}</h5>
      </div>
    </div>
  );
};
