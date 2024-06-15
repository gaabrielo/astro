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

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

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
        <Menu isOpen={isOpen} onClose={setIsOpen} />

        <Header setIsOpen={setIsOpen} />

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
    </GlobalFilterProvider>
  );
};

export default App;

function Home({ onFilter, filters }: any) {
  const [search, setSearch] = useState();

  return (
    <div className="w-full relative">
      <main className="block w-full max-w-lg mx-auto my-0 bg-[#111111]">
        {/* <div className="w-full px-4 max-w-lg">
          <Searchbox onSearchTermChange={setSearch} onFilter={onFilter} />
        </div> */}

        <List search={search} filters={filters} />
      </main>
    </div>
  );
}

function Header({ setIsOpen }: any) {
  const [search, setSearch] = useState();

  return (
    <header className="w-full flex px-4 gap-3 h-20 items-center bg-[#111111]">
      {/* <button className="py-6 px-4" onClick={() => setIsOpen(true)}>
        <span className="text-2xl font-light">
          <img src="/assets/menu-icon.svg" alt="Abrir Menu" />
        </span>
      </button> */}

      {/* <Link to="/">
        <img
          src="/assets/astrologo.svg"
          alt="Astro Hamburgueria"
          className="w-20"
        />
      </Link> */}
      <div className="flex-1">
        <Searchbox onSearchTermChange={setSearch} onFilter={() => {}} />
      </div>

      <button>
        <span className="py-4 block text-xs text-center text-[#616263]">
          <ShoppingBag
            size="24"
            color="white"
            weight="thin"
            className="mx-auto"
          />
          Pedido
        </span>
      </button>
    </header>
  );
}
