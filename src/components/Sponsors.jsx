const tiers = [
  {
    name: 'Oro',
    icon: '🥇',
    color: 'border-sky-500/50',
    bg: 'from-sky-500/10 to-transparent',
    features: [
      'Logo en uniformes oficiales',
      'Branding principal del evento',
      'Presencia en redes sociales',
      'Mención en streaming',
      'Stand exclusivo en evento',
    ],
  },
  {
    name: 'Plata',
    icon: '🥈',
    color: 'border-white/30',
    bg: 'from-white/5 to-transparent',
    features: [
      'Logo secundario en materiales',
      'Publicaciones destacadas en redes',
      'Mención en prensa',
      'Banner en cancha principal',
    ],
  },
  {
    name: 'Bronce',
    icon: '🥉',
    color: 'border-sky-700/50',
    bg: 'from-sky-900/20 to-transparent',
    features: [
      'Logo en banner digital',
      'Mención en web oficial',
      'Inclusión en comunicados',
    ],
  },
]

export default function Sponsors() {
  return (
    <section id="patrocinadores" className="py-20 sm:py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Patrocinadores
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-4">
          Impulsa el crecimiento del pádel en Honduras
        </p>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
          Forma parte del torneo nacional más importante del país. Tres niveles para adaptarse
          a tu inversión.
        </p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${tier.color} bg-gradient-to-b ${tier.bg} p-8 flex flex-col`}
            >
              <div className="text-4xl mb-4">{tier.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-6">{tier.name}</h3>
              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className="text-sky-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="block w-full py-3 text-center border border-white/20 hover:border-sky-500/50 text-white hover:text-sky-400 rounded-lg transition-colors"
              >
                Contactar
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a
            href="#"
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors text-center"
          >
            Descargar Media Kit
          </a>
          <a
            href="#contacto"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition-colors text-center"
          >
            Contactar para Patrocinar
          </a>
        </div>
      </div>
    </section>
  )
}
