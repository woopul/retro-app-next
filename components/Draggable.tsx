import { DraggableItemType } from '@/context/DnDContextProvider';
import { cn } from '@/utils/cn';
import { useRef, useState } from 'react';
import { set } from 'zod';
import { ContentEditable } from './ContentEditable';

export const Draggable = ({ id, title }: DraggableItemType) => {
  const [content, setContent] = useState(title);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  // const handleOnInputChange = (e) => {
  //   console.log('input change on div', e);
  //   setContent(e.target.textContent || '');
  // };

  const handleOnInputChange2 = (content: string) => {
    setContent(content);
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
      {/* Expandable field to signal where to drop a card*/}
      <div className={cn(isDraggingOver && 'tranition-all pt-20 duration-500 ease-in-out')}></div>
      <div
        className={cn(
          'min-h-20 flex w-full max-w-xs flex-col justify-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
          isDraggingOver && 'bg-green-500/30 transition-all duration-300 ease-in-out',
        )}
      >
        <ContentEditable onChange={(inputText) => setContent(inputText)} html={content || '_'} />

        <h5 draggable={false}>id : {id}</h5>
      </div>
    </div>
  );
};
