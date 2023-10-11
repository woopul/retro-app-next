import { DnDContext } from '@/context/DnDProvider';
import { CardType } from '@/context/RetroBoardProvider';
import { useDnD } from '@/hooks/useDnD';
import { useRetroBoard } from '@/hooks/useRetroBoard';
import { cn } from '@/utils/cn';
import { useContext, useEffect, useRef, useState } from 'react';
import { ContentEditable } from './ContentEditable';

export const Draggable = ({ id, title, order }: CardType) => {
  const [content, setContent] = useState(title);
  const { updateCardTitle } = useRetroBoard();
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const spaceAboveCardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerDnd = useDnD({ ref: cardContainerRef, dataTransfer: id });
  const spaceDnD = useDnD({ ref: spaceAboveCardRef });
  const cardDnD = useDnD({ ref: cardRef });
  const { draggedElementRef } = useContext(DnDContext);

  useEffect(() => {
    setContent(title);
  }, [title]);

  return (
    <div
      {...containerDnd.registerDropZone()}
      {...containerDnd.registerDraggable()}
      ref={cardContainerRef}
      className="w-full"
      id={id}
    >
      <div
        className={cn(
          'tranition-all pt-0 duration-300 ease-in-out',
          containerDnd.isDraggingOver && '-mb-1 border border-b-0 border-dashed border-orange-200',
          spaceDnD.isDraggingOver && 'bg-green-500/30',
        )}
        style={{
          paddingTop: containerDnd.isDraggingOver ? draggedElementRef.current.clientHeight : 0,
        }}
        ref={spaceAboveCardRef}
        {...spaceDnD.registerDropZone()}
      ></div>
      <div
        className={cn(
          'min-h-20 z-10 flex w-full max-w-xs flex-col justify-center gap-2 overflow-hidden rounded-xl bg-white/10 p-4 text-white hover:bg-white/20',
          cardDnD.isDraggingOver && 'bg-green-500/30 transition-all duration-300 ease-in-out',
        )}
        {...cardDnD.registerDropZone()}
        ref={cardRef}
      >
        <ContentEditable
          onChange={(newTitle) => updateCardTitle({ id, newTitle })}
          html={content}
        />
        <div>
          <h5 className="inline" draggable={false}>
            id : {id}
          </h5>
          <h5 className="ml-5 inline" draggable={false}>
            order : {order}
          </h5>
        </div>
      </div>
    </div>
  );
};
