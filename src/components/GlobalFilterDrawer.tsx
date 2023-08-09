'use client';

import { Drawer as VaulDrawer } from 'vaul';

export function GlobalFilterDrawer({ children, open, onCancel, ...rest }: any) {
  return (
    <VaulDrawer.Root shouldScaleBackground open={open} {...rest}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content
          className="flex flex-col rounded-t-[10px] h-[50%] mt-24 fixed bottom-0 left-0 right-0 overflow-hidden bg-[#111111]"
          // style={{
          //   background:
          //     'radial-gradient(circle at 24.1% 68.8%, rgb(25, 25, 25) 0%, rgb(0, 0, 0) 99.4%)',
          // }}
        >
          <div className="py-4 rounded-t-[10px] flex-1 pb-0 overflow-y-auto w-full h-full max-w-lg mx-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-800" />
            <VaulDrawer.Close
              className="flex m-0 mr-0 ml-auto px-4 py-2"
              onClick={onCancel}
            >
              <span className="text-red-600 text-sm text-[18px]">Cancelar</span>
            </VaulDrawer.Close>
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}