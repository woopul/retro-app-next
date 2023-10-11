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
  cards: CardType[];
};

export type RetroBoardContextType = {
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

// set empty initial values of context
export const RetroBoardContext = createContext<RetroBoardContextType>({
  columns: [],
  setColumns: () => {},
});

export type RetroBoardProviderType = {
  children: React.ReactNode;
};

export function RetroBoardProvider({ children }: RetroBoardProviderType) {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const value = { columns, setColumns };
  return <RetroBoardContext.Provider value={value}>{children}</RetroBoardContext.Provider>;
}
