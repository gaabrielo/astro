import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Drawer } from '../components/Drawer';
import { Price } from '../components/Price';
import { Description } from '../components/Description';
import Swiper from '../components/Swiper';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { ArrowLeft, Export, Hamburger } from '@phosphor-icons/react';
import { BurgerPageSkeleton } from '../components/skeleton/BurgerPageSkeleton';

export default function BurgerPage() {
  // const [open, setOpen] = useState(false);
  const [burgerData, setBurgerData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  let { burgerId } = useParams();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const data: any = await supabase
        .from('items')
        .select()
        .eq('id', burgerId);

      if (!data.error) {
        setBurgerData(data.data[0]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (burgerId) {
      fetchData();
    }
  }, []);

  function handleBack() {
    navigate(-1);
  }

  return (
    // <Drawer open={open} onOpenChange={setOpen}>
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto relative pb-4">
      {/* <header className="w-full absolute top-2 left-2 right-2 flex justify-between items-center"> */}
      <button
        type="button"
        className="rounded-full p-2 pl-1 absolute top-2 left-4"
        onClick={handleBack}
      >
        <ArrowLeft size={24} color="#EAEBED" />
      </button>

      {isLoading ? (
        <BurgerPageSkeleton />
      ) : (
        <>
          <InfoContainer>
            <img
              src={burgerData?.image || ''}
              alt="Burger"
              className="h-full w-full object-cover max-h-72"
            />
            <div className="w-full mt-3">
              <Description burger={burgerData} />
            </div>
          </InfoContainer>
          <Actions>
            <button className="w-full py-4 bg-white text-black font-medium max-h-14 rounded-full">
              FAZER PEDIDO
            </button>
            <button className="w-full bg-[#F51038] font-medium flex items-center justify-center gap-2 py-4 max-h-14 rounded-full">
              <span className="text-white">Comprar com</span>
              <img src="./assets/ifood-logo.svg" alt="iFood" />
            </button>
          </Actions>

          {burgerData?.description && (
            <div className="px-6 py-4 bg-[#202020] text-[#D9D9D9] rounded-[1.25rem] mx-4">
              <h2 className="mb-4 uppercase text-sm text-[#616263] font-semibold flex items-center gap-2">
                <Hamburger weight="fill" size={24} />
                Notas da Oficina
              </h2>
              <span>{burgerData.description}</span>
            </div>
          )}
        </>
      )}
      {/* <button
        type="button"
        className="rounded-full p-2 bg-[rgba(0,0,0,0.1)] absolute top-2 right-2"
      >
        <Export size={24} color="#EAEBED" />
      </button> */}
      {/* </header> */}

      {/* <div className="w-full static bottom-0 bg-[#181818]">
          <Shadow>
            <Price />
          </Shadow>
        </div> */}

      {/* <div className="flex gap-3 px-4">
          <span className="p-2 px-4 bg-[#111111] rounded-full">
            +R$11 Batatitas Astro
          </span>
          <span className="p-2 px-4 bg-[#111111] rounded-full">200g</span>
        </div> */}

      {/* <p className="mt-4 text-[#EAEBED]">
        Um clássico mais vivo do que nunca e um dos mais queridos da oficina!
      </p> */}
    </div>
    // </Drawer>
  );
}

const Actions = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const InfoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  overflow-y: scroll;

  & > div {
    padding: 0 1rem;
  }
`;

const Shadow = styled.div`
  width: 100%;
  padding: 1rem;

  /* box-shadow: 0 -2px 12px -3px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); */
`;
