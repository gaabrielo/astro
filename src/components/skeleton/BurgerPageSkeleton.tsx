export function BurgerPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-72 bg-gray-300"></div>

      <div className="px-4 py-2">
        <div className="flex justify-between items-start mt-3">
          <div className="w-[10rem] h-10 bg-gray-300 rounded-lg"></div>
          <div className="w-[5rem] h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-[5rem] h-8 bg-gray-300 rounded-lg mt-2"></div>

        <div className="w-full flex flex-col mt-3 gap-2">
          <div className="w-[80vw] md:w-[420px] h-3 bg-gray-300 rounded-lg"></div>
          <div className="w-[80vw] md:w-[420px] h-3 bg-gray-300 rounded-lg"></div>
          <div className="w-[50vw] md:w-40 h-3 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
