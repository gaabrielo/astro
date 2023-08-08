'use client';

import { Drawer as VaulDrawer } from 'vaul';

export function Drawer({ children, open, ...rest }: any) {
  return (
    <VaulDrawer.Root shouldScaleBackground open={open} {...rest}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content
          className="flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 overflow-hidden bg-[#111111]"
          // style={{
          //   background:
          //     'radial-gradient(circle at 24.1% 68.8%, rgb(25, 25, 25) 0%, rgb(0, 0, 0) 99.4%)',
          // }}
        >
          {/* <div
            className="py-4 bg-[#f9f9f9] rounded-t-[10px] flex-1 pb-0"
            style={{
              background:
                'radial-gradient(circle at 24.1% 68.8%, rgb(20, 20, 20) 0%, rgb(0, 0, 0) 99.4%)',
            }}
          >
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#111111] mb-8" />
            {children}
          </div> */}
          <VaulDrawer.Close className="w-14 h-14 rounded-full bg-white absolute right-4 top-4">
            <span className="text-black text-[18px]">X</span>
          </VaulDrawer.Close>
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
