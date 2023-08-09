import { useContext } from 'react';
import { GlobalFilter } from './GlobalFilterContext';

export function useGlobalFilter() {
  const values = useContext(GlobalFilter);
  return values;
}
