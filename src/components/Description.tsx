import { Export, Star } from '@phosphor-icons/react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 1rem;
  font-family: 'Poppins', 'sans-serif';
`;

const ReviewButton = styled.button`
  background: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: 0.5s;
  &:hover {
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  }
`;

interface BurgerProps {
  burger: {
    name: string;
    price: string;
    ingredients: string;
  };
}

export function Description({ burger, onClickReview }: any) {
  if (!burger) return <></>;
  return (
    <Container>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex gap-2 items-baseline font-semibold leading-6">
            {/* <img src="./assets/astro-mini-logo.svg" alt="Astro" /> */}
            {/* <img src="./assets/astrologo.svg" alt="Astro" className="w-8" />
            <span>/</span> */}
            <span className="text-sm">ASTRO SMASH</span>
          </div>

          <h1 className="text-4xl font-medium font-passion-one uppercase">
            {burger.name}
          </h1>
        </div>

        {/* <div className="flex items-center">
        <button className="rounded-full p-2">
            <Export size={20} color="#EAEBED" />
          </button>
        </div> */}
        <ReviewButton
          className="px-4 py-2 rounded-full text-sm flex items-center gap-1 text-[#EAEBED]"
          onClick={onClickReview}
        >
          <Star color="#D9D9D9" weight="thin" size={16} />
          <span className="text-sm text-[#616263]">Avaliar</span>
        </ReviewButton>
      </div>

      <h1 className="text-4xl text-[#EAEBED] mt-3">
        <strong className="text-xl font-normal">R$ </strong>
        {burger.price}
      </h1>

      <h2 className="mt-8 uppercase text-sm text-[#616263] font-semibold">
        Ingredientes
      </h2>

      <p
        className="mt-1 text-[#EAEBED] leading-7"
        // style={{ color: '#7F7F7F' }}
      >
        {burger.ingredients}
      </p>
    </Container>
  );
}
