import { useState } from 'react'
import { Card } from '../components/Card'
import { Toggle } from '../components/Toggle'
import { useVpnStatus } from '../hooks/useVpnStatus'
import { killSwitchOff, killSwitchOn } from '../lib/vpnClient'

export function KillSwitch() {
  const { status, refresh } = useVpnStatus({ pollMs: 1500 })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const setEnabled = async (enabled) => {
    setBusy(true)
    setError(null)
    try {
      if (enabled) await killSwitchOn()
      else await killSwitchOff()
      await refresh()
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Kill switch update failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card
        title="Kill Switch Control"
        subtitle="Prevents traffic leaks by blocking outbound internet unless the VPN tunnel is up."
      >
        <div className={busy ? 'opacity-70' : ''}>
          <Toggle
            checked={status.killSwitchEnabled}
            onChange={setEnabled}
            label="Kill switch"
            description="When enabled, firewall rules only allow traffic via the VPN interface (wg0)."
          />
        </div>
        {error ? <div className="mt-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</div> : null}

        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
          <div className="font-semibold">Safety note</div>
          <div className="mt-1 text-amber-50/90">
            In Live mode, kill switch rules can block your internet if misconfigured. The scripts include a “disable” command to recover.
          </div>
        </div>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <Card title="How a kill switch works" subtitle="Conceptually: allow VPN interface, block everything else.">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-xs text-slate-200">
            <div className="text-slate-400">Example policy (simplified)</div>
            <div className="mt-2 space-y-1">
              <div>- Allow traffic on interface <span className="text-cyan-200">wg0</span></div>
              <div>- Allow established connections</div>
              <div>- Block all other outbound traffic (prevent leaks)</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300">
            The backend uses Linux firewall rules (iptables) when available. On non-Linux systems it falls back to demo mode so students can still learn the UI + API flow.
          </p>
        </Card>

        <Card title="Leak prevention scenario" subtitle="What happens when the VPN disconnects unexpectedly?">
          <ol className="space-y-3 text-sm text-slate-200">
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="font-semibold text-white">1) VPN connected</div>
              <div className="mt-1 text-slate-300">Normal browsing is routed through the tunnel.</div>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="font-semibold text-white">2) VPN drops</div>
              <div className="mt-1 text-slate-300">Without a kill switch, traffic falls back to the normal network and your real IP leaks.</div>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="font-semibold text-white">3) Kill switch enabled</div>
              <div className="mt-1 text-slate-300">Outbound traffic is blocked until the VPN is reconnected or kill switch is turned off.</div>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  )
}

