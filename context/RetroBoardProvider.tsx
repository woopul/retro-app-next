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
  cardItems: string[];
};

export type BoardType = {
  cards: CardType[];
  columns: ColumnType[];
};

export type RetroBoardContextType = {
  board: BoardType;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

export const RetroBoardContext = createContext<RetroBoardContextType>({
  board: { cards: [], columns: [] },
  setBoard: () => ({ cards: [], columns: [] }),
});

export type RetroBoardProviderType = {
  children: React.ReactNode;
};

export function RetroBoardProvider({ children }: RetroBoardProviderType) {
  const [board, setBoard] = useState<BoardType>({ cards: [], columns: [] });
  const value = { board, setBoard };
  return <RetroBoardContext.Provider value={value}>{children}</RetroBoardContext.Provider>;
}
