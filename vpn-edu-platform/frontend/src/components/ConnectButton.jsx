import { Button } from './Button'

export function ConnectButton({ connected, busy, onConnect, onDisconnect }) {
  return (
    <div className="relative">
      <div
        className={[
          'pointer-events-none absolute -inset-3 rounded-3xl blur-xl transition',
          connected ? 'bg-emerald-500/20' : 'bg-cyan-500/20',
          busy ? 'opacity-100' : 'opacity-60',
        ].join(' ')}
      />
      <Button
        variant={connected ? 'danger' : 'primary'}
        disabled={busy}
        onClick={connected ? onDisconnect : onConnect}
        className={[
          'relative w-full rounded-2xl py-4 text-base',
          connected ? '' : 'glow',
          busy ? 'animate-pulse' : '',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-2.5 w-2.5 rounded-full',
            connected ? 'bg-rose-300' : 'bg-cyan-300',
            busy ? 'animate-ping' : '',
          ].join(' ')}
        />
        {busy ? 'Working…' : connected ? 'Disconnect VPN' : 'Connect VPN'}
      </Button>
    </div>
  )
}

