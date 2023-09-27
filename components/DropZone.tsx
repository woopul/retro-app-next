import { DraggableItemType } from '@/context/DnDContextProvider';
import { useDragAndDrop } from '@/hooks/useDnD';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { AddButton } from './AddButton';
import { Draggable } from './Draggable';

export type DropZoneProps = {
  column_id: string;
  className?: string;
  items: { id: string; column_id: string }[];
};

export const DropZone = ({ className, column_id, items }: DropZoneProps) => {
  const [active, setActive] = useState(false);
  const { addCard, updateCard } = useDragAndDrop();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text/plain');
    updateCard({ id: droppedItemId, column_id, title: 'moved' });
    console.log('drop', { data: e.dataTransfer.getData('text/plain') });
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

  const handleAddCard = () => addCard({ column_id, title: 'Drag And Drop this(you can edit)' });

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
      {items.map(({ id }) => (
        <Draggable key={id} id={id} />
      ))}
      <AddButton onClick={handleAddCard} className="sticky bottom-5 mt-auto" />
    </div>
  );
};
