"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DisciplinasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Se não tiver token, redireciona
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100svh] bg-[#0f172a] text-white">
        Verificando autenticação...
      </div>
    );
  }

  // Página de Disciplinas com as opções CRUD
  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">
        Gerenciamento de Disciplinas
      </h1>

      <div className="flex flex-col gap-8 max-w-5xl w-full">
        {/* Criar */}
        <div className="bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Criar</h2>
          <p className="text-gray-300 mb-4">
            Cadastre uma nova disciplina no sistema.
          </p>
          <Link
            href="/disciplinas/criar"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Acessar →
          </Link>
        </div>

        {/* Ler */}
        <div className="bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Listar</h2>
          <p className="text-gray-300 mb-4">
            Veja todas as disciplinas cadastradas.
          </p>
          <Link
            href="/disciplinas/listar"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Acessar →
          </Link>
        </div>

        {/* Atualizar */}
        <div className="bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Atualizar</h2>
          <p className="text-gray-300 mb-4">
            Edite informações de uma disciplina existente.
          </p>
          <Link
            href="/disciplinas/atualizar"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Acessar →
          </Link>
        </div>

        {/* Deletar */}
        <div className="bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Excluir</h2>
          <p className="text-gray-300 mb-4">
            Remova uma disciplina do sistema.
          </p>
          <Link
            href="/disciplinas/deletar"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Acessar →
          </Link>
        </div>
      </div>
    </div>
  );
}
