import { Card } from '../components/Card'

function Diagram() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-3 text-sm font-semibold text-white">Simple VPN diagram</div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 980 200" className="h-40 min-w-[720px] w-full">
          <defs>
            <linearGradient id="pipe" x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(34,211,238,0.15)" />
              <stop offset="50%" stopColor="rgba(34,211,238,0.55)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.15)" />
            </linearGradient>
          </defs>

          <rect x="30" y="65" width="210" height="70" rx="16" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.12)" />
          <text x="135" y="97" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="14" fontWeight="700">
            User
          </text>
          <text x="135" y="118" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="12">
            Laptop / Phone
          </text>

          <rect x="280" y="82" width="260" height="36" rx="18" fill="url(#pipe)" stroke="rgba(34,211,238,0.25)" />
          <text x="410" y="105" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="12" fontWeight="700">
            Encrypted Tunnel
          </text>

          <rect x="575" y="65" width="230" height="70" rx="16" fill="rgba(15,23,42,0.9)" stroke="rgba(34,211,238,0.25)" />
          <text x="690" y="97" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="14" fontWeight="700">
            VPN Server
          </text>
          <text x="690" y="118" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="12">
            WireGuard
          </text>

          <path d="M805 100 C 845 100, 890 100, 940 100" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="8" strokeLinecap="round" />
          <polygon points="940,100 926,92 926,108" fill="rgba(148,163,184,0.55)" />

          <rect x="860" y="65" width="90" height="70" rx="16" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.12)" />
          <text x="905" y="97" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="14" fontWeight="700">
            Web
          </text>
          <text x="905" y="118" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="12">
            Internet
          </text>
        </svg>
      </div>
      <div className="mt-2 text-xs text-slate-300">
        Websites see the <span className="text-cyan-200">VPN server’s IP</span>, not your device’s IP.
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">How VPN Works</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          A VPN creates an encrypted tunnel between your device and a VPN server. Your device sends packets into the tunnel; the VPN server decrypts them and forwards them to the internet.
        </p>
      </div>

      <Diagram />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="What is a VPN?" subtitle="The core idea: private tunnel over public networks.">
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">A VPN encrypts traffic between you and the VPN server.</li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">Your ISP / Wi‑Fi operator can’t see the contents (but may see you’re using a VPN).</li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">Websites see the VPN server’s public IP.</li>
          </ul>
        </Card>

        <Card title="How encryption tunnels work" subtitle="WireGuard uses modern cryptography with a small codebase.">
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              Peers authenticate using public/private keys (like SSH).
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              Packets are encrypted on the client, decrypted on the server.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              The OS routes traffic via a virtual interface (e.g. <code className="text-cyan-200">wg0</code>).
            </li>
          </ul>
        </Card>

        <Card title="What a kill switch does" subtitle="Stops accidental traffic leaks.">
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">If the VPN drops, traffic is blocked instead of falling back to normal routing.</li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">Implemented with firewall rules (iptables/ufw) in Live mode.</li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">This project includes scripts to enable/disable/check kill switch status.</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

