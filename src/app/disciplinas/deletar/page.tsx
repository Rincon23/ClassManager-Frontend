"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Disciplina {
  id: number;
  name: string;
}

export default function ExcluirDisciplinaPage() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Protege a rota e carrega as disciplinas
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchDisciplinas = async () => {
      try {
        const res = await fetch(`http://100.87.133.102:3000/subject`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar disciplinas");

        const data = await res.json();
        setDisciplinas(data);
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao carregar disciplinas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisciplinas();
  }, [router]);

  const handleExcluir = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMensagem("Usuário não autenticado");
      return;
    }

    try {
      const res = await fetch("http://100.87.133.102:3000/subject", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: selectedName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.message || "Erro ao excluir disciplina.");
        return;
      }

      setMensagem("✅ Disciplina excluída com sucesso!");
      setSelectedName("");

      // Atualiza a lista após excluir
      setDisciplinas((prev) =>
        prev.filter((disciplina) => disciplina.name !== selectedName)
      );
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
        Carregando disciplinas...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">
        Excluir Disciplina
      </h1>

      <form
        onSubmit={handleExcluir}
        className="bg-[#192747] p-10 rounded-2xl shadow-lg w-96 border-2 border-indigo-500"
      >
        <label className="block text-gray-300 mb-2 font-semibold">
          Selecione a disciplina
        </label>
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-6"
          required
        >
          <option value="">-- Escolha uma disciplina --</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded transition"
        >
          Excluir
        </button>

        {mensagem && (
          <p
            className={`mt-4 text-center font-medium ${
              mensagem.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {mensagem}
          </p>
        )}
      </form>
    </div>
  );
}
