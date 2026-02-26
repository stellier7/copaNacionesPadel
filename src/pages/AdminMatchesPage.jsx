import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const CATEGORIES = ['Open', 'Intermedia', 'Amateur']
const STATUSES = ['scheduled', 'live', 'finished']

function formatScore(match) {
  if (match.status === 'scheduled') return '—'
  const parts = []
  if (match.set1_a != null && match.set1_b != null) parts.push(`${match.set1_a}-${match.set1_b}`)
  if (match.set2_a != null && match.set2_b != null) parts.push(`${match.set2_a}-${match.set2_b}`)
  if (match.set3_a != null && match.set3_b != null) parts.push(`${match.set3_a}-${match.set3_b}`)
  return parts.length ? parts.join(', ') : '0-0'
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const fetchMatches = async () => {
    if (!isSupabaseConfigured()) return
    const { data } = await supabase.from('matches').select('*').order('scheduled_at', { ascending: true })
    setMatches(data ?? [])
  }

  useEffect(() => {
    fetchMatches().finally(() => setLoading(false))

    if (!isSupabaseConfigured()) return
    const channel = supabase
      .channel('admin-matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, fetchMatches)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-white/60">Supabase no configurado.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Partidos</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition"
        >
          Nuevo partido
        </button>
      </div>

      {showAddForm && (
        <MatchForm
          onClose={() => setShowAddForm(false)}
          onSaved={() => {
            setShowAddForm(false)
            fetchMatches()
          }}
        />
      )}

      {loading ? (
        <p className="text-white/60">Cargando...</p>
      ) : matches.length === 0 ? (
        <p className="text-white/50 py-8">No hay partidos. Crea uno nuevo.</p>
      ) : (
        <div className="space-y-3">
          {matches.map((match) => (
            <div
              key={match.id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {match.team_a} vs {match.team_b}
                  </p>
                  <p className="text-sm text-white/50">
                    {match.category} · {match.status} · {formatScore(match)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/live/${match.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm text-sky-400 hover:text-sky-300 border border-sky-500/40 rounded-lg"
                  >
                    Ver
                  </a>
                  <button
                    onClick={() => setEditingId(editingId === match.id ? null : match.id)}
                    className="px-3 py-1.5 text-sm text-white/80 hover:text-white border border-white/20 rounded-lg"
                  >
                    {editingId === match.id ? 'Cerrar' : 'Editar'}
                  </button>
                </div>
              </div>
              {editingId === match.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <MatchForm
                    match={match}
                    onClose={() => setEditingId(null)}
                    onSaved={() => {
                      setEditingId(null)
                      fetchMatches()
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MatchForm({ match, onClose, onSaved }) {
  const isNew = !match
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(
    match
      ? {
          team_a: match.team_a,
          team_b: match.team_b,
          category: match.category,
          status: match.status,
          scheduled_at: match.scheduled_at?.slice(0, 16) ?? '',
          set1_a: match.set1_a ?? '',
          set1_b: match.set1_b ?? '',
          set2_a: match.set2_a ?? '',
          set2_b: match.set2_b ?? '',
          set3_a: match.set3_a ?? '',
          set3_b: match.set3_b ?? '',
          point_a: match.point_a ?? 0,
          point_b: match.point_b ?? 0,
          video_url: match.video_url ?? '',
        }
      : {
          team_a: '',
          team_b: '',
          category: 'Open',
          status: 'scheduled',
          scheduled_at: new Date().toISOString().slice(0, 16),
          set1_a: '',
          set1_b: '',
          set2_a: '',
          set2_b: '',
          set3_a: '',
          set3_b: '',
          point_a: 0,
          point_b: 0,
          video_url: '',
        }
  )

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value === '' ? '' : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const payload = {
      team_a: form.team_a,
      team_b: form.team_b,
      category: form.category,
      status: form.status,
      scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
      set1_a: form.set1_a === '' ? null : Number(form.set1_a),
      set1_b: form.set1_b === '' ? null : Number(form.set1_b),
      set2_a: form.set2_a === '' ? null : Number(form.set2_a),
      set2_b: form.set2_b === '' ? null : Number(form.set2_b),
      set3_a: form.set3_a === '' ? null : Number(form.set3_a),
      set3_b: form.set3_b === '' ? null : Number(form.set3_b),
      point_a: Number(form.point_a) || 0,
      point_b: Number(form.point_b) || 0,
      video_url: form.video_url || null,
    }

    try {
      if (isNew) {
        const { error: insertError } = await supabase.from('matches').insert(payload)
        if (insertError) throw insertError
      } else {
        const { error: updateError } = await supabase
          .from('matches')
          .update(payload)
          .eq('id', match.id)
        if (updateError) throw updateError
      }
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-sky-500 focus:outline-none text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
      <h3 className="text-lg font-semibold text-white">{isNew ? 'Nuevo partido' : 'Editar partido'}</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1">Equipo A</label>
          <input
            type="text"
            value={form.team_a}
            onChange={(e) => handleChange('team_a', e.target.value)}
            required
            className={inputClass}
            placeholder="Tegucigalpa"
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Equipo B</label>
          <input
            type="text"
            value={form.team_b}
            onChange={(e) => handleChange('team_b', e.target.value)}
            required
            className={inputClass}
            placeholder="San Pedro Sula"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1">Categoría</label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Estado</label>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/60 mb-1">Fecha y hora</label>
        <input
          type="datetime-local"
          value={form.scheduled_at}
          onChange={(e) => handleChange('scheduled_at', e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        <div>
          <label className="block text-xs text-white/60 mb-1">Set 1 A</label>
          <input
            type="number"
            min="0"
            value={form.set1_a}
            onChange={(e) => handleChange('set1_a', e.target.value)}
            className={inputClass}
            placeholder="—"
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Set 1 B</label>
          <input
            type="number"
            min="0"
            value={form.set1_b}
            onChange={(e) => handleChange('set1_b', e.target.value)}
            className={inputClass}
            placeholder="—"
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Set 2 A</label>
          <input
            type="number"
            min="0"
            value={form.set2_a}
            onChange={(e) => handleChange('set2_a', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Set 2 B</label>
          <input
            type="number"
            min="0"
            value={form.set2_b}
            onChange={(e) => handleChange('set2_b', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Set 3 A</label>
          <input
            type="number"
            min="0"
            value={form.set3_a}
            onChange={(e) => handleChange('set3_a', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Set 3 B</label>
          <input
            type="number"
            min="0"
            value={form.set3_b}
            onChange={(e) => handleChange('set3_b', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1">Puntos A (0-4)</label>
          <input
            type="number"
            min="0"
            max="4"
            value={form.point_a}
            onChange={(e) => handleChange('point_a', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Puntos B (0-4)</label>
          <input
            type="number"
            min="0"
            max="4"
            value={form.point_b}
            onChange={(e) => handleChange('point_b', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/60 mb-1">URL de video (YouTube/Instagram)</label>
        <input
          type="url"
          value={form.video_url}
          onChange={(e) => handleChange('video_url', e.target.value)}
          className={inputClass}
          placeholder="https://youtube.com/..."
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-semibold rounded-lg transition"
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-white/70 hover:text-white border border-white/20 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
