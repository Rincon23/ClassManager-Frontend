"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CriarProfessorPage() {
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMensagem("Usuário não autenticado");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nome, subject: disciplina }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMensagem(data.message || "Erro ao criar professor.");
        return;
      }

      setMensagem("✅ Professor criado com sucesso!");
      setNome("");
      setDisciplina("");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  if (isLoading)
    return <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">Verificando autenticação...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">Criar Professor</h1>

      <form onSubmit={handleSubmit} className="bg-[#192747] p-10 rounded-2xl shadow-lg w-96 border-2 border-indigo-500">
        <label className="block text-gray-300 mb-2 font-semibold">Nome do Professor</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Carlos Silva"
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        />

        <label className="block text-gray-300 mb-2 font-semibold">Disciplina</label>
        <input
          type="text"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          placeholder="Ex: Matemática"
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-6"
          required
        />

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition">
          Criar
        </button>

        {mensagem && (
          <p className={`mt-4 text-center font-medium ${mensagem.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>{mensagem}</p>
        )}
      </form>
    </div>
  );
}
