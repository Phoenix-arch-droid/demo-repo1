export function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        {description ? <div className="mt-1 text-sm text-slate-300">{description}</div> : null}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          'relative h-8 w-14 rounded-full ring-1 transition',
          checked ? 'bg-emerald-500/20 ring-emerald-400/40' : 'bg-white/5 ring-white/10',
        ].join(' ')}
        aria-pressed={checked}
      >
        <span
          className={[
            'absolute top-1 h-6 w-6 rounded-full transition',
            checked
              ? 'left-7 bg-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.45)]'
              : 'left-1 bg-slate-200/80',
          ].join(' ')}
        />
      </button>
    </div>
  )
}

