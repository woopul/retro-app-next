import { CardItemType } from '@/context/RetroBoardProvider';
import { useDnD } from '@/hooks/useDnD';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { cn } from '@/utils/cn';
import { useRef, useState } from 'react';
import { ContentEditable } from './ContentEditable';

export const Draggable = ({ id, title }: CardItemType) => {
  const [content, setContent] = useState(title);
  const { updateCardTitle } = useDragAndDrop();
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const spaceAboveCardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerDnd = useDnD({ ref: cardContainerRef });
  const spaceDnD = useDnD({ ref: spaceAboveCardRef });
  const cardDnD = useDnD({ ref: cardRef });

  return (
    <div
      {...containerDnd.registerDropZone()}
      {...containerDnd.registerDraggable()}
      ref={cardContainerRef}
      className="w-full"
    >
      <div
        className={cn(
          'tranition-all pt-0 duration-300 ease-in-out',
          containerDnd.isDraggingOver && 'border border-dashed border-orange-200 pt-20',
          spaceDnD.isDraggingOver && 'bg-green-500/30',
        )}
        ref={spaceAboveCardRef}
        {...spaceDnD.registerDropZone()}
      ></div>
      <div
        className={cn(
          'min-h-20 flex w-full max-w-xs flex-col justify-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
          cardDnD.isDraggingOver && 'bg-green-500/30 transition-all duration-300 ease-in-out',
        )}
        {...cardDnD.registerDropZone()}
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
