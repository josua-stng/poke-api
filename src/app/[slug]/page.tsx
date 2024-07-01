type slug = {
  params: {
    slug: number;
  };
};
export default function PokemonDetailPage({ params: { slug } }: slug) {
  return (
    <div>
      <p>pokemon detail {slug}</p>
    </div>
  );
}
