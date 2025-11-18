import { Routes, Route } from 'react-router-dom'

// Auth pages
import SplashScreen from './pages/auth/SplashScreen'
import OnboardingScreen from './pages/auth/OnboardingScreen'
import LoginScreen from './pages/auth/LoginScreen'
import SignupScreen from './pages/auth/SignupScreen'
import TermsScreen from './pages/auth/TermsScreen'

// Main pages
import HomeScreen from './pages/home/HomeScreen'

// Request pages
import NewRequestScreen from './pages/request/NewRequestScreen'
import MyRequestsScreen from './pages/request/MyRequestsScreen'
import RequestDetailScreen from './pages/request/RequestDetailScreen'

// Apply pages
import ApplyListScreen from './pages/apply/ApplyListScreen'
import ApplyDetailScreen from './pages/apply/ApplyDetailScreen'

// Match pages
import MatchListScreen from './pages/match/MatchListScreen'
import MatchDetailScreen from './pages/match/MatchDetailScreen'
import ChatScreen from './pages/match/ChatScreen'

// Point pages
import PointScreen from './pages/point/PointScreen'
import ChargeScreen from './pages/point/ChargeScreen'

// Mypage
import MypageScreen from './pages/mypage/MypageScreen'
import ProfileEditScreen from './pages/mypage/ProfileEditScreen'
import SettingsScreen from './pages/mypage/SettingsScreen'

// Notification
import NotificationScreen from './pages/notification/NotificationScreen'

// Profile
import ProfileViewScreen from './pages/profile/ProfileViewScreen'

// Admin
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/terms" element={<TermsScreen />} />

      {/* Main */}
      <Route path="/home" element={<HomeScreen />} />

      {/* Request */}
      <Route path="/request/new" element={<NewRequestScreen />} />
      <Route path="/request/my" element={<MyRequestsScreen />} />
      <Route path="/request/:id" element={<RequestDetailScreen />} />

      {/* Apply */}
      <Route path="/apply" element={<ApplyListScreen />} />
      <Route path="/apply/:id" element={<ApplyDetailScreen />} />

      {/* Match */}
      <Route path="/match" element={<MatchListScreen />} />
      <Route path="/match/:id" element={<MatchDetailScreen />} />
      <Route path="/match/:id/chat" element={<ChatScreen />} />

      {/* Point */}
      <Route path="/point" element={<PointScreen />} />
      <Route path="/point/charge" element={<ChargeScreen />} />

      {/* Mypage */}
      <Route path="/mypage" element={<MypageScreen />} />
      <Route path="/mypage/edit" element={<ProfileEditScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />

      {/* Notification */}
      <Route path="/notifications" element={<NotificationScreen />} />

      {/* Profile */}
      <Route path="/profile/:id" element={<ProfileViewScreen />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
