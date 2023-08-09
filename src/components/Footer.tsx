export function Footer() {
  return (
    <footer className="text-sm py-10 border-t-zinc-800 border-t mt-10 text-center">
      <div className="w-full max-w-lg text-left mx-auto px-4 flex flex-col gap-4">
        <div>
          <h2 className="uppercase text-sm text-zinc-600 font-semibold mb-1">
            Delivery e retirada
          </h2>
          <span className="text-[#EAEBED]">
            Rua Presidente Carlos Cavalcanti, 734 - Centro
            <br />
            Curitiba-PR
            <br />
            CEP: 80020-280
          </span>
        </div>

        <span className="mt-4 text-zinc-600">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/gaabrielo"
            target="_blank"
            className="underline"
          >
            gaabrielo
          </a>
          . All rights reserved.
        </span>
      </div>
    </footer>
  );
}
