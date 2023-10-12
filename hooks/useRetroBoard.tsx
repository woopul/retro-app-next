import { CardType, ColumnType, RetroBoardContext } from '@/context/RetroBoardProvider';
import { Optional } from '@/utils/types';
import { useContext } from 'react';
import { set } from 'zod';

const getColumnWithNewCard = (column: ColumnType, { id }: CardType): ColumnType => ({
  ...column,
  cardItems: [...column.cardItems, id],
});

const getColumnWithRemovedCard = (column: ColumnType, cardToRemove: CardType): ColumnType => ({
  ...column,
  cardItems: column.cardItems.filter((cardId) => cardId !== cardToRemove.id),
});

const getColumnWithUpdatedCard = (column: ColumnType, cardToUpdate: CardType): ColumnType => ({
  ...column,
  cardItems: column.cardItems.map((cardId) =>
    cardId === cardToUpdate.id ? cardToUpdate.id : cardId,
  ),
});

export function useRetroBoard() {
  const { board, setBoard } = useContext(RetroBoardContext);
  const { cards, columns } = board;

  const getUpdatedCards = (cardToUpdate: CardType) =>
    cards.map((item) => (item.id === cardToUpdate.id ? cardToUpdate : item));

  const addColumn = (id?: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { id: id || `dz-${prev.columns.length}`, cardItems: [] }],
    }));
  };

  // Can add new card, or move card from another column
  const addNewCard = (card: Optional<CardType, 'id'>) => {
    const newCard = { ...card, id: `d_${cards.length}` };
    const updatedCards = [...cards, newCard];
    const updatedColumns = columns.map((column) =>
      column.id === card.column_id ? getColumnWithNewCard(column, newCard) : column,
    );
    setBoard({ cards: updatedCards, columns: updatedColumns });
  };

  const updateCard = (card: CardType) => {
    const updatedCards = getUpdatedCards(card);
    setBoard({ cards: updatedCards, columns });
  };

  const moveCardToColumn = async ({
    card,
    newColumnId,
  }: {
    card: CardType;
    newColumnId: string;
  }) => {
    const updatedCards = getUpdatedCards({ ...card, column_id: newColumnId });
    const updatedColumns = columns.reduce((acc: ColumnType[], { id }) => {
      return [
        ...acc,
        {
          id,
          cardItems: cards.filter((item) => item.column_id === id).map((item) => item.id),
        },
      ];
    }, []);

    setBoard({ cards: updatedCards, columns: updatedColumns });
  };

  return {
    addNewCard,
    addColumn,
    columns,
    cards,
    moveCardToColumn,
    updateCard,
  };
}
