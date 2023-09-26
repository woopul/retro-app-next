import { DnDContext } from '@/context/DnDContextProvider';
import { useContext } from 'react';

export function useDnDContext() {
  const { cards, setCards } = useContext(DnDContext);
  
  return { cards, setCards};
}
