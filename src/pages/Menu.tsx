import styled from 'styled-components';
import List from '../components/List';
import { CaretRight, Funnel, ShoppingBag } from '@phosphor-icons/react';
import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import {
  AlignJustify,
  ChevronRightIcon,
  GalleryVertical,
  LayoutGrid,
} from 'lucide-react';

interface BurgerProps {
  image: string;
  id: number;
  type: 'smash' | 'burger' | 'acc';
  name: string;
  price: string;
  ingredients: string;
}

const burgerType = {
  smash: 'ASTRO SMASH',
  burger: 'GRELHADO',
  acc: 'ACOMPANHAMENTO',
};

const listType = {
  list: <AlignJustify strokeWidth={1} size={20} />,
  grid: <LayoutGrid strokeWidth={1} size={20} />,
  card: <GalleryVertical strokeWidth={1} size={20} />,
};

export function Menu({ filters, searchTerm: search, onFilter }: any) {
  const [items, setItems] = useState<BurgerProps[]>();
  const [listTypeSelected, setListTypeSelected] = useState('list');

  const fetchData = async () => {
    let data: any;

    if (search) {
      data = await supabase
        .from('items')
        .select()
        .ilike('name', `%${search.toLowerCase()}%`);
    } else if (
      !!filters &&
      filters['category']?.length &&
      filters['sort']?.length
    ) {
      data = await supabase
        .from('items')
        .select()
        .eq('type', filters['category'] || null)
        .order('price', {
          ascending: filters['sort'] === 'price_low' ?? null,
        });
    } else if (!!filters && filters['category']?.length) {
      data = await supabase
        .from('items')
        .select()
        .eq('type', filters['category'] || null);
    } else if (!!filters && filters['sort']?.length) {
      data = await supabase
        .from('items')
        .select()
        .order('price', {
          ascending: filters['sort'] === 'price_low' ?? null,
        });
    } else {
      data = await supabase.from('items').select();
    }

    if (!Object.values(filters)?.some((fValue) => fValue !== '')) {
      const formattedItems = Object.keys(burgerType).reduce(
        (acc: any, bgType: string) => {
          acc.push(data.data.filter((bg: BurgerProps) => bg.type === bgType));

          return acc;
        },
        []
      );

      setItems(formattedItems.flat());
      return;
    }

    console.log('🚀 ~ fetchData ~ data:', data);
    setItems(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [search, filters]);

  function getNextViewIndex(): 'list' | 'card' | 'grid' {
    const currentSelectedIndex =
      Object.keys(listType).indexOf(listTypeSelected);

    const views = Object.keys(listType);

    if (currentSelectedIndex + 1 >= Object.keys(listType).length) {
      return views[0] as 'list' | 'card' | 'grid';
    }

    return views[currentSelectedIndex + 1] as 'list' | 'card' | 'grid';
  }

  function renderListTypeIcon() {
    return listType[getNextViewIndex()];
  }

  function changeViewType() {
    setListTypeSelected(getNextViewIndex());
  }

  function renderCurrentView() {
    switch (listTypeSelected) {
      case 'card':
        return (
          <ul>
            {items?.map((brg) => (
              <BgrCard data={brg} />
            ))}
          </ul>
        );
      case 'grid':
        return (
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-4 mt-4">
            {items?.map((brg) => (
              <BgrSquare data={brg} />
            ))}
          </ul>
        );
      default:
        return (
          <ul>
            {items?.map((brg) => (
              <BgrRow data={brg} />
            ))}
          </ul>
        );
    }
  }

  return (
    <main className="w-full max-w-lg mx-auto my-0 bg-background">
      <header className="mx-4 mt-6 flex items-center gap-2">
        <h1 className="font-passion-one text-4xl">CARDÁPIO</h1>
        <FilterButton className="mr-0 ml-auto" onClick={changeViewType}>
          {renderListTypeIcon()}
        </FilterButton>
        <FilterButton onClick={onFilter}>
          <Funnel size={20} weight="thin" color="#D9D9D9" className="mr-1" />
          Filtrar
        </FilterButton>
      </header>

      {renderCurrentView()}

      {/* <List search={search} filters={filters} /> */}
    </main>
  );
}

function ItemWrapperButton({ children, ...rest }: any) {
  return (
    <button
      type="button"
      onClick={() => alert('Piceto pôbona calate')}
      {...rest}
    >
      {children}
    </button>
  );
}

function BgrRow({ data: bgr }: { data: BurgerProps }) {
  return (
    <li key={bgr.id} className="bg-[#161616] rounded-[1.25rem] mx-4 mt-4 ">
      <ItemWrapperButton className="flex leading-none p-3 gap-3 w-full">
        <img
          src={bgr.image}
          alt={bgr.name}
          className="aspect-square object-cover w-24 h-24 rounded-2xl"
        />

        <div className="flex-1">
          <header className="text-left flex-1 flex">
            <div>
              <span className="leading-5 text-sm font-bold text-neutral-500">
                {burgerType[bgr.type]}
              </span>

              <h1 className="font-medium text-2xl uppercase leading-7 font-passion-one">
                {bgr.name}
              </h1>
            </div>

            {/* <ChevronRightIcon
              strokeWidth={1}
              size={20}
              className="self-center mx-2"
            /> */}

            <h1 className="font-normal text-lg leading-5 self-center mr-0 ml-auto text-neutral-400">
              <strong className="text-sm font-normal">R$ </strong>
              {bgr.price}
            </h1>
          </header>

          {/* <div className="flex text-left w-full gap-2">
          </div> */}
          <span className="text-sm text-neutral-500 mt-1.5 flex-1 text-left w-full inline-block">
            {bgr.ingredients}
          </span>
        </div>
      </ItemWrapperButton>
    </li>
  );
}

function BgrCard({ data: bgr }: { data: BurgerProps }) {
  return (
    <li
      key={bgr.id}
      className="text-center text-[#EAEBED] font-medium text-xl flex flex-col gap-1 mx-4 mt-4 overflow-hidden rounded-[1.25rem] bg-[#161616] w-['calc(100vw-2rem)']"
    >
      <ItemWrapperButton>
        <img
          src={bgr.image}
          alt={bgr.name}
          className="object-cover h-60 w-full"
        />

        <div className="w-full flex justify-between items-center px-4 py-3 hover:cursor-pointer">
          <div className="flex flex-col text-left">
            <span className="leading-5 text-sm font-bold text-[#8A8A8A]">
              {burgerType[bgr.type]}
            </span>

            <h1 className="font-medium text-3xl uppercase leading-7 font-passion-one">
              {bgr.name}
            </h1>
            <h1 className="font-normal leading-4 mt-3">
              <strong className="text-sm font-normal">R$ </strong>
              {bgr.price}
            </h1>
          </div>

          <CaretRight weight="thin" color="#EAEBED" size={20} />

          {/* <Button
            className="px-4 py-2 rounded-full text-sm flex items-center gap-1 text-[#EAEBED] z-20"
            // onClick={(e) => {
            // }}
          >
            <ShoppingBag className="w-5 h-5" weight="thin" color="#D9D9D9" />
            <span className="font-normal text-white">Adicionar</span>
          </Button> */}
        </div>
      </ItemWrapperButton>
    </li>
  );
}

function BgrSquare({ data: bgr }: { data: BurgerProps }) {
  return (
    <li>
      <ItemWrapperButton>
        <img
          src={bgr.image}
          alt={bgr.name}
          className="aspect-square object-cover"
        />
      </ItemWrapperButton>
    </li>
  );
}

const FilterButton = styled.button`
  background: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: 0.3s;
  color: #c1c1c1;
  &:hover {
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
    color: #fff;
  }
  font-family: 'Poppins';
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  border-radius: 9999px;
`;
