import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NotificationScreen.css'

function NotificationScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')

  const notifications = [
    {
      id: 1,
      type: 'match',
      title: '새로운 동행 신청',
      message: 'Yuki님이 "도쿄 로컬 맛집 탐방" 요청에 신청했습니다.',
      time: '방금 전',
      read: false,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    },
    {
      id: 2,
      type: 'chat',
      title: '새 메시지',
      message: 'Ken님이 메시지를 보냈습니다: "좋은 이자카야 리스트 보내드릴게요"',
      time: '10분 전',
      read: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      id: 3,
      type: 'system',
      title: '포인트 충전 완료',
      message: '10,000P가 충전되었습니다. 현재 잔액: 15,000P',
      time: '1시간 전',
      read: true
    },
    {
      id: 4,
      type: 'match',
      title: '매칭 수락됨',
      message: '김지현님이 동행 신청을 수락했습니다. 채팅을 시작하세요!',
      time: '3시간 전',
      read: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    {
      id: 5,
      type: 'system',
      title: '리뷰 작성 요청',
      message: '최근 여행은 어떠셨나요? 리뷰를 작성해주세요.',
      time: '어제',
      read: true
    },
    {
      id: 6,
      type: 'promo',
      title: '신규 가입 보너스',
      message: '환영 보너스 1,000P가 지급되었습니다!',
      time: '2일 전',
      read: true
    }
  ]

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeTab)

  const getIcon = (type) => {
    switch (type) {
      case 'match': return 'ri-user-heart-line'
      case 'chat': return 'ri-chat-3-line'
      case 'system': return 'ri-notification-3-line'
      case 'promo': return 'ri-gift-line'
      default: return 'ri-notification-3-line'
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case 'match': return '#F43F5E'
      case 'chat': return '#3B82F6'
      case 'system': return '#10B981'
      case 'promo': return '#F59E0B'
      default: return '#64748B'
    }
  }

  return (
    <div className="notification-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>알림</h1>
        <button className="mark-read-btn">모두 읽음</button>
      </header>

      <div className="filter-tabs">
        {[
          { value: 'all', label: '전체' },
          { value: 'match', label: '매칭' },
          { value: 'chat', label: '채팅' },
          { value: 'system', label: '시스템' }
        ].map((tab) => (
          <button
            key={tab.value}
            className={`filter-tab ${activeTab === tab.value ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="notification-content">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <i className="ri-notification-off-line"></i>
            <p>알림이 없습니다</p>
          </div>
        ) : (
          <div className="notification-list">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon" style={{ backgroundColor: `${getIconColor(notification.type)}20` }}>
                  {notification.image ? (
                    <img src={notification.image} alt="" />
                  ) : (
                    <i className={getIcon(notification.type)} style={{ color: getIconColor(notification.type) }}></i>
                  )}
                </div>
                <div className="notification-content-text">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && <span className="unread-dot"></span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationScreen
