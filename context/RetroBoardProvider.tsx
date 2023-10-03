/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

export type CardItemType = {
  id: string;
  column_id: string;
  title: string;
};

export type RetroBoardContextType = {
  cards: CardItemType[];
  setCards: React.Dispatch<React.SetStateAction<CardItemType[]>>;
};

// set empty initial values of context
export const RetroBoardContext = createContext<RetroBoardContextType>({
  cards: [],
  setCards: () => {},
});

export type RetroBoardProviderType = {
  children: React.ReactNode;
};

export function RetroBoardProvider({ children }: RetroBoardProviderType) {
  const [cards, setCards] = useState<CardItemType[]>([]);
  const value = { cards, setCards };
  return <RetroBoardContext.Provider value={value}>{children}</RetroBoardContext.Provider>;
}
