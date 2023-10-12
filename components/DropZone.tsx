import { DATA_TRANSFER_JSON } from '@/constants/dataTransfer';
import { DnDContext } from '@/context/DnDProvider';
import { CardType } from '@/context/RetroBoardProvider';
import { useRetroBoard } from '@/hooks/useRetroBoard';
import { cn } from '@/utils/cn';
import { useContext, useState } from 'react';
import { AddButton } from './AddButton';
import { Draggable } from './Draggable';

export type DropZoneProps = {
  column_id: string;
  className?: string;
  items: CardType[];
};

export const DropZone = ({ className, column_id, items }: DropZoneProps) => {
  const [active, setActive] = useState(false);
  const { addNewCard, moveCardToColumn } = useRetroBoard();
  const dndContext = useContext(DnDContext);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    e.preventDefault();
    const cardToMove = e.dataTransfer.getData(DATA_TRANSFER_JSON);
    moveCardToColumn({ card: JSON.parse(cardToMove), newColumnId: column_id });
    console.log('drop', { data: e.dataTransfer.getData(DATA_TRANSFER_JSON) });
    console.log(dndContext);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
    // console.log('dragEnter', e);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    // console.log('dragLeave', e);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log('dragOver', e);
  };

  const handleAddCard = () =>
    addNewCard({
      column_id,
      title: 'Drag And Drop this(you can edit)',
      order: items.length + 1,
    });

  return (
    <div
      id={column_id}
      className={cn(
        'relative flex h-full flex-col items-center gap-2 bg-white/5',
        active && 'bg-white/10',
        className,
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      // ------------------- DROP ZONE BECAUSE OF BELOW ---------------------
      // For an element to become a drop zone or droppable, the element must have both ondragover and ondrop event handler attributes.
      // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#specifying_drop_targets
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {items.map((cardItem) => (
        <Draggable key={cardItem.id} {...cardItem} />
      ))}
      <AddButton onClick={handleAddCard} className="sticky bottom-5 mt-auto" />
    </div>
  );
};
