import { Star } from '@phosphor-icons/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Form from '@radix-ui/react-form';
import { useState } from 'react';
import styled from 'styled-components';
import { MainButton } from './MainButton';
import { Footer } from './Footer';

const options = [
  { value: 'flavor', label: 'Sabor' },
  { value: 'price', label: 'Preço' },
  { value: 'service', label: 'Serviço e entrega' },
];

export function Review() {
  const [value, setValue] = useState<any>({});

  const handleSelect = (v: string, fType: string) => {
    setValue((prev: any) => ({
      ...prev,
      [fType]: v,
    }));
  };

  return (
    <>
      <ul className="flex flex-col gap-6">
        {options.map(({ value: vType, label }) => (
          <li className="pl-4 flex flex-col gap-4" key={vType}>
            <h1 className="text-[#EAEBED]">{label}</h1>
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

      <FormRoot>
        <Form.Field name="name">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Form.Label>Nome</Form.Label>
          </div>
          <Form.Control asChild>
            <input type="text" className="w-full p-3 py-2 rounded-md" />
          </Form.Control>
        </Form.Field>
        <Form.Field name="email">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Form.Label>Email</Form.Label>
            <Form.Message match="valueMissing">
              Por favor, insira um e-mail
            </Form.Message>
            <Form.Message match="typeMismatch">
              Por favor, insira um e-mail
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full p-3 py-2 rounded-md"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="review">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Form.Label>Mensagem (opcional)</Form.Label>
            {/* <Form.Message match="valueMissing">
              Please enter a question
            </Form.Message> */}
          </div>
          <Form.Control asChild>
            <textarea className="w-full min-h-[5rem] p-3 rounded-md" />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <MainButton className="text-center rounded-full py-3 px-4 text-white">
            Enviar avaliação
          </MainButton>
        </Form.Submit>
      </FormRoot>
      {/* <Footer /> */}
    </>
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

const FormRoot = styled(Form.Root)`
  margin: 1.5rem 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #eaebed;

  input,
  textarea {
    background-color: #222222;
  }
`;
