/* eslint-disable @typescript-eslint/no-empty-function */
import { MutableRefObject, createContext, createRef, useRef, useState } from 'react';

export type DnDContextType = {
  draggedOverRef: MutableRefObject<any | null>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

// set empty initial values of context
export const DnDContext = createContext<DnDContextType>({
  draggedOverRef: createRef(),
  isDragging: false,
  setIsDragging: () => {},
});

export type DnDProviderType = {
  children: React.ReactNode;
};

export function DnDProvider({ children }: DnDProviderType) {
  const draggedOverRef = useRef<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const value = { isDragging, setIsDragging, draggedOverRef };
  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
}
