import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 1000)
  }

  return (
    <section id="contacto" className="py-20 sm:py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Contacto
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-16">
          Estamos para ayudarte
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Canales oficiales</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <a href="mailto:info@copanacionespadel.com" className="hover:text-sky-400 transition">
                  info@copanacionespadel.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <a href="https://wa.me/50499999999" className="hover:text-sky-400 transition">
                  WhatsApp: +504 9999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📷</span>
                <a href="#" className="hover:text-sky-400 transition">
                  @copanacionespadel
                </a>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 outline-none transition"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 outline-none transition"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Mensaje"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 outline-none transition resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 text-white font-semibold rounded-lg transition-colors"
            >
              {submitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
