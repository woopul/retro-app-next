import { CardItemType, RetroBoardContext } from '@/context/RetroBoardProvider';
import { useContext } from 'react';

export function useDragAndDrop() {
  const { cards, setCards } = useContext(RetroBoardContext);

  const addCard = ({ column_id, title }: Pick<CardItemType, 'column_id' | 'title'>) => {
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

  const updateCardColumn = ({ id, newColumn_id }: { id: string; newColumn_id: string }) => {
    const matchingItem = cards.find((cardItem) => cardItem.id === id);
    if (!matchingItem) {
      console.error('Error updateCardColumn: Card to update not found');
      return;
    }
    updateCard({ ...matchingItem, column_id: newColumn_id });
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
