import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import './styles.scss';
import { MagnifyingGlass } from '@phosphor-icons/react';
import styled from 'styled-components';

export function SearchboxNew({
  isOpen = false,
  setIsOpen = (): void => {},
}: any) {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 80,
    duration: 1800,
  };

  return (
    <motion.div
      layout
      data-isOpen={isOpen}
      initial={{ borderRadius: 50 }}
      className="parent"
      onClick={() => {
        if (!isOpen) setIsOpen(!isOpen);
      }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="magnifyingGlass"
        // transition={spring}
        // layout
      >
        <MagnifyingGlass size={24} weight="regular" />
      </div>

      <AnimatePresence mode="sync">
        {isOpen && (
          <>
            <motion.div
              transition={{ duration: 0.1 }}
              className="textInput"
              initial={{
                opacity: 0,
                transitionDelay: '0.4s',
              }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transitionDelay: '0s',
              }}
            >
              <input
                // ref={inputSearchRef}
                type="text"
                placeholder="Buscar"
                className="bg-transparent py-3 placeholder:text-[#616263] text-[#D9D9D9] font-normal ml-2 flex-1"
                // onChange={debouncedResults}
              />

              <FilterButton
                className="px-4 py-2 rounded-full flex items-center h-8 self-center group"
                // onClick={() =>
                //   search.length > 0 ? handleCleanSearch() : onFilter()
                // }
                onClick={() => setIsOpen(false)}
              >
                {/* {search.length > 0 ? (
                  <span className="text-sm text-[#616263]">Cancelar</span>
                ) : (
                  <>
                    <Funnel size={20} weight="thin" color="#D9D9D9" />
                    <span className="text-sm text-[#616263]">Filtrar</span>
                  </>
                )} */}
                <span className="text-xs transition-all group-hover:text-zinc-300 text-[#616263]">
                  Cancelar
                </span>
              </FilterButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const FilterButton = styled.button`
  background: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: 0.5s;
  &:hover {
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  }
  font-family: 'Poppins';
`;
