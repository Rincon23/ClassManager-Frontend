"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Disciplina {
  id: number;
  name: string;
}

export default function ListarDisciplinasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchDisciplinas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subject`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar disciplinas");
        }

        const data = await res.json();
        setDisciplinas(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar as disciplinas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisciplinas();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
        Carregando disciplinas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f172a] text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">
        Lista de Disciplinas
      </h1>

      {disciplinas.length === 0 ? (
        <p className="text-gray-300">Nenhuma disciplina cadastrada.</p>
      ) : (
        <div className="w-full max-w-3xl bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-indigo-400 text-left border-b border-indigo-500">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nome</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map((disciplina) => (
                <tr
                  key={disciplina.id}
                  className="border-b border-indigo-900 hover:bg-[#24325f] transition"
                >
                  <td className="py-2 px-4">{disciplina.id}</td>
                  <td className="py-2 px-4">{disciplina.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
