import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockMatches } from '../data/mockMatches'

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setMatches(mockMatches)
      setLoading(false)
      return
    }

    const fetchMatches = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('matches')
          .select('*')
          .order('scheduled_at', { ascending: true })

        if (fetchError) throw fetchError
        setMatches(data ?? [])
      } catch (err) {
        setError(err.message)
        setMatches(mockMatches)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()

    const channel = supabase
      .channel('matches-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'matches' },
        () => {
          fetchMatches()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { matches, loading, error }
}
