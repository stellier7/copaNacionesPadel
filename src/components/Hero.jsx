import { useState, useEffect } from 'react'

const EVENT_DATE = new Date('2026-03-15T18:00:00') // Placeholder - update with real date

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = EVENT_DATE - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] p-4 rounded-xl border border-sky-600/30 bg-white/5 backdrop-blur-sm animate-fade-in"
        >
          <span className="text-3xl sm:text-4xl font-bold text-sky-400 tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm text-white/60 uppercase tracking-wider mt-1">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920')] bg-cover bg-center opacity-15 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-sky-500/50 flex items-center justify-center bg-white/5 backdrop-blur">
            <span className="text-2xl font-bold text-sky-400">CN</span>
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          Copa Naciones
          <span className="block text-sky-400 mt-2">Pádel</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          La competencia nacional por equipos que elevará el pádel en Honduras.
        </p>

        <p
          className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Inspirado en el formato Copa Davis, reuniendo a las mejores ciudades del país.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <a
            href="#registro"
            className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/20"
          >
            Inscribirse Ahora
          </a>
          <a
            href="#patrocinadores"
            className="px-8 py-4 border-2 border-sky-500/60 text-sky-400 hover:bg-sky-500/10 font-semibold rounded-lg transition-all duration-300"
          >
            Ser Patrocinador
          </a>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-white/60 text-sm mb-4 uppercase tracking-widest">El evento comienza en</p>
          <CountdownTimer />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="block w-8 h-8 border-2 border-white/30 rounded-full" />
      </div>
    </section>
  )
}
