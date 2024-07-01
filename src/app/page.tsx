import Pokemon from './pokemon/page';

export default function Home() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-8 mb-6 font-sans">
        List Pokemon
      </h1>
      <Pokemon />
    </div>
  );
}
