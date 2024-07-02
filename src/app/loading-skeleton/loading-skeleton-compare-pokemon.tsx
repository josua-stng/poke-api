import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingSkeletonPokemonCompare() {
  return (
    <main className="font-mono border border-gray-400 w-[380px] mx-auto rounded-md ">
      <div className="relative w-full h-[200px]">
        <Skeleton className="absolute w-full h-full" />
      </div>
      <div className="p-5">
        <Skeleton height={28} width={150} className="mb-2 ml-20" />
        <Skeleton width={200} className="mx-auto mb-4 ml-16" />
        <ul className="list-disc px-6 mt-2 flex flex-col mx-auto justify-center items-center w-full">
          {[...Array(6)].map((_, index) => (
            <li key={index} className="w-full ml-5">
              <Skeleton width="100%" />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center items-center space-x-5">
          <Skeleton width={120} height={40} />
          <Skeleton width={120} height={40} />
        </div>
      </div>
    </main>
  );
}
