import { useState, useEffect } from 'react'

const links = [
  { href: '#registro', label: 'Registro' },
  { href: '#patrocinadores', label: 'Patrocinadores' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full border border-sky-500/50 flex items-center justify-center">
              <span className="text-sky-400 font-bold text-sm">CN</span>
            </div>
            <span className="text-white font-semibold hidden sm:inline">Copa Naciones</span>
          </a>

          <button
            className="p-2 text-white hover:text-sky-400 transition"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div
            className={`${
              open ? 'flex' : 'hidden'
            } absolute top-full left-0 right-0 flex-col gap-1 py-4 px-6 bg-black/95 backdrop-blur-md border-b border-white/5`}
          >
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 text-white/80 hover:text-sky-400 transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
