"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Disciplina {
  id: number;
  name: string;
}

export default function AtualizarDisciplinaPage() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verifica autenticação e busca disciplinas
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

  const handleAtualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMensagem("Usuário não autenticado");
      return;
    }

    try {
      const res = await fetch("http://100.87.133.102:3000/subject", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldName: selectedId, // ou "id" se sua API usa ID
          newName: novoNome,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.message || "Erro ao atualizar disciplina.");
        return;
      }

      setMensagem("✅ Disciplina atualizada com sucesso!");
      setNovoNome("");
      setSelectedId("");
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
        Atualizar Disciplina
      </h1>

      <form
        onSubmit={handleAtualizar}
        className="bg-[#192747] p-10 rounded-2xl shadow-lg w-96 border-2 border-indigo-500"
      >
        <label className="block text-gray-300 mb-2 font-semibold">
          Selecione a disciplina
        </label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        >
          <option value="">-- Escolha uma disciplina --</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <label className="block text-gray-300 mb-2 font-semibold">
          Novo nome
        </label>
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Ex: Matemática Avançada"
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition"
        >
          Atualizar
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
