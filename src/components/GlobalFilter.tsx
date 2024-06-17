import {
  ArrowDown,
  ArrowUp,
  Hamburger,
  List,
  OrangeSlice,
  SquaresFour,
  Star,
} from '@phosphor-icons/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useEffect, useState } from 'react';

const filters = [
  {
    type: 'sort',
    label: 'Ordenar',
    values: [
      {
        label: 'Menor preço',
        _id: 'price_low',
        icon: <ArrowDown weight="thin" color="white" size={24} />,
      },
      {
        label: 'Maior preço',
        _id: 'price_high',
        icon: <ArrowUp weight="thin" color="white" size={24} />,
      },
    ],
  },
  {
    type: 'category',
    label: 'Categorias',
    values: [
      {
        label: 'Astro Smash',
        _id: 'smash',
        icon: <Star weight="thin" color="white" size={24} />,
      },
      {
        label: 'Grelhados',
        _id: 'burger',
        icon: <Hamburger weight="thin" color="white" size={24} />,
      },
      {
        label: 'Acompanhamentos',
        _id: 'acc',
        icon: <OrangeSlice weight="thin" color="white" size={24} />,
      },
    ],
  },
  {
    type: 'view',
    label: 'Visualizar',
    values: [
      {
        label: 'Lista',
        _id: 'list',
        icon: <List weight="thin" color="white" size={24} />,
      },
      {
        label: 'Grid',
        _id: 'grid',
        icon: <SquaresFour weight="thin" color="white" size={24} />,
      },
    ],
  },
  // {
  //   type: 'tags',
  //   label: null,
  //   values: [
  //     {
  //       label: 'Bacon',
  //       _id: 'tag_spicy',
  //     },
  //     {
  //       label: 'Cheddar',
  //       _id: 'tag_spicy',
  //     },
  //     {
  //       label: 'Apimentado',
  //       _id: 'tag_spicy',
  //     },
  //     {
  //       label: '170g',
  //       _id: 'tag_170',
  //     },
  //     {
  //       label: '100g',
  //       _id: 'tag_100',
  //     },
  //   ],
  // },
];

// interface FilterProps {
//   defaultValue: any;
// }

export function GlobalFilter({ defaultValue, onFilter }: any) {
  const [value, setValue] = useState<any>(defaultValue || {});

  const handleSelect = (v: string, fType: string) => {
    // console.log('🚀 ~ handleSelect ~ fType:', fType);
    // console.log('🚀 ~ handleSelect ~ v:', v);

    if (fType == 'view' && !v) return;
    setValue((prev: any) => ({
      ...prev,
      [fType]: v,
    }));
  };

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      onFilter(value);
    }
  }, [value]);

  return (
    <div className="w-full overflow-hidden">
      {filters.map(({ type, values, label }) => {
        if (type === 'tags') {
          return (
            <ToggleGroup.Root
              className="flex gap-1 h-full"
              type="single"
              // defaultValue="center"
              aria-label="Text alignment"
            >
              {values.map((filterVal) => (
                <ToggleGroup.Item
                  className="py-2 px-4 rounded-full bg-zinc-900"
                  value={filterVal._id}
                  aria-label={filterVal.label}
                  key={filterVal._id}
                >
                  {filterVal.label}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          );
        }

        return (
          <div className="mb-6" key={type}>
            {label && <h1 className="ml-4 uppercase font-semibold">{label}</h1>}

            <ToggleGroup.Root
              className="flex flex-col"
              type="single"
              defaultValue={defaultValue[type]}
              aria-label="Filters"
              onValueChange={(val) => handleSelect(val, type)}
            >
              {values.map((filterVal) => (
                <ToggleGroup.Item
                  className={`flex flex-col gap-4 pt-4 hover:bg-zinc-900 ${
                    value[type] && value[type] === filterVal._id
                      ? 'bg-zinc-900'
                      : ''
                  }`}
                  value={filterVal._id}
                  aria-label={filterVal.label}
                  key={filterVal._id}
                >
                  <span className="w-full flex items-center justify-start gap-4 pl-4">
                    {filterVal.icon}
                    {filterVal.label}
                  </span>
                  <div className="w-full ml-4 h-[1px] bg-zinc-800"></div>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>
        );
      })}
    </div>
  );
}
