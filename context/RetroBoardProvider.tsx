/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

export type CardType = {
  id: string;
  column_id: string;
  order?: number;
  title: string;
};

export type ColumnType = {
  id: string;
  cards: string[];
};

export type RetroBoardContextType = {
  cards: CardType[];
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export const RetroBoardContext = createContext<RetroBoardContextType>({
  cards: [],
  columns: [],
  setColumns: () => {},
  setCards: () => {},
});

export type RetroBoardProviderType = {
  children: React.ReactNode;
};

export function RetroBoardProvider({ children }: RetroBoardProviderType) {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const value = { columns, setColumns, cards, setCards };
  return <RetroBoardContext.Provider value={value}>{children}</RetroBoardContext.Provider>;
}
