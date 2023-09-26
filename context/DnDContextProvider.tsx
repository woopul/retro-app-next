/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

export type DraggableItemType = {
  id: string;
  column_id: string;
  title: string;
};

export type DnDContextType = {
  cards: DraggableItemType[];
  setCards: React.Dispatch<React.SetStateAction<DraggableItemType[]>>;
};

// set empty initial values of context
export const DnDContext = createContext<DnDContextType>({
  cards: [],
  setCards: () => {},
});

export type DnDProviderType = {
  children: React.ReactNode;
};

export function DnDProvider({ children }: DnDProviderType) {
  const [cards, setCards] = useState<DraggableItemType[]>([]);
  const value = { cards, setCards };
  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
}
