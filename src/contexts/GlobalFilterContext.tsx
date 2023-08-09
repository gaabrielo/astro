import React, { createContext, useState } from 'react';

export const GlobalFilter = createContext({});

export function GlobalFilterProvider({ children }: any) {
  const [filters, setFilters] = useState({});

  return (
    <GlobalFilter.Provider value={{ filters, setFilters }}>
      {children}
    </GlobalFilter.Provider>
  );
}
