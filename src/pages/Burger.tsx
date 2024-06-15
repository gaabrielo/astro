import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Description } from '../components/Description';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { ArrowLeft, Export, Hamburger } from '@phosphor-icons/react';
import { BurgerPageSkeleton } from '../components/skeleton/BurgerPageSkeleton';
import { GlobalFilterDrawer as Drawer } from '../components/GlobalFilterDrawer';
import { Review } from '../components/Review';

interface BurgerProps {
  image: string;
  id: number;
  type: string;
  name: string;
  price: string;
  description?: string;
}

export default function BurgerPage() {
  // const [open, setOpen] = useState(false);
  const [burgerData, setBurgerData] = useState<BurgerProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
  }, [burgerId]);

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto relative bg-[#111111]">
      <Drawer
        open={isReviewModalOpen}
        onOpenChange={setIsReviewModalOpen}
        onCancel={() => {}}
      >
        <Review />
      </Drawer>
      <button
        type="button"
        className="rounded-full p-2 pl-1 absolute top-2 left-4 z-10"
        onClick={handleBack}
      >
        <ArrowLeft
          size={24}
          color="#EAEBED"
          // className="fixed"
        />
      </button>

      {isLoading ? (
        <BurgerPageSkeleton />
      ) : (
        <>
          <ImageContainer className="relative w-full h-72">
            {/* <ImageContainer url={burgerData?.image} /> */}
            <img
              src={burgerData?.image || ''}
              alt="Burger"
              className="h-full w-full max-w-lg object-cover max-h-72 fixed"
            />
          </ImageContainer>

          <div className="w-full mt-3 mb-8 px-4">
            <Description
              burger={burgerData}
              onClickReview={() => setIsReviewModalOpen(true)}
            />
          </div>
          <Actions>
            <button className="w-full py-3 text-base bg-white text-black font-medium max-h-14 rounded-lg">
              Adicionar ao Pedido
            </button>
            {/* <a
              href="https://www.ifood.com.br/delivery/curitiba-pr/astro-burger-centro/"
              target="_blank"
              className="w-full bg-[#F51038] font-medium flex items-center justify-center gap-2 py-4 max-h-14 rounded-full"
            >
              <span className="text-white">Comprar com</span>
              <img src="./assets/ifood-logo.svg" alt="iFood" />
            </a> */}
          </Actions>

          {burgerData?.description && (
            <div className="px-6 py-4 bg-[#202020] text-[#D9D9D9] rounded-[1.25rem] mx-4 mt-8">
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
  );
}

const Actions = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

interface ImageContainerProps {
  url?: string;
}

const ImageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  clip-path: inset(0);
`;

const ImageContainerAux = styled.div<ImageContainerProps>`
  background: ${(props) => `url('${props.url}')`} no-repeat;
  /* background-size: 100% auto; */
  margin: 0 auto;
  background-attachment: fixed;
  height: 100%;
  background-size: cover;
  width: 100%;
  position: absolute;
`;

const Shadow = styled.div`
  width: 100%;
  padding: 1rem;

  /* box-shadow: 0 -2px 12px -3px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); */
`;
