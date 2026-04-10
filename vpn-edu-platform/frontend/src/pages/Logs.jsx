import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { LogViewer } from '../components/LogViewer'
import { getLogs } from '../lib/vpnClient'

export function Logs() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getLogs()
      setEntries(data.entries || [])
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Failed to load logs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="space-y-6">
      <Card
        title="Connection Logs"
        subtitle="A timeline of connect/disconnect, location changes, and kill-switch events produced by the backend."
        right={
          <Button variant="ghost" onClick={refresh} disabled={loading}>
            Refresh
          </Button>
        }
      >
        {error ? <div className="mb-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</div> : null}
        <LogViewer entries={entries} />
        {loading ? <div className="mt-3 text-xs text-slate-400">Loading…</div> : null}
      </Card>
    </div>
  )
}

