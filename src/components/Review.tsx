import { Star } from '@phosphor-icons/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import styled from 'styled-components';

const options = [
  { value: 'flavor', label: 'Sabor' },
  { value: 'price', label: 'Preço' },
  { value: 'service', label: 'Serviço e entrega' },
];

export function Review() {
  const [value, setValue] = useState({});

  const handleSelect = (v: string, fType: string) => {
    setValue((prev: any) => ({
      ...prev,
      [fType]: v,
    }));
  };

  return (
    <ul className="flex flex-col gap-6">
      {options.map(({ value: vType, label }) => (
        <li className="pl-4 flex flex-col gap-4" key={vType}>
          <h1>{label}</h1>
          <div className="flex gap-2">
            <ToggleGroup.Root
              // className="flex flex-col"
              type="single"
              // defaultValue={defaultValue[type]}
              aria-label="Filters"
              onValueChange={(v) => handleSelect(v, vType)}
              asChild
            >
              <>
                {['Ruim', 'Bom', 'Excelente'].map((rank, idx) => (
                  <ToggleGroup.Item value={rank} asChild>
                    <ReviewButton
                      className={`px-4 py-2 rounded-full text-sm flex items-center 
                      gap-1 hover:opacity-100 transition-all ${
                        value[vType] == rank
                          ? 'opacity-100 text-[#EAEBED]'
                          : 'opacity-50'
                      }`}
                      // onClick={onClickReview}
                    >
                      {rank}
                      {[...Array(idx + 1)].map(() => (
                        <Star weight="fill" color="#EDC967" size={16} />
                      ))}
                    </ReviewButton>
                  </ToggleGroup.Item>
                ))}
              </>
            </ToggleGroup.Root>
          </div>

          <div className="w-full h-[1px] bg-zinc-800"></div>
        </li>
      ))}
    </ul>
  );
}
const ReviewButton = styled.button`
  background: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: 0.5s;
  &:hover {
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  }
`;
