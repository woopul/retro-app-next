import { DnDContext, DraggableItemType } from '@/context/DnDContextProvider';
import { useContext } from 'react';

export function useDragAndDrop() {
  const { cards, setCards } = useContext(DnDContext);

  const addCard = ({ column_id, title }: Pick<DraggableItemType, 'column_id' | 'title'>) => {
    console.log('addCard', { column_id, title });
    setCards([...cards, { column_id, title, id: `d_${cards.length + 1}` }]);
  };

  const updateCard = (updatedItem: DraggableItemType) => {
    const updatedDraggables = [...cards].map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    setCards(updatedDraggables);
  };

  return { addCard, updateCard, cards };
}
