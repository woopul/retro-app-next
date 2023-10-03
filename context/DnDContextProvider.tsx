/* eslint-disable @typescript-eslint/no-empty-function */
import { MutableRefObject, createContext, createRef, useRef, useState } from 'react';

export type DraggableItemType = {
  id: string;
  column_id: string;
  title: string;
};

export type DnDContextType = {
  draggedOverIdRef: MutableRefObject<string | null>;
  cards: DraggableItemType[];
  setCards: React.Dispatch<React.SetStateAction<DraggableItemType[]>>;
};

// set empty initial values of context
export const DnDContext = createContext<DnDContextType>({
  draggedOverIdRef: createRef(),
  cards: [],
  setCards: () => {},
});

export type DnDProviderType = {
  children: React.ReactNode;
};

export function DnDProvider({ children }: DnDProviderType) {
  const [cards, setCards] = useState<DraggableItemType[]>([]);
  const draggedOverIdRef = useRef<string | null>(null);
  const value = { cards, setCards, draggedOverIdRef };
  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
}
