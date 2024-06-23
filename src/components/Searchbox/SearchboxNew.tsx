import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import './styles.scss';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
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
    <>
      {!isOpen ? (
        <motion.div
          layoutId="searchBox"
          data-isOpen={isOpen}
          initial={{ borderRadius: 50 }}
          className="parent"
          onClick={() => {
            if (!isOpen) setIsOpen(!isOpen);
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div layoutId="magnifyingGlass" className="magnifyingGlass">
            <MagnifyingGlass size={24} weight="regular" />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          layoutId="searchBox"
          data-isOpen={isOpen}
          initial={{ borderRadius: 50 }}
          className="parent"
          onClick={() => {
            if (!isOpen) setIsOpen(!isOpen);
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div layoutId="magnifyingGlass" className="magnifyingGlass">
            <MagnifyingGlass size={24} weight="regular" />
          </motion.div>

          <motion.form
            transition={{ duration: 0.1, delay: 0.4 }}
            className="textInput"
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -25,
            }}
          >
            <input
              // ref={inputSearchRef}
              autoFocus
              type="text"
              placeholder="Buscar"
              className="bg-transparent placeholder:text-[#616263] text-[#D9D9D9] font-normal flex-1 h-full"
              // onChange={debouncedResults}
            />
          </motion.form>

          <motion.button
            // className="px-4 py-2 rounded-full flex items-center h-8 self-center group"
            onClick={() => setIsOpen(false)}
            type="button"
            transition={{ duration: 0.1, delay: 0.4 }}
            className="cancelButton"
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -25,
            }}
          >
            <X weight="thin" size="1rem" />
          </motion.button>
        </motion.div>
      )}
    </>
  );
}

// const FilterButton = styled.button`
//   background: rgba(34, 34, 34, 0.8);
//   box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
//   transition: 0.5s;
//   &:hover {
//     box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
//   }
//   font-family: 'Poppins';
// `;
