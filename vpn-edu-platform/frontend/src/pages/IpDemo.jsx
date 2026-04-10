import { useEffect, useMemo, useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { useVpnStatus } from '../hooks/useVpnStatus'
import { getIp } from '../lib/vpnClient'

function IpBox({ label, ip, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</div>
      <div className="mt-3 font-mono text-2xl font-semibold text-white">{ip || '—'}</div>
      {hint ? <div className="mt-2 text-sm text-slate-300">{hint}</div> : null}
    </div>
  )
}

export function IpDemo() {
  const { status } = useVpnStatus({ pollMs: 1500 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sample, setSample] = useState(null)

  const takeSample = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getIp()
      setSample(data)
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Failed to fetch IP')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    takeSample()
  }, [])

  const before = useMemo(() => sample?.before?.publicIp, [sample])
  const after = useMemo(() => sample?.after?.publicIp, [sample])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">IP Address Demo</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          This page demonstrates <span className="text-cyan-200">IP masking</span>: when connected, websites should see the VPN server’s public IP instead of yours.
        </p>
      </div>

      <Card
        title="Before vs After"
        subtitle="The backend fetches your observed public IP (and, in Live mode, compares to the VPN egress)."
        right={
          <Button variant="ghost" onClick={takeSample} disabled={loading}>
            Re-check
          </Button>
        }
      >
        {error ? <div className="mb-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</div> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <IpBox
            label="Before"
            ip={before}
            hint="Your device’s public IP as seen by a public “what is my IP” service."
          />
          <IpBox
            label="After"
            ip={after}
            hint={
              status.connected
                ? 'If the VPN is connected and routing is correct, this should differ from “Before”.'
                : 'Connect the VPN, then re-check to see IP masking in action.'
            }
          />
        </div>
        <div className="mt-4 text-xs text-slate-400">
          Tip: in Demo mode, “After” may match “Before” because traffic isn’t actually routed through WireGuard on this OS.
        </div>
      </Card>

      <Card title="What students should notice" subtitle="Key observations when VPN works correctly.">
        <ul className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">Different public IP</div>
            <div className="mt-1 text-slate-300">“After” changes to the VPN server’s egress IP.</div>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="font-semibold text-white">DNS / leak testing</div>
            <div className="mt-1 text-slate-300">A full VPN client also needs DNS routing and leak prevention (beyond this demo).</div>
          </li>
        </ul>
      </Card>
    </div>
  )
}

