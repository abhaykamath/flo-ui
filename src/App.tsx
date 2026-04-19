import { Routes, Route, Navigate } from 'react-router'
import AppLayout from './layouts/AppLayout'
import HomePage from './features/entries/pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
