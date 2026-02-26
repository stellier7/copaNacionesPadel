import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockMatches } from '../data/mockMatches'

export function useMatch(matchId) {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!matchId) {
      setMatch(null)
      setLoading(false)
      return
    }

    if (!isSupabaseConfigured()) {
      const m = mockMatches.find((x) => x.id === matchId)
      setMatch(m ?? null)
      setLoading(false)
      return
    }

    const fetchMatch = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('matches')
          .select('*')
          .eq('id', matchId)
          .single()

        if (fetchError) throw fetchError
        setMatch(data)
      } catch (err) {
        setError(err.message)
        const m = mockMatches.find((x) => x.id === matchId)
        setMatch(m ?? null)
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()

    const channel = supabase
      .channel(`match-${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'matches',
          filter: `id=eq.${matchId}`,
        },
        (payload) => {
          setMatch(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [matchId])

  return { match, loading, error }
}
