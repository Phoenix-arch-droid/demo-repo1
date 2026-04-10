import { useEffect, useMemo, useState } from 'react'
import { getStatus } from '../lib/vpnClient'

export function useVpnStatus({ pollMs = 1500 } = {}) {
  const [status, setStatus] = useState({
    connected: false,
    locationId: 'us-east',
    locationName: 'US East (Demo)',
    killSwitchEnabled: false,
    demoMode: true,
    lastChangeAt: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useMemo(() => {
    return async () => {
      try {
        setError(null)
        const data = await getStatus()
        setStatus(data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    let active = true
    let timer = null

    const tick = async () => {
      if (!active) return
      await refresh()
      if (!active) return
      timer = setTimeout(tick, pollMs)
    }

    tick()
    return () => {
      active = false
      if (timer) clearTimeout(timer)
    }
  }, [pollMs, refresh])

  return { status, loading, error, refresh }
}

