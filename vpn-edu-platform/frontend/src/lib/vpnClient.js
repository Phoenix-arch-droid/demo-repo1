import { api } from './api'

export async function getStatus() {
  const { data } = await api.get('/vpn/status')
  return data
}

export async function connectVpn() {
  const { data } = await api.post('/vpn/connect')
  return data
}

export async function disconnectVpn() {
  const { data } = await api.post('/vpn/disconnect')
  return data
}

export async function setLocation(locationId) {
  const { data } = await api.post('/vpn/location', { locationId })
  return data
}

export async function killSwitchOn() {
  const { data } = await api.post('/vpn/killswitch/on')
  return data
}

export async function killSwitchOff() {
  const { data } = await api.post('/vpn/killswitch/off')
  return data
}

export async function getLogs() {
  const { data } = await api.get('/vpn/logs')
  return data
}

export async function getIp() {
  const { data } = await api.get('/vpn/ip')
  return data
}

