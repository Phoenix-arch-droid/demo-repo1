import { useState } from 'react'
import { Card } from '../components/Card'
import { ConnectButton } from '../components/ConnectButton'
import { TunnelViz } from '../components/TunnelViz'
import { useVpnStatus } from '../hooks/useVpnStatus'
import { connectVpn, disconnectVpn } from '../lib/vpnClient'

export function Connect() {
  const { status, refresh } = useVpnStatus({ pollMs: 1500 })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const onConnect = async () => {
    setBusy(true)
    setError(null)
    try {
      await connectVpn()
      await refresh()
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Failed to connect')
    } finally {
      setBusy(false)
    }
  }

  const onDisconnect = async () => {
    setBusy(true)
    setError(null)
    try {
      await disconnectVpn()
      await refresh()
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Failed to disconnect')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card
        title="Connect VPN"
        subtitle="Starts/stops the VPN tunnel. In Live mode this calls WireGuard scripts; in Demo mode it simulates the state change."
      >
        <ConnectButton connected={status.connected} busy={busy} onConnect={onConnect} onDisconnect={onDisconnect} />
        {error ? <div className="mt-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</div> : null}

        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <div>
            <span className="text-slate-400">Selected location:</span> <span className="text-white">{status.locationName}</span>
          </div>
          <div>
            <span className="text-slate-400">Kill switch:</span>{' '}
            <span className={status.killSwitchEnabled ? 'text-emerald-200' : 'text-slate-200'}>
              {status.killSwitchEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <TunnelViz connected={status.connected} />

        <Card title="What’s happening under the hood?" subtitle="A beginner-friendly explanation of the connect flow.">
          <ol className="space-y-3 text-sm text-slate-200">
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="font-semibold text-white">1) Configure WireGuard</div>
              <div className="mt-1 text-slate-300">
                A configuration file (like <code className="text-cyan-200">client.conf</code>) defines keys, allowed IPs, and the VPN server endpoint.
              </div>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="font-semibold text-white">2) Bring the interface up</div>
              <div className="mt-1 text-slate-300">
                The OS creates a virtual network interface (e.g. <code className="text-cyan-200">wg0</code>) and installs routes so traffic enters the tunnel.
              </div>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="font-semibold text-white">3) (Optional) Enable kill switch</div>
              <div className="mt-1 text-slate-300">
                Firewall rules block outbound traffic unless it goes through the VPN interface, preventing leaks if the VPN drops.
              </div>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  )
}

