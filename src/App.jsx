import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/auth/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/vehicles/Vehicles'
import VehicleForm from './pages/vehicles/VehicleForm'
import Parts from './pages/parts/Parts'
import PartForm from './pages/parts/PartForm'
import PartTypes from './pages/parts/PartTypes'
import Orders from './pages/orders/Orders'
import OrderDetail from './pages/orders/OrderDetail'
import Messages from './pages/messages/Messages'
import Settings from './pages/settings/Settings'
import MobileSections from './pages/settings/MobileSections'
import Banners from './pages/settings/Banners'
import DynamicFields from './pages/settings/DynamicFields'
import Admins from './pages/admins/Admins'
import Profile from './pages/Profile'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        
        <Route path="vehicles">
          <Route index element={<Vehicles />} />
          <Route path="new" element={<VehicleForm />} />
          <Route path="edit/:id" element={<VehicleForm />} />
        </Route>

        <Route path="parts">
          <Route index element={<Parts />} />
          <Route path="new" element={<PartForm />} />
          <Route path="edit/:id" element={<PartForm />} />
          <Route path="types" element={<PartTypes />} />
        </Route>

        <Route path="orders">
          <Route index element={<Orders />} />
          <Route path=":id" element={<OrderDetail />} />
        </Route>

        <Route path="messages" element={<Messages />} />

        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path="mobile-sections" element={<MobileSections />} />
          <Route path="banners" element={<Banners />} />
          <Route path="dynamic-fields" element={<DynamicFields />} />
        </Route>

        <Route path="admins" element={<Admins />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
