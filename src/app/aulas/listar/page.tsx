"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Aula {
  id: number;
  date: string;
  timeSlot: string;
  teacher: string;
  subject: string;
}

export default function ListarAulasPage() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchAulas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Erro ao buscar aulas");

        const data: Aula[] = await res.json();
        setAulas(data);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar as aulas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAulas();
  }, [router]);

  if (isLoading)
    return <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">Carregando aulas...</div>;

  if (error)
    return <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-red-400">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">Lista de Aulas</h1>

      {aulas.length === 0 ? (
        <p className="text-gray-300">Nenhuma aula cadastrada.</p>
      ) : (
        <div className="w-full max-w-4xl bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-indigo-400 text-left border-b border-indigo-500">
                <th className="py-2 px-4">Data</th>
                <th className="py-2 px-4">Horário</th>
                <th className="py-2 px-4">Professor</th>
                <th className="py-2 px-4">Disciplina</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map((aula) => (
                <tr key={`${aula.date}-${aula.timeSlot}`} className="border-b border-indigo-900 hover:bg-[#24325f] transition">
                  <td className="py-2 px-4">{aula.date}</td>
                  <td className="py-2 px-4">{aula.timeSlot}</td>
                  <td className="py-2 px-4">{aula.teacher}</td>
                  <td className="py-2 px-4">{aula.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
