export function Card({ title, subtitle, right, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md shadow-[0_0_48px_rgba(15,23,42,0.8)]">
      {(title || subtitle || right) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </header>
      )}
      {children}
    </section>
  )
}

