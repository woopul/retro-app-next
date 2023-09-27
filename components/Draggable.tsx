import { DraggableItemType } from '@/context/DnDContextProvider';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { set } from 'zod';
import { ContentEditable } from './ContentEditable';

export const Draggable = ({ id, title }: DraggableItemType) => {
  const [content, setContent] = useState(title);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { updateCardTitle } = useDragAndDrop();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(title);
  }, [title]);

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
  };

  const handleDragLeave = (e) => {
    console.log('%cdLeave', 'background: red', {
      id,
      target: e.target,
      relatedTarget: e.relatedTarget,
      current: ref.current,
    });
    e.preventDefault();
    const target = e.target;
    const relatedTarget = e.relatedTarget;

    // Check if the related target is not a descendant of the card
    if (!ref.current?.contains(relatedTarget)) {
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
      ref={ref}
      className="w-full"
    >
      <div
        className={cn('tranition-all pt-0 duration-500 ease-in-out', isDraggingOver && 'pt-20')}
      ></div>
      <div
        className={cn(
          'min-h-20 flex w-full max-w-xs flex-col justify-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
          isDraggingOver && 'bg-green-500/30 transition-all duration-300 ease-in-out',
        )}
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
