"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

export default function AtualizarProfessorPage() {
  const [uniqueNames, setUniqueNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:3000/teachers", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar professores");

        // Tipagem explícita evita o erro “unknown[]”
        const data: Teacher[] = await res.json();

        // Extrai nomes únicos
        const names = Array.from(
          new Set(data.map((t: Teacher) => t.name.trim()))
        );

        setUniqueNames(names);
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao carregar professores");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
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
      const res = await fetch("http://localhost:3000/teachers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldName: selectedName,
          newName: novoNome,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.message || "Erro ao atualizar professor.");
        return;
      }

      setMensagem("✅ Professor atualizado com sucesso!");
      setSelectedName("");
      setNovoNome("");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
        Carregando professores...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">
        Atualizar Professor
      </h1>

      <form
        onSubmit={handleAtualizar}
        className="bg-[#192747] p-10 rounded-2xl shadow-lg w-96 border-2 border-indigo-500"
      >
        <label className="block text-gray-300 mb-2 font-semibold">
          Selecione o Professor
        </label>
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        >
          <option value="">-- Escolha um professor --</option>
          {uniqueNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
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
          placeholder="Ex: Carlos Souza"
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
