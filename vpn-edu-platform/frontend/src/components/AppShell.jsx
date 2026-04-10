import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useVpnStatus } from '../hooks/useVpnStatus'
import { StatusPill } from './StatusPill'
import { Toggle } from './Toggle'
import { killSwitchOff, killSwitchOn } from '../lib/vpnClient'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/connect', label: 'Connect VPN' },
  { to: '/locations', label: 'Server Locations' },
  { to: '/killswitch', label: 'Kill Switch Control' },
  { to: '/ip-demo', label: 'IP Address Demo' },
  { to: '/logs', label: 'Connection Logs' },
  { to: '/how-it-works', label: 'How VPN Works' },
]

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'block rounded-lg px-3 py-2 text-sm transition',
          isActive
            ? 'bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-400/30'
            : 'text-slate-200 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
      end={to === '/'}
    >
      {label}
    </NavLink>
  )
}

export function AppShell({ children }) {
  const { status, refresh } = useVpnStatus({ pollMs: 2000 })
  const [killBusy, setKillBusy] = useState(false)
  const [killError, setKillError] = useState(null)

  const setKillSwitch = async (enabled) => {
    setKillBusy(true)
    setKillError(null)
    try {
      if (enabled) await killSwitchOn()
      else await killSwitchOff()
      await refresh()
    } catch (e) {
      setKillError(e?.response?.data?.error || e?.message || 'Failed to update kill switch')
    } finally {
      setKillBusy(false)
    }
  }

  return (
    <div className="min-h-full relative">
      <div className="pointer-events-none fixed inset-0 bg-cyber-grid" />
      <div className="vp-noise-overlay" />
      <div className="relative mx-auto flex min-h-full max-w-7xl vp-shell-gradient border-x border-cyan-500/10 shadow-[0_0_80px_rgba(14,165,233,0.35)]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 p-5 md:block">
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.5em] text-slate-400 vp-title">
              Educational VPN
            </div>
            <div className="mt-2 text-xl font-semibold tracking-tight text-white vp-title">NEON TUNNEL</div>
            <div className="mt-3 flex items-center justify-between">
              <StatusPill status={status} />
              {status.demoMode ? (
                <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-200 ring-1 ring-amber-400/30">
                  Demo mode
                </span>
              ) : null}
            </div>
          </div>

          <nav className="space-y-1">
            {nav.map((n) => (
              <NavItem key={n.to} to={n.to} label={n.label} />
            ))}
          </nav>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-cyan-500/30 bg-black/30 p-4 shadow-[0_0_28px_rgba(8,145,178,0.55)]">
              <div className="text-xs font-semibold text-slate-200">Active location</div>
              <div className="mt-1 text-sm text-slate-300">{status.locationName}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <Toggle
                checked={status.killSwitchEnabled}
                onChange={setKillSwitch}
                label="Dashboard kill switch"
                description="Firewall-based leak protection (Linux Live mode)."
              />
              {killBusy ? <div className="mt-2 text-[11px] text-slate-400">Updating kill switch…</div> : null}
              {killError ? (
                <div className="mt-2 rounded-lg border border-rose-400/25 bg-rose-500/10 p-2 text-[11px] text-rose-100">
                  {killError}
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-5 md:p-8">
          <header className="mb-6 flex items-center justify-between gap-3 md:hidden">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400">
                Educational VPN Platform
              </div>
              <div className="text-lg font-semibold text-white">VPN Edu Dashboard</div>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={status} />
              {status.demoMode ? (
                <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-200 ring-1 ring-amber-400/30">
                  Demo
                </span>
              ) : null}
            </div>
          </header>

          <div className="md:hidden">
            <div className="mb-4 grid grid-cols-2 gap-2">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    [
                      'rounded-lg border px-3 py-2 text-sm',
                      isActive
                        ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100'
                        : 'border-white/10 bg-black/20 text-slate-200',
                    ].join(' ')
                  }
                  end={n.to === '/'}
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}

