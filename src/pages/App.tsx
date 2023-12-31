import { useState } from 'react';
import styled from 'styled-components';
import Burger from '../pages/Burger';
import List from '../components/List';
import { Menu } from '../components/Menu';
import { InstagramLogo, List as MenuIcon } from '@phosphor-icons/react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Searchbox } from '../components/Searchbox';
import { GlobalFilterDrawer } from '../components/GlobalFilterDrawer';
import { GlobalFilter } from '../components/GlobalFilter';
import { GlobalFilterProvider } from '../contexts/GlobalFilterContext';
import { Footer } from '../components/Footer';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

  function handleFilter() {
    setIsFilterOpen(true);
  }

  return (
    <GlobalFilterProvider>
      {/* <Router> */}
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
        <Menu isOpen={isOpen} onClose={setIsOpen} />
        <header className="w-full text-right px-2 h-20 relative bg-[#111111]">
          <span className="absolute left-0 right-0 top-0 w-full text-center flex items-center h-20 z-0">
            <Link to="/" className="mx-auto my-0 mt-2">
              <img src="/assets/astrologo.svg" alt="Astro Hamburgueria" />
            </Link>
          </span>

          <div className="absolute w-full left-0 right-0 top-0 z-10 flex justify-between items-center">
            <button className="py-8 px-6" onClick={() => setIsOpen(true)}>
              <span className="text-2xl font-light">
                <img src="/assets/menu-icon.svg" alt="Abrir Menu" />
              </span>
            </button>

            <a href="https://www.instagram.com/burgerastro/" target="_blank">
              <span className="py-8 px-6 block">
                <InstagramLogo size="24" color="white" weight="thin" />
              </span>
            </a>
          </div>
        </header>
        <div className="h-[calc(100vh-5rem)] overflow-y-auto">
          <Routes>
            <Route path="/:burgerId" element={<Burger />} />
            <Route
              path="/"
              element={<Home onFilter={handleFilter} filters={filters} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
      {/* </Router> */}
    </GlobalFilterProvider>
  );
};

export default App;

function Home({ onFilter, filters }: any) {
  const [search, setSearch] = useState();

  return (
    <div className="w-full relative">
      <main className="block w-full max-w-lg mx-auto my-0 bg-[#111111]">
        <Searchbox onSearchTermChange={setSearch} onFilter={onFilter} />
        <List search={search} filters={filters} />
      </main>
    </div>
  );
}
