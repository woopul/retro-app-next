import { CardType, ColumnType, RetroBoardContext } from '@/context/RetroBoardProvider';
import { useContext } from 'react';

export function useRetroBoard() {
  const { columns, setColumns } = useContext(RetroBoardContext);

  const addColumn = (id?: string) => {
    setColumns((prev) => [...prev, { id: id || `dz-${prev.length + 1}`, cards: [] }]);
  };

  const addCard = (card: CardType) => {
    const updatedBoard = columns.reduce((acc: ColumnType[], currentColumn) => {
      if (currentColumn.id !== card.column_id) {
        return [...acc, currentColumn];
      }
      return [
        ...acc,
        {
          ...currentColumn,
          cards: [...currentColumn.cards, card],
        },
      ];
    }, []);
    setColumns(updatedBoard);
  };

  const updateCard = (updatedCard: CardType) => {
    const updatedBoard = columns.reduce((acc: ColumnType[], currentColumn) => {
      if (currentColumn.id !== updatedCard.column_id) {
        return [...acc, currentColumn];
      }
      return [
        ...acc,
        {
          ...currentColumn,
          cards: currentColumn.cards.map((card) => {
            if (card.id !== updatedCard.id) {
              return card;
            }
            return updatedCard;
          }),
        },
      ];
    }, []);

    setColumns(updatedBoard);
  };

  // const updateCardTitle = ({ id, newTitle: title }: { id: string; newTitle: string }) => {
  //   const matchingItem = cards.find((cardItem) => cardItem.id === id);
  //   if (!matchingItem) {
  //     console.error('Error updateCardTitle: Card to update not found');
  //     return;
  //   }
  //   updateCard({ ...matchingItem, title });
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
