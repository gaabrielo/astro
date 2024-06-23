import styled from 'styled-components';
import List from '../components/List';
import { Funnel, ShoppingBag } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { GalleryVertical } from 'lucide-react';

interface BurgerProps {
  image: string;
  id: number;
  type: 'smash' | 'burger' | 'acc';
  name: string;
  price: string;
}

const burgerType = {
  smash: 'ASTRO SMASH',
  burger: 'GRELHADO',
  acc: 'ACOMPANHAMENTO',
};

export function Menu({ filters, searchTerm: search, onFilter }: any) {
  const [items, setItems] = useState<BurgerProps[]>();
  console.log('🚀 ~ Menu ~ items:', items);

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

    //  const formattedItems = data?.data.reduce((acc: any, mitem: BurgerProps) => {
    //    if (!acc[mitem.type]) {
    //      acc[mitem.type] = [];
    //    }
    //    acc[mitem.type].push(mitem);
    //    return acc;
    //  }, {});

    setItems(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [search, filters]);

  return (
    <main className="w-full max-w-lg mx-auto my-0 bg-background">
      <header className="mx-4 mt-6 flex items-center gap-2">
        <h1 className="font-passion-one text-4xl">CARDÁPIO</h1>
        <FilterButton className="mr-0 ml-auto">
          <GalleryVertical strokeWidth={1} size={20} />
        </FilterButton>
        <FilterButton onClick={onFilter}>
          <Funnel size={20} weight="thin" color="#D9D9D9" className="mr-1" />
          Filtrar
        </FilterButton>
      </header>

      <ul>
        {items?.map((bgr) => (
          <BgrCard data={bgr} />
        ))}
      </ul>

      {/* <List search={search} filters={filters} /> */}
    </main>
  );
}

// function BgrSquare() {

//   return ()
// }

function BgrRow({ data: bgr }: { data: BurgerProps }) {
  return (
    <li key={bgr.id} className="bg-[#161616]">
      <Link to={`/${bgr.id}`}></Link>
    </li>
  );
}

function BgrCard({ data: bgr }: { data: BurgerProps }) {
  return (
    <li
      key={bgr.id}
      className="text-center text-[#EAEBED] font-medium text-xl flex flex-col gap-1 mx-4 mt-4 overflow-hidden rounded-[1.25rem] bg-[#161616] w-['calc(100vw-2rem)']"
    >
      <Link to={`/${bgr.id}`}>
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

            <h1 className="font-medium text-2xl uppercase leading-7 font-passion-one">
              {bgr.name}
            </h1>
            <h1 className="font-normal leading-4 mt-3">
              <strong className="text-sm font-normal">R$ </strong>
              {bgr.price}
            </h1>
          </div>

          {/* <CaretRight weight="thin" color="#EAEBED" size={20} /> */}

          <Button
            className="px-4 py-2 rounded-full text-sm flex items-center gap-1 text-[#EAEBED] z-20"
            // onClick={(e) => {
            // }}
          >
            <ShoppingBag className="w-5 h-5" weight="thin" color="#D9D9D9" />
            <span className="font-normal text-white">Adicionar</span>
          </Button>
        </div>
      </Link>
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
