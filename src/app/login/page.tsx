"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChange"));
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100svh] bg-[#0f172a]">
      <form
        onSubmit={handleLogin}
        className="bg-[#192747] p-10 rounded-2xl shadow-lg w-96 border-2 border-indigo-500"
      >
        <h1 className="text-2xl text-center text-white font-bold mb-6">
          Login no Sistema
        </h1>

        {error && (
          <p className="text-red-400 text-center font-medium mb-4">{error}</p>
        )}

        <label className="block text-gray-300 mb-2 font-semibold">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-4"
          required
        />

        <label className="block text-gray-300 mb-2 font-semibold">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition"
        >
          Entrar
        </button>

        {/* Link para registro */}
        <p className="text-gray-300 text-center mt-4">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={() => router.push("/login/registrar")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline transition"
          >
            Registre-se
          </button>
        </p>
      </form>
    </div>
  );
}
