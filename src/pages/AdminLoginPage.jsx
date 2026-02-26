import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function AdminLoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin/matches')
    })
  }, [navigate])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!isSupabaseConfigured()) {
      setError('Supabase no está configurado. Añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env')
      setLoading(false)
      return
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      navigate('/admin/matches')
    } catch (err) {
      setError(err.message ?? 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Panel de árbitros</h1>
          <p className="text-white/60 mb-6">
            Configura Supabase en tu archivo .env para habilitar el panel de administración.
          </p>
          <a href="/" className="text-sky-400 hover:text-sky-300">
            Volver al inicio
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-2">Panel de árbitros</h1>
        <p className="text-white/60 text-sm mb-8">
          Inicia sesión para actualizar marcadores en vivo.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-white/70 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500 focus:outline-none"
              placeholder="arbitro@ejemplo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-white/70 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500 focus:outline-none"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <a href="/" className="block text-center text-white/50 hover:text-sky-400 text-sm mt-6">
          Volver al inicio
        </a>
      </div>
    </main>
  )
}
