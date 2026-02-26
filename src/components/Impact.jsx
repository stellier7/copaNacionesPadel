import { useState, useEffect, useRef } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Jugadores' },
  { value: 5000, suffix: '+', label: 'Espectadores' },
  { value: 50, suffix: 'K', label: 'Alcance digital' },
]

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const timerRef = useRef(null)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        const duration = 2000
        const steps = 50
        const stepDuration = duration / steps
        const increment = target / steps
        let current = 0
        timerRef.current = setInterval(() => {
          current += increment
          setCount(Math.min(Math.floor(current), target))
          if (current >= target && timerRef.current) {
            clearInterval(timerRef.current)
          }
        }, stepDuration)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Impact() {
  return (
    <section id="impacto" className="py-20 sm:py-28 px-6 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Impacto y Proyección
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-16">
          Crecimiento del pádel en Honduras
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-sky-500/30 transition-colors"
            >
              <div className="text-4xl sm:text-5xl font-bold text-sky-400 mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Proyección Centroamericana</h3>
            <p className="text-white/70 leading-relaxed">
              Copa Naciones Pádel pretende convertirse en el referente del pádel por equipos
              en la región. Con miras a expandirse y atraer participantes de países vecinos,
              el torneo busca elevar el nivel competitivo y la visibilidad del deporte.
            </p>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1595435933710-d3bfd31790c4?w=800"
              alt="Pádel Centroamérica"
              className="w-full h-64 object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
