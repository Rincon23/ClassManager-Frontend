"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AulasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
        Verificando autenticação...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">
        Gerenciamento de Aulas
      </h1>

      <div className="flex flex-col gap-8 max-w-5xl w-full">
        <Card title="Criar" text="Agende uma nova aula." href="/aulas/criar" />
        <Card title="Listar" text="Veja todas as aulas cadastradas." href="/aulas/listar" />
        <Card title="Atualizar" text="Altere a data ou o horário de uma aula." href="/aulas/atualizar" />
        <Card title="Excluir" text="Remova uma aula do sistema." href="/aulas/deletar" />
      </div>
    </div>
  );
}

function Card({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <div className="bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500 hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold text-indigo-400 mb-3">{title}</h2>
      <p className="text-gray-300 mb-4">{text}</p>
      <Link href={href} className="text-indigo-400 hover:text-indigo-300 font-semibold">
        Acessar →
      </Link>
    </div>
  );
}
