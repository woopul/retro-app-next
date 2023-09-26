import { cn } from '@/utils/cn';
import { useRef, useState } from 'react';
import { set } from 'zod';

const mockLabels = {
  content: 'Grab this, move, drop (and edit) as you wish',
};

export type DraggableProps = {
  id: string;
};

export const Draggable = ({ id }: DraggableProps) => {
  const [content, setContent] = useState(mockLabels.content);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const isHoveringChildRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // e.preventDefault();
    e.dataTransfer.setData('text/plain', id);
    console.log('dragStart', e);
  };

  // const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   console.log('dragEnd', e);
  // };
  // const handleDragEnter = (e) => {
  //   e.preventDefault();
  //   setIsDraggingOver(true);
  //   if (!isHoveringChildRef.current) {
  //     console.log('%cdragEnter', 'background: red', { id });
  //   }
  // };

  // const handleDragLeave = (e) => {
  //   e.preventDefault();
  //   setIsDraggingOver(false);
  //   if (!isHoveringChildRef.current) {
  //     console.log('%cdragLeave', 'background: red', { id });
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   // e.preventDefault();
  //   // if (!hovered) {
  //   //   setHovered(true);
  //   // }
  // };

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

  // const handleChildEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  //   console.log('%cchildEnter', 'background: yellow');
  //   isHoveringChildRef.current = true;
  // };

  // const handleChildLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  //   console.log('%cchildLeave', 'background: yellow');
  //   isHoveringChildRef.current = false;
  // };

  // const handleDragOverChild = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation(); // Prevent child elements from interfering with the drag-and-drop
  // };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      // onDrop={(e) => {
      //   e.preventDefault();
      //   console.log('drop', { data: e.dataTransfer.getData('text/plain') });
      // }}
      onInput={(e) => setContent(e.currentTarget.textContent || '')}
      ref={ref}
    >
      <div
        className={cn(
          'min-h-20 flex w-full max-w-xs flex-col justify-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
          isDraggingOver && 'bg-green-500/30 transition-all duration-300 ease-in-out',
        )}
      >
        <h3 draggable={false} contentEditable className="text-xl font-bold">
          {content}
        </h3>
        <h5 draggable={false}>id : {id}</h5>
      </div>
    </div>
  );
};
