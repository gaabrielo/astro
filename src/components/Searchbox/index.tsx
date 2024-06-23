import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import './styles.scss';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import styled from 'styled-components';
import { debounce } from 'lodash';

export function Searchbox({
  isOpen = false,
  setIsOpen = (): void => {},
  onSearchTermChange,
}: any) {
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
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
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
    );
  }

  return (
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
        className="inputForm"
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
          ref={inputSearchRef}
          autoFocus
          type="text"
          placeholder="Buscar"
          className="bg-transparent placeholder:text-[#616263] text-[#D9D9D9] font-normal flex-1 h-full w-full"
          onChange={debouncedResults}
        />
      </motion.form>

      <motion.button
        onClick={handleCleanSearch}
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
  );
}
