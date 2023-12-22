import { ReactNode, createContext, useContext, useState } from 'react';

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
};

const sidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(sidebarContext);
  if (value == null) throw Error('Cannot use it outside sidebar provider');
  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  function isSmallScreen() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isSmallScreen()) setIsSmallOpen((s) => !s);
    else setIsLargeOpen((s) => !s);
  }

  return (
    <sidebarContext.Provider value={{ isLargeOpen, isSmallOpen, toggle }}>
      {children}
    </sidebarContext.Provider>
  );
}
