import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { vpnRouter } from './routes/vpnRoutes.js'
import { appendLog } from './services/logService.js'
import { getStatus } from './services/vpnService.js'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: false,
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/health', (req, res) => res.json({ ok: true }))
app.use('/vpn', vpnRouter)

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  const s = getStatus()
  appendLog({ action: 'server', message: `Backend started on port ${PORT}`, meta: { demoMode: s.demoMode } })
  // eslint-disable-next-line no-console
  console.log(`Educational VPN backend running on http://localhost:${PORT}`)
})

