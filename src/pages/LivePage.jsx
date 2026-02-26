import { useNavigate } from 'react-router-dom'
import { useMatches } from '../hooks/useMatches'

function formatScore(match) {
  if (match.status === 'scheduled') return 'Por comenzar'
  const parts = []
  if (match.set1_a != null && match.set1_b != null) {
    parts.push(`${match.set1_a}-${match.set1_b}`)
  }
  if (match.set2_a != null && match.set2_b != null) {
    parts.push(`${match.set2_a}-${match.set2_b}`)
  }
  if (match.set3_a != null && match.set3_b != null) {
    parts.push(`${match.set3_a}-${match.set3_b}`)
  }
  return parts.length ? parts.join(', ') : '0-0'
}

function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit' })
}

export default function LivePage() {
  const navigate = useNavigate()
  const { matches, loading, error } = useMatches()
  const liveMatches = matches.filter((m) => m.status === 'live')
  const scheduledMatches = matches.filter((m) => m.status === 'scheduled')

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Torneo en vivo
        </h1>
        <p className="text-white/60 text-sm uppercase tracking-widest mb-12">
          Sigue los partidos en tiempo real
        </p>

        {error && (
          <p className="text-amber-400/80 text-sm mb-4">
            Mostrando datos de ejemplo. Configura Supabase para datos en vivo.
          </p>
        )}

        {loading ? (
          <p className="text-white/60 py-12">Cargando partidos...</p>
        ) : (
          <>
        {liveMatches.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Partidos en vivo
            </h2>
            <div className="space-y-4">
              {liveMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => navigate(`/live/${match.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">
            Próximos partidos
          </h2>
          {scheduledMatches.length > 0 ? (
            <div className="space-y-4">
              {scheduledMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => navigate(`/live/${match.id}`)}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/50 py-8">No hay partidos programados.</p>
          )}
        </section>
          </>
        )}
      </div>
    </main>
  )
}

function MatchCard({ match, onClick }) {
  const isLive = match.status === 'live'

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 sm:p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-300 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-sky-400/90 uppercase tracking-wider">
              {match.category}
            </span>
            {isLive && (
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                EN VIVO
              </span>
            )}
          </div>
          <p className="text-lg sm:text-xl font-semibold text-white">
            {match.team_a} vs {match.team_b}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl sm:text-2xl font-bold text-sky-400 tabular-nums">
            {formatScore(match)}
          </span>
          {match.status === 'scheduled' && (
            <span className="text-sm text-white/50">{formatTime(match.scheduled_at)}</span>
          )}
        </div>
      </div>
    </button>
  )
}
