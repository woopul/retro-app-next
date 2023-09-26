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
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // e.preventDefault();
    e.dataTransfer.setData('text/plain', id);
    console.log('dragStart', e);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('dragEnd', e);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // if (e.currentTarget !== ref.current) {
    //   return;
    // }
    console.log('%cdragEnter', 'background: red', { id, hovered: !hovered });
    setHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // if (e.currentTarget !== ref.current) {
    //   return;
    // }
    console.log('%cdragLeave', 'background: red', { id, hovered: !hovered });
    setHovered(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // e.preventDefault();
    // if (!hovered) {
    //   setHovered(true);
    // }
  };

  return (
    <div
      draggable
      className={cn(
        'min-h-20 flex w-full max-w-xs flex-col justify-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
        hovered && 'bg-green-500/30 ',
      )}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      // onDrop={(e) => {
      //   e.preventDefault();
      //   console.log('drop', { data: e.dataTransfer.getData('text/plain') });
      // }}
      onInput={(e) => setContent(e.currentTarget.textContent || '')}
      ref={ref}
    >
      <h3 contentEditable className="text-xl font-bold">
        {content}
      </h3>
      <h5>id : {id}</h5>
    </div>
  );
};
