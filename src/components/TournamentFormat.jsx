const categories = [
  { name: 'Open', desc: 'Máximo nivel competitivo' },
  { name: 'Intermedia', desc: 'Nivel intermedio' },
  { name: 'Amateur', desc: 'Aficionados y principiantes' },
]

export default function TournamentFormat() {
  return (
    <section id="formato" className="py-20 sm:py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Formato del Torneo
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-16">
          Fase de grupos · Eliminatorias · Final Nacional
        </p>

        {/* Bracket visual */}
        <div className="mb-16 overflow-x-auto pb-4">
          <div className="min-w-[600px] mx-auto">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              {/* Fase de grupos */}
              <div className=" rounded-lg border border-sky-500/30 bg-sky-500/5 p-4">
                <p className="text-sky-400 font-semibold mb-1">FASE DE GRUPOS</p>
                <p className="text-white/70 text-sm">8 equipos por grupo</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-px w-full bg-sky-500/30" />
              </div>
              <div className=" rounded-lg border border-sky-500/30 bg-sky-500/5 p-4">
                <p className="text-sky-400 font-semibold mb-1">ELIMINATORIAS</p>
                <p className="text-white/70 text-sm">Cuartos y semis</p>
              </div>
              <div className="col-span-3 flex justify-center py-2">
                <div className="w-px h-6 bg-sky-500/30" />
              </div>
              <div className="col-span-3 rounded-xl border-2 border-sky-500/50 bg-gradient-to-b from-sky-500/10 to-transparent p-6">
                <p className="text-sky-400 font-bold text-lg mb-1">FINAL NACIONAL</p>
                <p className="text-white/80 text-sm">Campeón Copa Naciones Pádel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid sm:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-sky-400 font-bold">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{cat.name}</h3>
              <p className="text-white/70 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-white/60 mt-8 text-sm">
          Cada equipo cuenta con 4–6 jugadores · Partidos al mejor de 3 sets
        </p>
      </div>
    </section>
  )
}
