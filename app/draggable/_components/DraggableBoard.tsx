'use client';

import { BackgroundLight } from '@/components/BackgroundLight';
import { DropZone } from '@/components/DropZone';
import { useRetroBoard } from '@/hooks/useRetroBoard';
import { use, useEffect, useState } from 'react';

export default function DraggableBoard() {
  const { columns, addColumn } = useRetroBoard();
  useEffect(() => {
    addColumn();
    addColumn();
    addColumn();
  }, []);

  console.log('columns', columns);
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
        {columns.map(({ cards, id }) => (
          <DropZone items={cards} className="h-screen w-[300px]" column_id={id} />
        ))}
      </div>
    </main>
  );
}
