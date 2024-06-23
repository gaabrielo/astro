import styled from 'styled-components';

export function Footer() {
  return (
    <footer className="text-sm pt-10 pb-36 border-t-zinc-800 border-t mt-10 text-center">
      <div className="w-full max-w-lg text-left mx-auto px-4 flex flex-col gap-4">
        <div>
          <h2 className="uppercase text-sm text-zinc-600 font-semibold mb-1">
            Delivery e retirada
          </h2>
          <span className="text-[#EAEBED]">
            R. 21 de Abril, 980 - Centro
            <br />
            Palotina-PR
            <br />
            CEP: 85950-001
          </span>
        </div>

        <div>
          <h2 className="uppercase text-sm text-zinc-600 font-semibold mb-1">
            HORÁRIOS
          </h2>
          <ActivityTable>
            <tr>
              <td>Seg</td>
              <td>Fechado</td>
            </tr>
            <tr>
              <td>Ter</td>
              <td>19:00 às 00:00</td>
            </tr>
            <tr>
              <td>Qua</td>
              <td>19:00 às 00:00</td>
            </tr>
            <tr>
              <td>Qui</td>
              <td>19:00 às 00:00</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>19:00 à 01:00</td>
            </tr>
            <tr>
              <td>Sab</td>
              <td>19:00 à 01:00</td>
            </tr>
            <tr>
              <td>Dom</td>
              <td>19:00 às 00:00</td>
            </tr>
          </ActivityTable>
        </div>

        <span className="mt-4 text-zinc-600">
          Astro Burger © {new Date().getFullYear()} All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

const ActivityTable = styled.table`
  color: #c1c1c1;
  tr > td:first-of-type {
    min-width: 4rem;
    color: #fff;
  }

  td {
    line-height: 1.325rem;
  }
`;
