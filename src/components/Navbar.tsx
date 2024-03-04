import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-5 py-4 w-full flex items-center justify-between text-white">
      <Link href="/" className="text-xl font-bold">
        Learn CRUD
      </Link>
      <Link
        href="/addItem"
        className="bg-white text-black px-3 py-2 rounded-md"
      >
        Add item
      </Link>
    </nav>
  );
};

export default Navbar;
