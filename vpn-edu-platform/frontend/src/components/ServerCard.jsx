export function ServerCard({ id, name, region, latencyMs, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(id)}
      className={[
        'group w-full rounded-2xl border p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-60',
        selected
          ? 'border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_40px_rgba(34,211,238,0.08)]'
          : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.04]',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="mt-1 text-xs text-slate-400">{region}</div>
        </div>
        <div
          className={[
            'rounded-full px-2 py-1 text-[11px] font-semibold ring-1',
            selected ? 'bg-cyan-500/10 text-cyan-100 ring-cyan-400/30' : 'bg-white/5 text-slate-200 ring-white/10',
          ].join(' ')}
        >
          {latencyMs} ms
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
        <span
          className={[
            'h-2 w-2 rounded-full',
            selected ? 'bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]' : 'bg-slate-500',
          ].join(' ')}
        />
        {selected ? 'Selected' : 'Select server'}
      </div>
    </button>
  )
}

