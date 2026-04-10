import { readLogs } from '../services/logService.js'
import { getIpSample } from '../services/ipService.js'
import {
  connect,
  disableKillSwitch,
  disconnect,
  enableKillSwitch,
  getStatus,
  setLocation,
} from '../services/vpnService.js'

export async function postConnect(req, res) {
  try {
    const status = await connect()
    res.json(status)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export async function postDisconnect(req, res) {
  try {
    const status = await disconnect()
    res.json(status)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export async function postLocation(req, res) {
  try {
    const { locationId } = req.body || {}
    const status = await setLocation(locationId)
    res.json(status)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

export async function postKillSwitchOn(req, res) {
  try {
    const status = await enableKillSwitch()
    res.json(status)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export async function postKillSwitchOff(req, res) {
  try {
    const status = await disableKillSwitch()
    res.json(status)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export function getStatusHandler(req, res) {
  res.json(getStatus())
}

export function getLogsHandler(req, res) {
  const entries = readLogs({ limit: 250 })
  res.json({ entries })
}

export async function getIpHandler(req, res) {
  try {
    const s = getStatus()
    const sample = await getIpSample({ connected: s.connected, demoMode: s.demoMode })
    res.json(sample)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

