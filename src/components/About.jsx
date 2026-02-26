export default function About() {
  const features = [
    {
      icon: '🏆',
      title: 'Torneo Nacional',
      desc: 'Competencia de nivel país con representación oficial.',
    },
    {
      icon: '🗺️',
      title: 'Por Ciudades',
      desc: 'Representación por ciudades y regiones de Honduras.',
    },
    {
      icon: '📅',
      title: 'Evento Anual',
      desc: 'Cita fija en el calendario del pádel hondureño.',
    },
    {
      icon: '⚔️',
      title: 'Categorías Competitivas',
      desc: 'Open, Intermedia y Amateur para todos los niveles.',
    },
  ]

  return (
    <section id="about" className="py-20 sm:py-28 px-6 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          ¿Qué es Copa Naciones Pádel?
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-12">
          Inspirado en el Davis Cup
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-sky-500/30 transition-colors duration-300"
            >
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="aspect-video rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800"
                alt="Pádel"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Copa Naciones Pádel es el torneo nacional por equipos más ambicioso de Honduras.
              Siguiendo el espíritu de la Copa Davis, cada ciudad o región forma su equipo para
              competir por la gloria nacional.
            </p>
            <p className="text-white/70 leading-relaxed">
              Un evento anual que impulsa el desarrollo del pádel, fomenta la rivalidad sana entre
              regiones y proyecta el deporte hacia Centroamérica.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-12 rounded border border-white/20 flex items-center justify-center text-2xl">
                🇭🇳
              </div>
              <span className="text-white/60">Torneo oficial Honduras</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
