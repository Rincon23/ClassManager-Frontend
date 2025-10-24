import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url('/background2.png')] bg-cover bg-center bg-fixed h-screen">

      {/* Inicio */}

      <section className="flex flex-col items-center justify-center text-center py-20 bg-[url('/background2.png')] bg-cover bg-center bg-fixed" >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white pb-10">Gestão Acadêmica Simplificada </h1>
         <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-extrabold">
          Organize professores, disciplinas e aulas em um único lugar.
          Um sistema desenvolvido para tornar o gerenciamento escolar ágil e eficiente.
        </p>
      </section>
      <section
        id="features"
        className="py-24 bg-[#111a2e] grid md:grid-cols-3 gap-10 px-10"
      >
        {/* Card 1 */}
        <div className="bg-[#1e293b] rounded-2xl p-8 hover:scale-105 transition shadow-lg border border-indigo-500/20">
          <h3 className="text-3xl font-semibold pb-3 text-white">Disciplinas</h3>
          <p className="text-gray-300 mb-5">
            Cadastre, edite e organize disciplinas com facilidade. Controle tudo em poucos cliques.
          </p>
          <Link
            href="#"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Acessar Disciplinas →
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1e293b] rounded-2xl p-8 hover:scale-105 transition shadow-lg border border-indigo-500/20">
          <h3 className="text-3xl font-semibold pb-3 text-white">Professores</h3>
          <p className="text-gray-300 mb-5">
            Visualize e gerencie professores de forma prática, atribuindo disciplinas conforme necessário.
          </p>
          <Link
            href="#"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Gerenciar Professores →
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1e293b] rounded-2xl p-8 hover:scale-105 transition shadow-lg border border-indigo-500/20">
          <h3 className="text-3xl font-semibold pb-3 text-white">Aulas</h3>
          <p className="text-gray-300 mb-5">
            Agende aulas com horários fixos e tenha total controle do calendário letivo.
          </p>
          <Link
            href="#"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Ver Aulas →
          </Link>
        </div>
      </section>
      
    </div>
  );
}
