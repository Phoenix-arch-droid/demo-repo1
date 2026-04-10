function Badge({ children }) {
  return <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-200 ring-1 ring-white/10">{children}</span>
}

export function LogViewer({ entries }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="grid grid-cols-12 gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-slate-300">
        <div className="col-span-3">Time</div>
        <div className="col-span-2">Action</div>
        <div className="col-span-7">Message</div>
      </div>
      <div className="max-h-[420px] overflow-auto">
        {entries?.length ? (
          entries.map((e) => (
            <div key={e.id} className="grid grid-cols-12 gap-2 border-b border-white/5 px-4 py-3 text-sm">
              <div className="col-span-3 text-xs text-slate-400">{new Date(e.ts).toLocaleString()}</div>
              <div className="col-span-2">
                <Badge>{e.action}</Badge>
              </div>
              <div className="col-span-7 text-slate-200">
                {e.message}
                {e.meta ? <div className="mt-1 text-xs text-slate-400">{JSON.stringify(e.meta)}</div> : null}
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-10 text-center text-sm text-slate-300">No logs yet.</div>
        )}
      </div>
    </div>
  )
}

