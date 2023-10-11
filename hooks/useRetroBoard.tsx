import { CardItemType, RetroBoardContext } from '@/context/RetroBoardProvider';
import { useContext } from 'react';

export function useRetroBoard() {
  const { cards, setCards } = useContext(RetroBoardContext);

  const addCard = ({ column_id, title }: Pick<CardItemType, 'column_id' | 'title' | 'order'>) => {
    setCards([...cards, { column_id, title, id: `d_${cards.length + 1}` }]);
  };

  const updateCard = (updatedItem: CardItemType) => {
    const updatedDraggables = [...cards].map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    setCards(updatedDraggables);
  };

  const updateCardTitle = ({ id, newTitle: title }: { id: string; newTitle: string }) => {
    const matchingItem = cards.find((cardItem) => cardItem.id === id);
    if (!matchingItem) {
      console.error('Error updateCardTitle: Card to update not found');
      return;
    }
    updateCard({ ...matchingItem, title });
  };

  const updateCardColumn = ({
    id,
    newColumn_id,
    draggedOverId,
  }: {
    id: string;
    newColumn_id: string;
    draggedOverId?: string;
  }) => {
    const matchingItem = cards.find((cardItem) => cardItem.id === id);
    if (!matchingItem) {
      console.error('Error updateCardColumn: Card to update not found');
      return;
    }
    //is dragged over card in same column?
    const updatedItem = { ...matchingItem, column_id: newColumn_id };
    const draggedOverItem = cards.find((cardItem) => cardItem.id === draggedOverId);
    const isInTheSameColumn = draggedOverItem?.column_id === newColumn_id;
    updatedItem.order = isInTheSameColumn
      ? draggedOverItem?.order
      : cards.filter((cardItem) => cardItem.column_id === newColumn_id).length + 1;

    const updatedItemList: CardItemType[] = cards.reduce((acc, item) => {
      if (item.id === updatedItem.id) {
        return [...acc, updatedItem];
      }
      if (item.column_id === newColumn_id && item.order! >= updatedItem.order!) {
        return [...acc, { ...item, order: item.order! + 1 }];
      }
      return [...acc, item];
    }, []);

    setCards(updatedItemList);
  };

  // const setCurrentDragOverId = (id: string) => {
  //   draggedOverIdRef.current = id;
  // };

  // const resetCurrentDragOverId = () => (draggedOverIdRef.current = null);

  return {
    addCard,
    cards,
    // resetCurrentDragOverId,
    // setCurrentDragOverId,
    updateCardColumn,
    updateCardTitle,
    updateCard,
  };
}
