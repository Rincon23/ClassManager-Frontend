"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CriarAulaPage() {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://100.87.133.102:3000/class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, timeSlot, teacher, subject }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMensagem(data.message || "Erro ao criar aula.");
        return;
      }

      setMensagem("✅ Aula criada com sucesso!");
      setDate("");
      setTimeSlot("");
      setTeacher("");
      setSubject("");
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">Criar Aula</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#192747] p-10 rounded-2xl shadow-lg w-96 border-2 border-indigo-500"
      >
        <label className="block text-gray-300 mb-2 font-semibold">Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        />

        <label className="block text-gray-300 mb-2 font-semibold">Horário</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        >
          <option value="">-- Escolha o horário --</option>
          <option value="19:10 - 20:00">19:10 - 20:00</option>
          <option value="20:00 - 20:50">20:00 - 20:50</option>
          <option value="21:00 - 21:50">21:00 - 21:50</option>
          <option value="21:50 - 22:40">21:50 - 22:40</option>
        </select>

        <label className="block text-gray-300 mb-2 font-semibold">Professor</label>
        <input
          type="text"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          placeholder="Ex: João da Silva"
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        />

        <label className="block text-gray-300 mb-2 font-semibold">Disciplina</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ex: Matemática"
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition"
        >
          Criar
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
