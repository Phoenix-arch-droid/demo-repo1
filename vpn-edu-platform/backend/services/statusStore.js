import fs from 'fs'
import path from 'path'

const LOG_DIR = path.join(process.cwd(), 'logs')
const STATE_PATH = path.join(LOG_DIR, 'state.json')

const DEFAULT_STATE = {
  connected: false,
  locationId: 'us-east',
  locationName: 'US East (Demo)',
  killSwitchEnabled: false,
  demoMode: true,
  lastChangeAt: null,
}

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true })
}

export function loadState() {
  try {
    ensureLogDir()
    if (!fs.existsSync(STATE_PATH)) return { ...DEFAULT_STATE }
    const raw = fs.readFileSync(STATE_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function saveState(state) {
  ensureLogDir()
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8')
}

