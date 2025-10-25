export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t border-indigo-500/20 py-10 md:m-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8">

        <h3 className="text-2xl font-semibold text-white">
          Projeto Framework II
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-4/5 space-y-6 md:space-y-0 text-gray-400 text-sm md:text-base leading-relaxed ">
          <p>
            Desenvolvido com{" "}
            <span className="text-indigo-400 font-medium">Next.js</span>,{" "}
            <span className="text-indigo-400 font-medium">React</span> e{" "}
            <span className="text-indigo-400 font-medium">TailwindCSS</span> no front-end.
          </p>

          <p>
            API construída com{" "}
            <span className="text-indigo-400 font-medium">Node.js</span>,{" "}
            <span className="text-indigo-400 font-medium">Express</span>,{" "}
            <span className="text-indigo-400 font-medium">Sequelize</span> e{" "}
            <span className="text-indigo-400 font-medium">MySQL</span>.
          </p>

          <p>
            Infraestrutura via{" "}
            <span className="text-indigo-400 font-medium">Docker</span> e{" "}
            <span className="text-indigo-400 font-medium">GitHub Actions</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
