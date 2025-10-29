"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Verifica o token e extrai o nome de usuário
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setUsername(decoded.username || "");
          setIsLogged(true);
        } catch (err) {
          console.error("Token inválido:", err);
          setIsLogged(false);
          setUsername("");
        }
      } else {
        setIsLogged(false);
        setUsername("");
      }
    };

    checkToken();
    window.addEventListener("authChange", checkToken);
    return () => window.removeEventListener("authChange", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUsername("");
    router.push("/login");
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

        {/* Links desktop centralizados */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 font-semibold">
          <Link href="/disciplinas" className="hover:text-indigo-400 transition text-xl">Disciplinas</Link>
          <Link href="/professores" className="hover:text-indigo-400 transition text-xl">Professores</Link>
          <Link href="/aulas" className="hover:text-indigo-400 transition text-xl">Aulas</Link>
        </div>

        {/* Área de login/logout */}
        <div className="hidden md:flex items-center space-x-4">
          {isLogged ? (
            <>
              <span className="text-indigo-400 text-lg font-semibold">
                Olá, {username}!
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-red-700 hover:shadow-red-500/30 transition-all duration-300"
              >
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-indigo-400 transition text-xl">
              Log in →
            </Link>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#192747] py-4 space-y-4 border-t border-indigo-500">
          <Link href="/disciplinas" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Disciplinas</Link>
          <Link href="/professores" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Professores</Link>
          <Link href="/aulas" className="hover:text-indigo-400 transition text-lg" onClick={() => setMenuOpen(false)}>Aulas</Link>

          {isLogged ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-red-700 hover:shadow-red-500/30 transition-all duration-300"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-indigo-400 transition text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Log in →
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
