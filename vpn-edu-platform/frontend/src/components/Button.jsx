export function Button({ variant = 'primary', disabled, onClick, children, className = '', type = 'button' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold tracking-wide transition transform focus:outline-none focus:ring-2 focus:ring-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0'
  const styles = {
    primary:
      'bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-emerald-400/30 text-cyan-100 ring-1 ring-cyan-400/40 shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:brightness-110',
    ghost: 'bg-white/5 text-slate-100 ring-1 ring-white/15 hover:bg-white/10',
    danger:
      'bg-gradient-to-r from-rose-500/30 via-orange-500/25 to-amber-400/25 text-rose-100 ring-1 ring-rose-400/40 shadow-[0_0_28px_rgba(248,113,113,0.5)] hover:brightness-110',
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={[base, styles[variant], className].join(' ')}>
      {children}
    </button>
  )
}

