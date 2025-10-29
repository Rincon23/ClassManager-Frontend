import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Inicio - Faculdade',
  openGraph:{}
}


export default function Home() {
  return (
    <div className="bg-[url('/background2.png')] bg-no-repeat bg-cover bg-center min-h-[100svh] bg-fixed pb-10">
      {/* Inicio */}
      <section className="flex flex-col items-center justify-center text-center py-15 bg-[url('/background2.png')] bg-no-repeat bg-cover bg-center md:bg-fixed backdrop-brightness-75">
        {/* Título principal */}
        <h1 className="text-[3rem] md:text-[3.2rem] font-extrabold text-white drop-shadow-xl tracking-tight">
          ClassManager
        </h1>

        {/* Subtítulo */}
        <h2 className="text-2xl md:text-4xl font-semibold text-indigo-300 mt-4 mb-6 tracking-wide">
          Gestão Acadêmica Simplificada
        </h2>

        {/* Descrição */}
        <p className="text-base md:text-xl text-gray-200 max-w-3xl font-medium leading-relaxed">
          Organize professores, disciplinas e aulas em um único lugar. <br />
          Um sistema desenvolvido para gerenciamento escolar, intuitivo e eficiente.
        </p>
      </section>


      <section className=" justify-center bg-[#0f172a] py-16">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6" id="interface">
          {/* Card 1 — Disciplinas */}
          <div className="flex-1 bg-[#192747] m-4 p-10 border-4 border-indigo-500 rounded-2xl hover:scale-105 hover:shadow-2xl transition-transform duration-300">
            <h1 className="text-2xl font-semibold mb-3 text-indigo-400">Disciplinas</h1>
            <p className="text-gray-300 mb-4">
              Veja e gerencie todas as disciplinas cadastradas no sistema.
            </p>
            <Link
              href="/disciplinas"
              className="text-indigo-400 font-medium hover:text-indigo-300 transition"
            >
              Acessar Disciplinas →
            </Link>
          </div>

          {/* Card 2 — Professores */}
          <div className="flex-1 bg-[#192747] m-4 p-10 border-4 border-indigo-500 rounded-2xl hover:scale-105 hover:shadow-2xl transition-transform duration-300">
            <h1 className="text-2xl font-semibold mb-3 text-indigo-400">Professores</h1>
            <p className="text-gray-300 mb-4">
              Visualize, edite e adicione novos professores facilmente.
            </p>
            <Link
              href="/professores"
              className="text-indigo-400 font-medium hover:text-indigo-300 transition"
            >
              Acessar Professores →
            </Link>
          </div>

          {/* Card 3 — Aulas */}
          <div className="flex-1 bg-[#192747] m-4 p-10 border-4 border-indigo-500 rounded-2xl hover:scale-105 hover:shadow-2xl transition-transform duration-300">
            <h1 className="text-2xl font-semibold mb-3 text-indigo-400">Aulas</h1>
            <p className="text-gray-300 mb-4">
              Gerencie os horários e cadastros das aulas de forma prática.
            </p>
            <Link
              href="/aulas"
              className="text-indigo-400 font-medium hover:text-indigo-300 transition"
            >
              Acessar Aulas →
            </Link>
          </div>
        </div>
      </section>
    </div>
    
  );
}
