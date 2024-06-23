import { useState } from 'react';
import Burger from './pages/Burger';
import List from './components/List';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GlobalFilterDrawer } from './components/GlobalFilterDrawer';
import { GlobalFilter } from './components/GlobalFilter';
import { GlobalFilterProvider } from './contexts/GlobalFilterContext';
import { Footer } from './components/Footer';
import { Searchbox } from './components/Searchbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from './pages/Menu';

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
              element={
                <Menu
                  filters={filters}
                  searchTerm={searchTerm}
                  onFilter={handleFilter}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </GlobalFilterProvider>
  );
};

export default App;

function Header({ setIsMenuOpen, onFilter, setSearch }: any) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full flex px-4 gap-0 h-16 items-center bg-background justify-end">
      <img
        src="./assets/astro_white_bg.png"
        alt="Astro burger Logo"
        className="w-12 h-12 rounded-full flex-shrink mr-4"
      />

      <AnimatePresence mode="popLayout">
        {!isSearchOpen && (
          <motion.div
            className="text-xs flex flex-col pr-4 gap-1 mr-auto overflow-visible"
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

      <Searchbox
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        onSearchTermChange={setSearch}
      />
    </header>
  );
}
