/* eslint-disable @typescript-eslint/no-empty-function */
import { MutableRefObject, createContext, createRef, useRef, useState } from 'react';

export type DnDContextType = {
  draggedOverRef: MutableRefObject<any | null>;
  draggedElementRef: MutableRefObject<any | null>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

// set empty initial values of context
export const DnDContext = createContext<DnDContextType>({
  draggedOverRef: createRef(),
  draggedElementRef: createRef(),
  isDragging: false,
  setIsDragging: () => {},
});

export type DnDProviderType = {
  children: React.ReactNode;
};

export function DnDProvider({ children }: DnDProviderType) {
  const draggedOverRef = useRef<HTMLElement>(null);
  const draggedElementRef = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const value = { isDragging, setIsDragging, draggedOverRef, draggedElementRef };
  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
}
