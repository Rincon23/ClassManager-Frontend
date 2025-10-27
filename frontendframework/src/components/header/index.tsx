"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  // Verifica o token ao carregar e escuta alterações no login/logout
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    };

    // Checa token quando o Header carrega
    checkToken();

    // Escuta o evento customizado "authChange" disparado no login/logout
    window.addEventListener("authChange", checkToken);

    // Limpa o listener ao desmontar o componente
    return () => window.removeEventListener("authChange", checkToken);
  }, []);

  // Logout do usuário
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    router.push("/login");

    // Dispara o evento global para atualizar o Header em tempo real
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <nav className="sticky bg-[#0f172a] text-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" id="interface">
        
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

        {/* Botão menu mobile */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-100"></span>
          <span className="w-6 h-0.5 bg-gray-100"></span>
          <span className="w-6 h-0.5 bg-gray-100"></span>
        </button>

        {/* Links desktop */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          <Link href="/disciplinas" className="hover:text-indigo-400 transition text-xl">Disciplinas</Link>
          <Link href="/professores" className="hover:text-indigo-400 transition text-xl">Professores</Link>
          <Link href="/aulas" className="hover:text-indigo-400 transition text-xl">Aulas</Link>
        </div>

        {/* Login / Logout desktop */}
        <div className="hidden md:flex">
          {!isLogged ? (
            <Link href="/login" className="hover:text-indigo-400 transition text-xl">Log in →</Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition text-xl"
            >
              Sair
            </button>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#192747] py-4 space-y-4 border-t border-indigo-500">
          <Link href="/disciplinas" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Disciplinas</Link>
          <Link href="/professores" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Professores</Link>
          <Link href="/aulas" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Aulas</Link>

          {!isLogged ? (
            <Link
              href="/login"
              className="hover:text-indigo-400 transition text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Log in →
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="hover:text-red-400 transition text-lg"
            >
              Sair
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
