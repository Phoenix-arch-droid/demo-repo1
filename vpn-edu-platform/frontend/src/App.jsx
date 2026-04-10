import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell.jsx'
import { Home } from './pages/Home.jsx'
import { Connect } from './pages/Connect.jsx'
import { Locations } from './pages/Locations.jsx'
import { KillSwitch } from './pages/KillSwitch.jsx'
import { HowItWorks } from './pages/HowItWorks.jsx'
import { Logs } from './pages/Logs.jsx'
import { IpDemo } from './pages/IpDemo.jsx'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/killswitch" element={<KillSwitch />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/ip-demo" element={<IpDemo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
