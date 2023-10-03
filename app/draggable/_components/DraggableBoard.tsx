'use client';

import { BackgroundLight } from '@/components/BackgroundLight';
import { DropZone } from '@/components/DropZone';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useState } from 'react';

export default function DraggableBoard() {
  const [dropZones, setDropZones] = useState([
    { column_id: 'dz_1' },
    { column_id: 'dz_2' },
    { column_id: 'dz_3' },
  ]);
  const { cards } = useDragAndDrop();

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <BackgroundLight />
      <h1 className="pt-16 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <span className="bg-gradient-to-r from-sky-900 via-[#0141ff] bg-clip-text text-transparent">
          Draggable
        </span>{' '}
        PoC
      </h1>
      <div className="flex gap-5 pt-16">
        {dropZones.map(({ column_id: currentItem_id }) => (
          <DropZone
            items={cards.filter(({ column_id }) => column_id === currentItem_id)}
            className="h-screen w-[300px]"
            column_id={currentItem_id}
          />
        ))}
      </div>
    </main>
  );
}
