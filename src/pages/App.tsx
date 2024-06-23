import { useState } from 'react';
import styled from 'styled-components';
import Burger from '../pages/Burger';
import List from '../components/List';
import { Menu } from '../components/Menu';
import {
  InstagramLogo,
  List as MenuIcon,
  ShoppingBag,
} from '@phosphor-icons/react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Searchbox } from '../components/Searchbox';
import { GlobalFilterDrawer } from '../components/GlobalFilterDrawer';
import { GlobalFilter } from '../components/GlobalFilter';
import { GlobalFilterProvider } from '../contexts/GlobalFilterContext';
import { Footer } from '../components/Footer';
import { SearchboxNew } from '../components/Searchbox/SearchboxNew';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({ view: 'list' });
  const [searchTerm, setSearchTerm] = useState();

  function handleFilter() {
    setIsFilterOpen(true);
  }

  return (
    <GlobalFilterProvider>
      <GlobalFilterDrawer
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onCancel={() => setFilters({})}
      >
        <GlobalFilter
          defaultValue={filters}
          onFilter={(f: any) => {
            setFilters(f);
            setIsFilterOpen(false);
          }}
        />
      </GlobalFilterDrawer>

      <div vaul-drawer-wrapper="" className="overflow-y-hidden">
        {/* <Menu isOpen={isMenuOpen} onClose={setIsMenuOpen} /> */}

        <Header
          setIsMenuOpen={setIsMenuOpen}
          setSearch={setSearchTerm}
          onFilter={handleFilter}
        />

        <div className="h-[calc(100vh-5rem)] overflow-y-auto relative">
          <Routes>
            <Route path="/:burgerId" element={<Burger />} />
            <Route
              path="/"
              element={<Home filters={filters} searchTerm={searchTerm} />}
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </GlobalFilterProvider>
  );
};

export default App;

function Home({ filters, searchTerm }: any) {
  // const [search, setSearch] = useState();

  return (
    <div className="w-full relative">
      <main className="block w-full max-w-lg mx-auto my-0 bg-background">
        {/* <div className="w-full px-4 max-w-lg">
          <Searchbox onSearchTermChange={setSearch} onFilter={onFilter} />
        </div> */}

        <List search={searchTerm} filters={filters} />
      </main>
    </div>
  );
}

function Header({ setIsMenuOpen, onFilter, setSearch }: any) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full flex px-4 gap-0 h-16 items-center bg-background justify-end">
      {/* <Link to="/">
        <img
          src="/assets/astrologo.svg"
          alt="Astro Hamburgueria"
          className="w-20"
        />
      </Link> */}

      {/* <div className="flex-1">
        <Searchbox onSearchTermChange={setSearch} onFilter={onFilter} />
      </div> */}

      <img
        src="./assets/astro_white_bg.png"
        alt="Astro burger Logo"
        className="w-12 h-12 rounded-full flex-shrink"
      />

      <AnimatePresence>
        {!isSearchOpen && (
          <motion.div
            className="text-xs flex flex-col ml-4 pr-4 gap-1 mr-auto overflow-visible"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            initial={{ y: -25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
          >
            <div className="flex items-center gap-2 overflow-visible">
              <div className="w-2.5 h-2.5 overflow-visible relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute" />
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute" />
              </div>

              <span>Aberto agora</span>
            </div>
            <span className="text-neutral-400">~40-60 minutos</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <button
        className="py-0 px-4 mr-auto ml-0"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="text-2xl font-light">
          <img src="/assets/menu-icon.svg" alt="Abrir Menu" />
        </span>
        <MenuIcon weight="light" size={24} />
      </button> */}

      <SearchboxNew isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />

      {/* <button className="py-0 px-4" onClick={() => setIsMenuOpen(true)}>
        <span className="text-2xl font-light">
          <img src="/assets/menu-icon.svg" alt="Abrir Menu" />
        </span>
        <MenuIcon weight="light" size={24} />
      </button> */}

      {/* <button>
        <span className="py-4 block text-xs text-center text-[#616263]">
          <ShoppingBag
            size="24"
            color="white"
            weight="thin"
            className="mx-auto"
          />
          Pedido
        </span>
      </button> */}
    </header>
  );
}
