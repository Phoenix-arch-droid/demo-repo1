import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const LOG_DIR = path.join(process.cwd(), 'logs')
const LOG_PATH = path.join(LOG_DIR, 'activity.jsonl')

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true })
}

export function appendLog({ action, message, meta }) {
  ensureLogDir()
  const entry = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    action,
    message,
    meta: meta ?? null,
  }
  fs.appendFileSync(LOG_PATH, `${JSON.stringify(entry)}\n`, 'utf8')
  return entry
}

export function readLogs({ limit = 200 } = {}) {
  ensureLogDir()
  if (!fs.existsSync(LOG_PATH)) return []
  const raw = fs.readFileSync(LOG_PATH, 'utf8')
  const lines = raw.split('\n').filter(Boolean)
  const slice = lines.slice(Math.max(0, lines.length - limit))
  const parsed = []
  for (const line of slice) {
    try {
      parsed.push(JSON.parse(line))
    } catch {
      // skip
    }
  }
  return parsed
}

