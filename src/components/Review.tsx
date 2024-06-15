import { Star } from '@phosphor-icons/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Form from '@radix-ui/react-form';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { MainButton } from './MainButton';
import { Footer } from './Footer';

// const options = [
//   { value: 'flavor', label: 'Sabor' },
//   { value: 'price', label: 'Preço' },
//   { value: 'service', label: 'Serviço e entrega' },
// ];

export function Review() {
  const [value, setValue] = useState<any>(null);
  const rankRef = useRef(null);

  // const handleSelect = (v: string, fType: string) => {
  //   setValue((prev: any) => ({
  //     ...prev,
  //     [fType]: v,
  //   }));
  // };

  const handleSelect = (v: any) => {
    setValue(v);
    rankRef.current.value = v;
  };

  return (
    <div className="mx-4">
      <ToggleGroup.Root
        type="single"
        aria-label="Ranking"
        onValueChange={handleSelect}
        className="flex gap-4" 
      >
        <>
          {[...Array(Number(value))].map((_, starred) => (
            <ToggleGroup.Item
              value={starred + 1 + ''}
              className="text-[#CCA000] hover:opacity-80"
            >
              <Star weight="fill" size={38} />
            </ToggleGroup.Item>
          ))}
          {[...Array(5 - Number(value))].map((_, idx) => (
            <ToggleGroup.Item
              value={Number(value) + idx + 1 + ''}
              className="text-zinc-500 hover:text-[#CCA000] transition-all"
            >
              <Star weight="light" size={38} />
            </ToggleGroup.Item>
          ))}
        </>
      </ToggleGroup.Root>

      <FormRoot onSubmit={(val) => console.log(val)}>
        <Form.Field name="rank">
          <Form.Message match="valueMissing">
            {/* Por favor, insira um e-mail */}
            answer that shit
          </Form.Message>
          {/* <Form.Message match="rangeUnderflow">answer that shit</Form.Message> */}
          <Form.Control asChild>
            <input
              ref={rankRef}
              type="number"
              name="rank"
              max={5}
              min={1}
              defaultValue={value}
              // hidden
              required
            />
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
            <Form.Message match="typeMismatch">E-mail inválido</Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full p-3 py-2 rounded-md"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>
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
        <Form.Field name="review">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Form.Label>Mensagem (opcional)</Form.Label>
          </div>
          <Form.Control asChild>
            <textarea className="w-full min-h-[5rem] p-3 rounded-md" />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <MainButton
            className="text-center rounded-full py-3 px-4 text-white bg-[rgb(219, 255, 0)]"
            disabled={Number(value) < 1}
          >
            Enviar avaliação
          </MainButton>
        </Form.Submit>
      </FormRoot>
      {/* <Footer /> */}
    </div>
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
  margin: 2.5rem 0 1.5rem 0;
  /* padding: 0 1rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #eaebed;

  input,
  textarea {
    background-color: #222222;
  }
`;
