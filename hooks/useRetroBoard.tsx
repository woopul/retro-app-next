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

  // const moveCardToColumn = ({ cardId, newColumnId }: { cardId: string; newColumnId: string }) => {
  //   const updatedCard = getUpdatedCard(columns, cardId, { column_id: newColumnId });
  //   const updatedBoard = columns.reduce((acc: ColumnType[], currentColumn) => {
  //     if (currentColumn.id === newColumnId) {
  //       return [...acc, getColumnWithNewCard(currentColumn, updatedCard)];
  //     }
  //     if()
  //     return [
  //       ...acc,
  //       {
  //         ...currentColumn,
  //         cards: [...currentColumn.cards, card],
  //       },
  //     ];
  //   }, []);
  //   setColumns(updatedBoard);
  // };

  // const updateCardColumn = ({
  //   id,
  //   newColumn_id,
  //   draggedOverId,
  // }: {
  //   id: string;
  //   newColumn_id: string;
  //   draggedOverId?: string;
  // }) => {
  //   const matchingItem = cards.find((cardItem) => cardItem.id === id);
  //   if (!matchingItem) {
  //     console.error('Error updateCardColumn: Card to update not found');
  //     return;
  //   }
  //   //is dragged over card in same column?
  //   const updatedItem = { ...matchingItem, column_id: newColumn_id };
  //   const draggedOverItem = cards.find((cardItem) => cardItem.id === draggedOverId);
  //   const isInTheSameColumn = draggedOverItem?.column_id === newColumn_id;
  //   updatedItem.order = isInTheSameColumn
  //     ? draggedOverItem?.order
  //     : cards.filter((cardItem) => cardItem.column_id === newColumn_id).length + 1;

  //   const updatedItemList: CardType[] = cards.reduce((acc, item) => {
  //     if (item.id === updatedItem.id) {
  //       return [...acc, updatedItem];
  //     }
  //     if (item.column_id === newColumn_id && item.order! >= updatedItem.order!) {
  //       return [...acc, { ...item, order: item.order! + 1 }];
  //     }
  //     return [...acc, item];
  //   }, []);

  //   setColumns(updatedItemList);
  // };

  return {
    addCard,
    addColumn,
    columns,
    // resetCurrentDragOverId,
    // setCurrentDragOverId,
    // updateCardColumn,
    // updateCardTitle,
    updateCard,
  };
}
