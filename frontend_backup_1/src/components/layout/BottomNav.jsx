import { NavLink } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <i className="ri-home-5-line"></i>
        <span>홈</span>
      </NavLink>
      <NavLink to="/request/my" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <i className="ri-file-list-3-line"></i>
        <span>요청</span>
      </NavLink>
      <NavLink to="/apply" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <i className="ri-user-add-line"></i>
        <span>신청</span>
      </NavLink>
      <NavLink to="/match" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <i className="ri-heart-line"></i>
        <span>매칭</span>
      </NavLink>
      <NavLink to="/mypage" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <i className="ri-user-line"></i>
        <span>MY</span>
      </NavLink>
    </nav>
  )
}

export default BottomNav
