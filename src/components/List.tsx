import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';

const burgerType = {
  smash: 'Astro Smash',
  burger: 'Grelhados como churrasco',
  acc: 'Acompanhamentos',
};

interface BurgerProps {
  image: string;
  id: number;
  type: string;
  name: string;
  price: string;
}

interface ItemsProps {
  bgType: string;
  burger: BurgerProps[];
}

interface ListProps {
  search?: string;
}

function List({ search }: ListProps) {
  console.log('🚀 ~ file: List.tsx:26 ~ List ~ search:', search);
  const [items, setItems] = useState<any>();

  const fetchData = async () => {
    let data: any = await supabase.from('items').select();

    if (search) {
      data = await supabase
        .from('items')
        .select()
        .ilike('name', `%${search.toLowerCase()}%`);
    } else {
      data = await supabase.from('items').select();
    }

    const formattedItems = data?.data.reduce((acc, mitem: BurgerProps) => {
      if (!acc[mitem.type]) {
        acc[mitem.type] = [];
      }
      acc[mitem.type].push(mitem);
      return acc;
    }, {});

    setItems(formattedItems);
    return;
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="flex flex-col mb-6">
      <ul className="flex flex-col gap-4 text-white">
        {items &&
          Object.entries(items).map(([bgType, burger]) => (
            <li key={bgType}>
              <h1 className="text-xl px-4 mt-6 font-normal">
                {burgerType[bgType]}{' '}
                <strong className="text-[#616263] font-medium">
                  {burger.length}
                </strong>
              </h1>

              {burger.map((bgr) => (
                <li
                  key={bgr.id}
                  className="text-center text-[#EAEBED] font-medium text-xl flex flex-col gap-1 mx-4 mt-4 overflow-hidden rounded-[1.25rem] bg-[#222222] w-['calc(100vw-2rem)']"
                >
                  <Link to={`/${bgr.id}`}>
                    <img
                      src={bgr.image}
                      alt={bgr.name}
                      className="object-cover h-60 w-full"
                    />
                  </Link>
                  <div className="w-full flex justify-between items-center px-4 py-2 hover:cursor-pointer">
                    <div className="flex flex-col text-left">
                      {bgType !== 'acc' && (
                        <span className="leading-4 text-sm font-bold text-[#8A8A8A]">
                          {bgType !== 'smash' ? 'GRELHADO' : 'SMASH'}
                        </span>
                      )}

                      <h1 className="font-bold text-lg uppercase leading-6">
                        {bgr.name}
                      </h1>
                      <h1 className="font-normal leading-4 mt-2">
                        <strong className="text-sm font-normal">R$ </strong>
                        {bgr.price}
                      </h1>
                    </div>

                    <CaretRight weight="thin" color="#EAEBED" size={20} />
                  </div>
                </li>
              ))}
            </li>
          ))}
      </ul>

      {/* <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId} className="bg-red-500">
            <motion.h2>{selectedItem.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}

export default List;
