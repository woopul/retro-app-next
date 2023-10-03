/* eslint-disable @typescript-eslint/no-empty-function */
import { MutableRefObject, createContext, createRef, useRef, useState } from 'react';

export type DnDContextType = {
  draggedOverIdRef: MutableRefObject<string | null>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

// set empty initial values of context
export const DnDContext = createContext<DnDContextType>({
  draggedOverIdRef: createRef(),
  isDragging: false,
  setIsDragging: () => {},
});

export type DnDProviderType = {
  children: React.ReactNode;
};

export function DnDProvider({ children }: DnDProviderType) {
  const draggedOverIdRef = useRef<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const value = { isDragging, setIsDragging, draggedOverIdRef };
  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
}
