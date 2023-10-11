import { CardType, ColumnType, RetroBoardContext } from '@/context/RetroBoardProvider';
import { Optional } from '@/utils/types';
import { useContext } from 'react';

const getColumnWithNewCard = (column: ColumnType, cardToAdd: CardType): ColumnType => ({
  ...column,
  cards: [...column.cards, cardToAdd],
});

const getColumnWithRemovedCard = (column: ColumnType, cardToRemove: CardType): ColumnType => ({
  ...column,
  cards: column.cards.filter((cardItem) => cardItem.id !== cardToRemove.id),
});

const getColumnWithUpdatedCard = (column: ColumnType, cardToUpdate: CardType): ColumnType => ({
  ...column,
  cards: column.cards.map((cardItem) => {
    if (cardItem.id !== cardToUpdate.id) {
      return cardItem;
    }
    return cardToUpdate;
  }),
});

const getUpdatedCard = (
  columns: ColumnType[],
  cardId: string,
  fieldsToUpdate: Partial<CardType>,
) => {
  const updatedCard = columns.reduce((acc, column) => {
    const cardToUpdate = column.cards.find((card) => card.id === cardId);
    if (cardToUpdate) {
      return { ...cardToUpdate, ...fieldsToUpdate };
    }
    return acc;
  }, {} as CardType);

  return updatedCard;
};

export function useRetroBoard() {
  const { columns, setColumns } = useContext(RetroBoardContext);

  const addColumn = (id?: string) => {
    setColumns((prev) => [...prev, { id: id || `dz-${prev.length}`, cards: [] }]);
  };

  const addCard = (card: Optional<CardType, 'id'>) => {
    const newCard = {
      ...card,
      id: `d_${columns.find((column) => column.id === card.column_id)!.cards.length}`,
    };
    const updatedBoard = columns.reduce((acc: ColumnType[], currentColumn) => {
      if (currentColumn.id !== card.column_id) {
        return [...acc, currentColumn];
      }
      return [...acc, getColumnWithNewCard(currentColumn, newCard)];
    }, []);
    setColumns(updatedBoard);
  };

  const updateCard = (card: CardType) => {
    const updatedBoard = columns.reduce((acc: ColumnType[], currentColumn) => {
      if (currentColumn.id !== card.column_id) {
        return [...acc, currentColumn];
      }
      return [...acc, getColumnWithUpdatedCard(currentColumn, card)];
    }, []);

    setColumns(updatedBoard);
  };

  const moveCardToColumn = ({ card, newColumnId }: { card: CardType; newColumnId: string }) => {
    const updatedBoard = columns.reduce((acc: ColumnType[], currentColumn) => {
      // add card to new column
      if (currentColumn.id === newColumnId) {
        return [...acc, getColumnWithNewCard(currentColumn, { ...card, column_id: newColumnId })];
      }
      // remove card from old column
      if (card.column_id === currentColumn.id) {
        return [...acc, getColumnWithRemovedCard(currentColumn, card)];
      }

      return [...acc, currentColumn];
    }, []);
    setColumns(updatedBoard);
  };

  return {
    addCard,
    addColumn,
    columns,
    moveCardToColumn,
    updateCard,
  };
}
