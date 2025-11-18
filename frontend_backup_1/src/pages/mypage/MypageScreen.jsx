import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import './MypageScreen.css'

function MypageScreen() {
  const navigate = useNavigate()

  const user = {
    name: '김지현',
    email: 'jihyun@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    verified: true,
    points: 15000,
    trips: 5,
    reviews: 12
  }

  const menuItems = [
    {
      title: '나의 활동',
      items: [
        { icon: 'ri-file-list-3-line', label: '내 동행 요청', path: '/request/my' },
        { icon: 'ri-user-add-line', label: '내 동행 신청', path: '/apply/my' },
        { icon: 'ri-heart-line', label: '매칭 내역', path: '/match' },
        { icon: 'ri-star-line', label: '내 리뷰', path: '/mypage/reviews' }
      ]
    },
    {
      title: '포인트',
      items: [
        { icon: 'ri-coins-line', label: '포인트 관리', path: '/point', badge: `${user.points.toLocaleString()}P` },
        { icon: 'ri-history-line', label: '거래 내역', path: '/point/history' }
      ]
    },
    {
      title: '설정',
      items: [
        { icon: 'ri-notification-3-line', label: '알림 설정', path: '/settings/notifications' },
        { icon: 'ri-shield-check-line', label: '계정 보안', path: '/settings/security' },
        { icon: 'ri-question-line', label: '고객센터', path: '/support' },
        { icon: 'ri-settings-3-line', label: '설정', path: '/settings' }
      ]
    }
  ]

  return (
    <div className="mypage-screen">
      <header className="screen-header">
        <h1>마이페이지</h1>
        <button className="settings-btn" onClick={() => navigate('/settings')}>
          <i className="ri-settings-3-line"></i>
        </button>
      </header>

      <div className="mypage-content">
        {/* Profile Card */}
        <div className="profile-card" onClick={() => navigate('/mypage/edit')}>
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="profile-info">
            <h2>
              {user.name}
              {user.verified && <i className="ri-verified-badge-fill"></i>}
            </h2>
            <p>{user.email}</p>
          </div>
          <i className="ri-arrow-right-s-line"></i>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-item" onClick={() => navigate('/point')}>
            <span className="stat-value">{user.points.toLocaleString()}</span>
            <span className="stat-label">포인트</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{user.trips}</span>
            <span className="stat-label">여행</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{user.reviews}</span>
            <span className="stat-label">리뷰</span>
          </div>
        </div>

        {/* Menu Sections */}
        {menuItems.map((section, idx) => (
          <div key={idx} className="menu-section">
            <h3>{section.title}</h3>
            <div className="menu-list">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  className="menu-item"
                  onClick={() => navigate(item.path)}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                  {item.badge && <span className="menu-badge">{item.badge}</span>}
                  <i className="ri-arrow-right-s-line arrow"></i>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="logout-btn">
          <i className="ri-logout-box-line"></i>
          로그아웃
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

export default MypageScreen
