import { useParams, Link } from 'react-router-dom'
import { useMatch } from '../hooks/useMatch'

const POINT_LABELS = { 0: '0', 1: '15', 2: '30', 3: '40', 4: 'AD' }

function getYouTubeEmbedUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      return v ? `https://www.youtube.com/embed/${v}` : null
    }
    if (u.hostname.includes('youtu.be')) {
      const v = u.pathname.slice(1).split('?')[0]
      return v ? `https://www.youtube.com/embed/${v}` : null
    }
  } catch {
    return null
  }
  return null
}

function isInstagramUrl(url) {
  if (!url) return false
  try {
    return new URL(url).hostname.includes('instagram.com')
  } catch {
    return false
  }
}

export default function MatchDetailPage() {
  const { matchId } = useParams()
  const { match, loading, error } = useMatch(matchId)

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60">Cargando partido...</p>
        </div>
      </main>
    )
  }

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/70 mb-6">Partido no encontrado.</p>
          <Link to="/live" className="text-sky-400 hover:text-sky-300">
            Volver al torneo en vivo
          </Link>
        </div>
      </main>
    )
  }

  const youtubeEmbed = getYouTubeEmbedUrl(match.video_url)
  const instagramLink = isInstagramUrl(match.video_url) ? match.video_url : null

  const formatSet = (a, b) => {
    if (a == null || b == null) return '—'
    return `${a}-${b}`
  }

  const pointLabel = (p) => POINT_LABELS[p] ?? String(p)

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to="/live"
          className="inline-flex items-center gap-2 text-white/60 hover:text-sky-400 text-sm mb-8 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al torneo en vivo
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-sky-400/90 uppercase tracking-wider">
              {match.category}
            </span>
            {match.status === 'live' && (
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                EN VIVO
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {match.team_a} vs {match.team_b}
          </h1>
        </div>

        {/* Scoreboard */}
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div />
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Sets
            </div>
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Juego actual
            </div>
            <div className="text-right font-semibold text-white">{match.team_a}</div>
            <div className="flex justify-center gap-6 text-2xl sm:text-3xl font-bold text-sky-400 tabular-nums">
              <span>{match.set1_a ?? '—'}</span>
              <span>{match.set2_a ?? '—'}</span>
              <span>{match.set3_a ?? '—'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {match.status === 'live' ? pointLabel(match.point_a) : '—'}
            </div>
            <div className="text-right font-semibold text-white">{match.team_b}</div>
            <div className="flex justify-center gap-6 text-2xl sm:text-3xl font-bold text-sky-400 tabular-nums">
              <span>{match.set1_b ?? '—'}</span>
              <span>{match.set2_b ?? '—'}</span>
              <span>{match.set3_b ?? '—'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {match.status === 'live' ? pointLabel(match.point_b) : '—'}
            </div>
          </div>
        </div>

        {/* Video section */}
        {youtubeEmbed && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Transmisión en vivo</h2>
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
              <iframe
                src={youtubeEmbed}
                title="Transmisión del partido"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {instagramLink && !youtubeEmbed && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Ver en Instagram</h2>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition"
            >
              Abrir transmisión en Instagram
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {match.video_url && !youtubeEmbed && !instagramLink && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Ver transmisión</h2>
            <a
              href={match.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition"
            >
              Abrir enlace
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
