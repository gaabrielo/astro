import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Export } from '@phosphor-icons/react';

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  font-size: 1rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export function Price() {
  const currency = 'R$';

  return (
    <Container>
      <div className="flex gap-3 justify-between items-baseline">
        <p className="text-sm">Preço</p>
        <p className="text-xl text-[#EAEBED] mt-3">
          <strong className="text-sm font-normal">{currency}</strong>40,00
        </p>
      </div>

      <section>
        <motion.button
          className="rounded-full bg-gray-700 w-full font-medium flex items-center justify-center gap-4 py-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* <img src="./assets/ifood-logo.svg" alt="iFood" /> */}
          <span className="text-white">Fazer Pedido</span>
        </motion.button>

        <motion.button
          className="rounded-full bg-red-500 w-full font-medium flex items-center justify-center gap-4 py-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img src="./assets/ifood-logo.svg" alt="iFood" />
          <span className="text-white">Comprar no iFood</span>
        </motion.button>
      </section>
    </Container>
  );
}
