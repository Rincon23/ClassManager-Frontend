"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

interface TeacherGrouped {
  id: number;
  name: string;
  subjects: string[];
}

export default function ListarProfessoresPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState<TeacherGrouped[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTeachers = async () => {
      try {
        const res = await fetch(`http://100.87.133.102:3000/teachers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Erro ao buscar professores");

        const data: Teacher[] = await res.json();

        // 🔹 Agrupa professores com mesmo nome
        const grouped: TeacherGrouped[] = Object.values(
          data.reduce((acc, teacher) => {
            const key = teacher.name.trim().toLowerCase();
            if (!acc[key]) {
              acc[key] = {
                id: teacher.id,
                name: teacher.name,
                subjects: [teacher.subject],
              };
            } else {
              acc[key].subjects.push(teacher.subject);
            }
            return acc;
          }, {} as Record<string, TeacherGrouped>)
        );

        setTeachers(grouped);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar os professores.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, [router]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
        Carregando professores...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f172a] text-red-400">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">
        Lista de Professores
      </h1>

      {teachers.length === 0 ? (
        <p className="text-gray-300">Nenhum professor cadastrado.</p>
      ) : (
        <div className="w-full max-w-3xl bg-[#192747] p-8 rounded-2xl border-2 border-indigo-500">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-indigo-400 text-left border-b border-indigo-500">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Disciplinas</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-indigo-900 hover:bg-[#24325f] transition"
                >
                  <td className="py-2 px-4">{t.id}</td>
                  <td className="py-2 px-4">{t.name}</td>
                  <td className="py-2 px-4">{t.subjects.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
