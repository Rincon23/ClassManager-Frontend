// components/Navbar.jsx
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <nav className="sticky bg-[#0f172a] px-6 py-4 flex items-center justify-between fixed top-0 right-0 left-0">
      {/* Logo */}
      <div className="flex items-center space-x-2 hover:scale-105">
        <Link href="/" className="hover:text-indigo-400 transition">
            <Image
                    src="/logo.svg" // caminho dentro da pasta /public
                    alt="Logo"
                    width={65}
                    height={65}
                    className="cursor-pointer"
                />
        </Link>
      </div>

      {/* Links */}
      <div className="flex space-x-8 text-sm font-semibold text-gray-100">
        <Link href="#" className="hover:text-indigo-400 transition">
          <p className="text-xl">Disciplinas</p>
        </Link>
        <Link href="#" className="hover:text-indigo-400 transition">
          <p className="text-xl">Professores</p>
        </Link>
        <Link href="#" className="hover:text-indigo-400 transition">
          <p className="text-xl">Aulas</p>
        </Link>
      </div>

      {/* Login */}
      <Link
        href="#"
        className="text-sm font-semibold text-gray-100 hover:text-indigo-400 flex items-center"
      >
        <p className="text-xl">Log in →</p>
      </Link>
    </nav>
  );
}
