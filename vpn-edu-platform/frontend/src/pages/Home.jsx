import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { TunnelViz } from '../components/TunnelViz'
import { useVpnStatus } from '../hooks/useVpnStatus'

export function Home() {
  const { status } = useVpnStatus({ pollMs: 2500 })

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="vp-title text-3xl font-semibold tracking-[0.35em] text-cyan-200">
            VPN LAB // CYBERPUNK
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            This project demonstrates the core building blocks of a VPN: <span className="text-cyan-200">tunneling</span>,{' '}
            <span className="text-cyan-200">encryption</span>, <span className="text-cyan-200">IP masking</span>, server selection,
            and a firewall-based <span className="text-cyan-200">kill switch</span>.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/connect">
            <Button>Open Connect</Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="ghost">How it works</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Current session"
          subtitle="Live status from the backend API."
          right={
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
              {status.locationName}
            </span>
          }
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-slate-400">VPN connection</div>
              <div className="mt-1 text-base font-semibold text-white">{status.connected ? 'Connected' : 'Disconnected'}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-slate-400">Kill switch</div>
              <div className="mt-1 text-base font-semibold text-white">{status.killSwitchEnabled ? 'Enabled' : 'Disabled'}</div>
            </div>
            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-slate-400">Mode</div>
              <div className="mt-1 text-sm text-slate-200">
                {status.demoMode ? (
                  <>
                    <span className="font-semibold text-amber-200">Demo mode</span> (WireGuard not executed on this OS)
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-emerald-200">Live mode</span> (WireGuard + firewall scripts executed)
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <TunnelViz connected={status.connected} />
        </div>
      </div>

      <Card title="Quick learning goals" subtitle="What students should be able to explain after exploring this dashboard.">
        <ul className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">Tunneling</div>
            <div className="mt-1 text-slate-300">Why traffic goes through a virtual interface instead of the normal route.</div>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">Encryption</div>
            <div className="mt-1 text-slate-300">How packets are protected from local network observers.</div>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">IP masking</div>
            <div className="mt-1 text-slate-300">Why websites see the VPN server’s IP instead of yours.</div>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">Kill switch</div>
            <div className="mt-1 text-slate-300">How firewall rules prevent leaks when the tunnel drops.</div>
          </li>
        </ul>
      </Card>
    </div>
  )
}

