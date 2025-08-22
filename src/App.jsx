import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Page/Login-Page/Login'
import Register from './Page/Register-Form/Register'
import LandingPage from './Page/Landing-Page/LandingPage'
import { ProfilePage } from './Page/Profile-Page/ProfilePage'
import { EditProfilePage } from './Page/edit-profile-page/EditProfilePage'
import { Merchant } from './Page/merchant/Merchant'
import { Activity } from './Page/activity-sport/Activity'
import { SportDetail } from './Page/detail/SportDetail'
import ProtectedRoute from './global-component/ProtectedRoute'
import AdminRoute from './global-component/AdminRoute'
import AntiAdminRoute from './global-component/AntiAdminRoute'
import { SportAdminDashboard } from './Page/admin-dashboard/sport-dashboard/AdminProfile'
import { CategoryAdminDashboard } from './Page/admin-dashboard/category-dashboard/AdminProfile'
import { PaymentAdminDashboard } from './Page/admin-dashboard/payment-dashboard/AdminProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/profile' element={<AntiAdminRoute><ProfilePage/></AntiAdminRoute>}/>
        <Route path='/edit-profile' element={<ProtectedRoute><EditProfilePage/></ProtectedRoute>} />
        <Route path='/merchant' element={<ProtectedRoute><Merchant/></ProtectedRoute>} />
        <Route path='/activity' element={<ProtectedRoute><Activity/></ProtectedRoute>} />
        <Route path='/detail/:id' element={<ProtectedRoute><SportDetail/></ProtectedRoute>} />
        <Route path='/admin-sport' element={<AdminRoute><SportAdminDashboard/></AdminRoute>} />
        <Route path='/admin-category' element={<AdminRoute><CategoryAdminDashboard/></AdminRoute>} />
        <Route path='/admin-payment' element={<AdminRoute><PaymentAdminDashboard/></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
