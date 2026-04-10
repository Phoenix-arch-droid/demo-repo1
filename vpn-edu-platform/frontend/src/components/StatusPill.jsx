export function StatusPill({ status }) {
  const connected = !!status?.connected
  return (
    <div
      className={[
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1',
        connected
          ? 'bg-emerald-500/10 text-emerald-200 ring-emerald-400/30'
          : 'bg-rose-500/10 text-rose-200 ring-rose-400/30',
      ].join(' ')}
      title={connected ? 'VPN connected' : 'VPN disconnected'}
    >
      <span
        className={[
          'h-2 w-2 rounded-full',
          connected ? 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]' : 'bg-rose-400',
        ].join(' ')}
      />
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  )
}

