import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from '@/pages/UserPage'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={UserPage} path="/user/:userId" />
      </Routes>
    </BrowserRouter>
  )
}
