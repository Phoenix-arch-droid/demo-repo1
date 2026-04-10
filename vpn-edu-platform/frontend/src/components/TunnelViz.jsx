export function TunnelViz({ connected }) {
  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-black/25 p-4 shadow-[0_0_40px_rgba(34,211,238,0.45)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-white">Encrypted Tunnel Visualization</div>
        <div
          className={[
            'rounded-full px-2 py-1 text-[11px] font-semibold ring-1',
            connected
              ? 'bg-emerald-500/10 text-emerald-100 ring-emerald-400/30'
              : 'bg-white/5 text-slate-200 ring-white/10',
          ].join(' ')}
        >
          {connected ? 'Tunnel active' : 'Tunnel idle'}
        </div>
      </div>

      <svg viewBox="0 0 900 180" className="h-36 w-full">
        <defs>
          <linearGradient id="tunnelGrad" x1="0" x2="1">
            <stop offset="0%" stopColor={connected ? 'rgba(34,211,238,0.15)' : 'rgba(148,163,184,0.08)'} />
            <stop offset="50%" stopColor={connected ? 'rgba(34,211,238,0.45)' : 'rgba(148,163,184,0.12)'} />
            <stop offset="100%" stopColor={connected ? 'rgba(34,211,238,0.15)' : 'rgba(148,163,184,0.08)'} />
          </linearGradient>

          <linearGradient id="flowGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
            <stop offset="45%" stopColor="rgba(34,211,238,0.9)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        <g>
          <rect x="30" y="55" width="180" height="70" rx="16" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.12)" />
          <text x="120" y="87" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="14" fontWeight="600">
            User device
          </text>
          <text x="120" y="108" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="12">
            Original traffic
          </text>
        </g>

        <g>
          <rect x="345" y="55" width="210" height="70" rx="16" fill="rgba(15,23,42,0.9)" stroke="rgba(34,211,238,0.25)" />
          <text x="450" y="87" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="14" fontWeight="600">
            VPN Server
          </text>
          <text x="450" y="108" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="12">
            WireGuard endpoint
          </text>
        </g>

        <g>
          <rect x="700" y="55" width="170" height="70" rx="16" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.12)" />
          <text x="785" y="87" textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="14" fontWeight="600">
            Internet
          </text>
          <text x="785" y="108" textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="12">
            Public websites
          </text>
        </g>

        {/* Tunnel */}
        <g>
          <rect x="235" y="72" width="90" height="36" rx="18" fill="url(#tunnelGrad)" stroke="rgba(34,211,238,0.2)" />
          <text x="280" y="95" textAnchor="middle" fill="rgba(226,232,240,0.9)" fontSize="12" fontWeight="600">
            Encrypted
          </text>

          <rect x="575" y="72" width="105" height="36" rx="18" fill="rgba(148,163,184,0.08)" stroke="rgba(255,255,255,0.08)" />
          <text x="628" y="95" textAnchor="middle" fill="rgba(226,232,240,0.85)" fontSize="12">
            Decrypted
          </text>
        </g>

        {/* Flow lines */}
        <path
          d="M210 90 C 250 90, 290 90, 345 90"
          fill="none"
          stroke={connected ? 'rgba(34,211,238,0.45)' : 'rgba(148,163,184,0.18)'}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M555 90 C 600 90, 640 90, 700 90"
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {connected ? (
          <g>
            <path d="M210 90 C 250 90, 290 90, 345 90" fill="none" stroke="url(#flowGrad)" strokeWidth="10" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" values="0 220;60 160;0 220" dur="1.3s" repeatCount="indefinite" />
              <animate attributeName="stroke-dashoffset" values="0;-80;-160" dur="1.3s" repeatCount="indefinite" />
            </path>
          </g>
        ) : null}
      </svg>

      <div className="mt-2 text-xs text-slate-300">
        Traffic from your device is <span className="text-cyan-200">encrypted</span> inside the tunnel, delivered to the VPN server,
        then forwarded to the internet using the VPN server’s public IP.
      </div>
    </div>
  )
}

