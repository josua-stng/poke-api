import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingSkeletonSavePokemon() {
  return (
    <main>
      <h1 className="text-center font-bold mt-5 mb-5 text-2xl font-sans">
        Saved Pokemon
      </h1>
      <div className="grid justify-center mx-auto sm:grid-cols-2 sm:max-w-xl lg:grid-cols-3 lg:max-w-4xl xl:grid-cols-4 xl:max-w-6xl gap-5  p-5">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-400 max-w-xl w-[250px] animate-pulse h-[335px]"
          >
            <div className="relative w-full h-[180px] bg-gray-200 rounded-md">
              <Skeleton height={180} />
            </div>
            <div className="p-5">
              <Skeleton
                height={24}
                width="60%"
                className="mx-auto mb-2 ml-10"
              />
              <Skeleton height={20} width="80%" className="mx-auto ml-5" />
            </div>
            <div className=" flex justify-center items-center space-x-5">
              <Skeleton width={80} height={30} />
              <Skeleton width={80} height={30} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
