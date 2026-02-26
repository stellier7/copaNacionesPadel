import { useState } from 'react'

const CATEGORIES = ['Open', 'Intermedia', 'Amateur']
const CITIES = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Comayagua', 'Choloma', 'El Progreso', 'Otro']

export default function Registration() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    city: '',
    category: '',
    phone: '',
    email: '',
    team: '',
    receipt: null,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files?.[0] : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 1500)
    // TODO: connect to backend
  }

  return (
    <section id="registro" className="py-20 sm:py-28 px-6 bg-[#0f0f0f]">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Registro
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-12">
          Completa tu inscripción
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Nombre completo *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
              placeholder="Juan Pérez"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Edad *</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                min="14"
                max="99"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Ciudad *</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
              >
                <option value="">Seleccionar</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Categoría *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
            >
              <option value="">Seleccionar</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
                placeholder="+504 9999-9999"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Equipo (opcional)</label>
            <input
              type="text"
              name="team"
              value={form.team}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 outline-none transition"
              placeholder="Nombre del equipo"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Subir comprobante de pago *
            </label>
            <div className="mt-2 flex justify-center px-6 py-8 border-2 border-dashed border-white/20 rounded-lg hover:border-sky-500/40 transition-colors">
              <div className="text-center">
                <input
                  type="file"
                  name="receipt"
                  onChange={handleChange}
                  required
                  accept="image/*,.pdf"
                  className="sr-only"
                  id="receipt-upload"
                />
                <label
                  htmlFor="receipt-upload"
                  className="cursor-pointer text-white/60 hover:text-sky-400 transition"
                >
                  <span className="block text-4xl mb-2">📄</span>
                  <span className="text-sm">
                    {form.receipt ? form.receipt.name : 'Haz clic para subir'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 text-white font-semibold rounded-lg transition-all duration-300"
          >
            {submitting ? 'Enviando...' : 'Completar inscripción'}
          </button>
        </form>
      </div>
    </section>
  )
}
