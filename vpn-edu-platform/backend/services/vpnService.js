import { appendLog } from './logService.js'
import { loadState, saveState } from './statusStore.js'
import axios from 'axios'
const LOCATIONS = {
  'us-east': { id: 'us-east', name: 'US East (Demo)' },
  'us-west': { id: 'us-west', name: 'US West (Demo)' },
  'eu-central': { id: 'eu-central', name: 'EU Central (Demo)' },
  'ap-southeast': { id: 'ap-southeast', name: 'AP Southeast (Demo)' },
}

let state = loadState()
// This project runs fully in DEMO mode.
// We intentionally do not invoke WireGuard/iptables/sudo/shell scripts.
function demoMode() {
  return true
}

function setState(patch) {
  state = { ...state, ...patch, lastChangeAt: new Date().toISOString(), demoMode: demoMode() }
  saveState(state)
  return state
}

export function getStatus() {
  state = { ...state, demoMode: demoMode() }
  return state
}

export function getLocations() {
  return Object.values(LOCATIONS)
}

export async function setLocation(locationId) {
  const loc = LOCATIONS[locationId]
  if (!loc) throw new Error('Unknown locationId')

  appendLog({ action: 'location', message: `Location selected: ${loc.name}`, meta: { locationId } })
  setState({ locationId: loc.id, locationName: loc.name })

  return getStatus()
}

export async function connect() {
  if (state.connected) return getStatus()

  appendLog({ action: 'connect', message: 'Connect requested' })

  setState({ connected: true })
  appendLog({ action: 'connect', message: 'VPN marked connected', meta: { demoMode: demoMode() } })
  return getStatus()
}

export async function disconnect() {
  if (!state.connected) return getStatus()

  appendLog({ action: 'disconnect', message: 'Disconnect requested' })

  setState({ connected: false })
  appendLog({ action: 'disconnect', message: 'VPN marked disconnected', meta: { killSwitchEnabled: state.killSwitchEnabled } })
  return getStatus()
}

export async function enableKillSwitch() {
  appendLog({ action: 'killswitch', message: 'Kill switch enable requested' })
  setState({ killSwitchEnabled: true })
  appendLog({ action: 'killswitch', message: 'Kill switch enabled', meta: { demoMode: demoMode(), connected: state.connected } })
  return getStatus()
}

export async function disableKillSwitch() {
  appendLog({ action: 'killswitch', message: 'Kill switch disable requested' })
  setState({ killSwitchEnabled: false })
  appendLog({ action: 'killswitch', message: 'Kill switch disabled', meta: { demoMode: demoMode() } })
  return getStatus()
}

export async function getPublicIP() {
  try {
    const res = await axios.get('https://api.ipify.org?format=json', {
      timeout: 2000,
    })

    appendLog({
      action: 'ip_fetch',
      message: `Fetched public IP: ${res.data.ip}`,
    })

    return res.data.ip
  } catch (err) {
    appendLog({
      action: 'ip_fetch',
      message: 'Failed to fetch public IP',
    })
    return 'Unavailable'
  }
}