import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'
import MatchDetailPage from './pages/MatchDetailPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminLayout from './components/AdminLayout'
import AdminMatchesPage from './pages/AdminMatchesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="live" element={<LivePage />} />
        <Route path="live/:matchId" element={<MatchDetailPage />} />
      </Route>
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/matches" element={<AdminLayout />}>
        <Route index element={<AdminMatchesPage />} />
      </Route>
    </Routes>
  )
}

export default App
