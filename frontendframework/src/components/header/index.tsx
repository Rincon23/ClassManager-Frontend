"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky bg-[#0f172a] text-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center hover:scale-105 transition">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={65}
              height={65}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Botão do menu (aparece só no mobile) */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-100"></span>
          <span className="w-6 h-0.5 bg-gray-100"></span>
          <span className="w-6 h-0.5 bg-gray-100"></span>
        </button>

        {/* Links normais (desktop) */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          <Link href="#" className="hover:text-indigo-400 transition text-xl">Disciplinas</Link>
          <Link href="#" className="hover:text-indigo-400 transition text-xl">Professores</Link>
          <Link href="#" className="hover:text-indigo-400 transition text-xl">Aulas</Link>
        </div>

        {/* Login (desktop) */}
        <div className="hidden md:flex">
          <Link href="#" className="hover:text-indigo-400 transition text-xl">Log in →</Link>
        </div>
      </div>

      {/* Menu mobile (abre e fecha) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#192747] py-4 space-y-4 border-t border-indigo-500">
          <Link href="#" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Disciplinas</Link>
          <Link href="#" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Professores</Link>
          <Link href="#" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Aulas</Link>
          <Link href="#" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Log in →</Link>
        </div>
      )}
    </nav>
  );
}
