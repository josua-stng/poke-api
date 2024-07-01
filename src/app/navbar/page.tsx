import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-300 p-5 space-x-10 font-medium">
      <Link href={'/'} className="hover:font-bold">
        Home
      </Link>
      <Link href={'/my-pokemon'} className="hover:font-bold">
        My Pokemon
      </Link>
    </nav>
  );
}
