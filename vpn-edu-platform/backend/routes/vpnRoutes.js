import express from 'express'
import { getPublicIP } from '../services/vpnService.js'
import {
  getIpHandler,
  getLogsHandler,
  getStatusHandler,
  postConnect,
  postDisconnect,
  postKillSwitchOff,
  postKillSwitchOn,
  postLocation,
} from '../controllers/vpnController.js'

export const vpnRouter = express.Router()

vpnRouter.post('/connect', postConnect)
vpnRouter.post('/disconnect', postDisconnect)
vpnRouter.post('/location', postLocation)
vpnRouter.post('/killswitch/on', postKillSwitchOn)
vpnRouter.post('/killswitch/off', postKillSwitchOff)
vpnRouter.get('/status', getStatusHandler)
vpnRouter.get('/logs', getLogsHandler)
vpnRouter.get('/ip', getIpHandler)


router.get('/ip', async (req, res) => {
  const ip = await getPublicIP()
  res.json({ ip })
})
