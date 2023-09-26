import { DnDContext } from '@/context/DnDContextProvider';
import { useContext } from 'react';

export function useDnDContext() {
  const context = useContext(DnDContext);
  if (context === undefined) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
}
