const images = [
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600',
  'https://images.unsplash.com/photo-1595435933710-d3bfd31790c4?w=600',
  'https://images.unsplash.com/photo-1617083274488-7f24e2e4650e?w=600',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80',
  'https://images.unsplash.com/photo-1595435933710-d3bfd31790c4?w=600&q=80',
  'https://images.unsplash.com/photo-1617083274488-7f24e2e4650e?w=600&q=80',
]

export default function Gallery() {
  return (
    <section id="galeria" className="py-20 sm:py-28 px-6 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Galería
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-16">
          Fotos de torneos · Videos · Instagram
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden border border-white/10 group"
            >
              <img
                src={src}
                alt={`Galería ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-white/50 mt-8 text-sm">
          Próximamente: Instagram feed integrado
        </p>
      </div>
    </section>
  )
}
