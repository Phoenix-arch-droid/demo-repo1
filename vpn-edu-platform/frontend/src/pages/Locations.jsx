import { useState } from 'react'
import { Card } from '../components/Card'
import { ServerCard } from '../components/ServerCard'
import { useVpnStatus } from '../hooks/useVpnStatus'
import { LOCATIONS } from '../lib/locations'
import { setLocation } from '../lib/vpnClient'

export function Locations() {
  const { status, refresh } = useVpnStatus({ pollMs: 2000 })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const onSelect = async (locationId) => {
    setBusy(true)
    setError(null)
    try {
      await setLocation(locationId)
      await refresh()
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Failed to set location')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card
        title="Server Locations"
        subtitle="Select the VPN server region. This demonstrates that “server selection” is a feature independent from encryption/tunneling."
      >
        {error ? <div className="mb-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</div> : null}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((l) => (
            <ServerCard
              key={l.id}
              id={l.id}
              name={l.name}
              region={l.region}
              latencyMs={l.latencyMs}
              selected={status.locationId === l.id}
              onSelect={onSelect}
              disabled={busy}
            />
          ))}
        </div>
        <div className="mt-4 text-sm text-slate-300">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">Note</div>
            <div className="mt-1">
              In live deployments, changing locations usually updates the WireGuard endpoint and may require reconnecting. This demo keeps the flow simple,
              but the backend is structured so “location selection” is a separate module.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

