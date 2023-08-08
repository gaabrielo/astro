import { Funnel, MagnifyingGlass } from '@phosphor-icons/react';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const FilterButton = styled.button`
  background: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: 0.5s;
  &:hover {
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  }
  font-family: 'Poppins';
`;

export function Searchbox({ onSearchTermChange, onFilter }: any) {
  const [search, setSearch] = useState('');
  const inputSearchRef = useRef(null);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setTimeout(() => {
        onSearchTermChange(search);
      }, 300);
    } else onSearchTermChange(null);
  }, [search]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleCleanSearch = () => {
    // @ts-ignore
    inputSearchRef.current.value = '';
    setSearch('');
  };

  return (
    <div className="w-full px-4 max-w-lg">
      <div className="w-full flex items-center bg-[#161616] px-2 rounded-xl">
        <MagnifyingGlass
          size={24}
          weight="thin"
          color="#616263"
          className="mr-2"
        />
        <input
          ref={inputSearchRef}
          type="text"
          placeholder="Buscar"
          className="flex-1 bg-transparent py-3 placeholder:text-[#616263] text-[#D9D9D9] font-normal mr-2"
          onChange={debouncedResults}
        />
        <FilterButton
          className="px-3 py-2 rounded-lg flex gap-1"
          onClick={() => (search.length > 0 ? handleCleanSearch() : onFilter())}
        >
          {search.length > 0 ? (
            <span className="text-sm text-[#616263]">Cancelar</span>
          ) : (
            <>
              <Funnel size={20} weight="thin" color="#D9D9D9" />
              <span className="text-sm text-[#616263]">Filtrar</span>
            </>
          )}
        </FilterButton>
      </div>
    </div>
  );
}
