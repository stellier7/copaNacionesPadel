import { Outlet, useNavigate, Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      navigate('/admin')
      setChecking(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin')
      }
      setChecking(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin')
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white/60">Verificando sesión...</p>
      </main>
    )
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/admin/matches" className="text-white font-semibold">
            Panel árbitros
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/live" className="text-white/60 hover:text-sky-400 text-sm">
              Ver en vivo
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-red-400 text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <main className="pt-24 pb-20 min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
    </>
  )
}
