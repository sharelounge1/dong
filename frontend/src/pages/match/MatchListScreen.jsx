import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import './MatchListScreen.css'

function MatchListScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('active')

  const matches = [
    {
      id: 1,
      partner: {
        name: 'Yuki',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        verified: true
      },
      title: '도쿄 로컬 맛집 탐방',
      destination: '도쿄',
      dates: '12.20 - 12.24',
      status: 'active',
      unreadMessages: 3,
      lastMessage: '내일 시부야역에서 만나요!',
      lastMessageTime: '오후 3:42'
    },
    {
      id: 2,
      partner: {
        name: 'Ken',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        verified: true
      },
      title: '오사카 이자카야 투어',
      destination: '오사카',
      dates: '12.28 - 12.31',
      status: 'active',
      unreadMessages: 0,
      lastMessage: '좋은 이자카야 리스트 보내드릴게요',
      lastMessageTime: '어제'
    },
    {
      id: 3,
      partner: {
        name: 'Mei',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
        verified: true
      },
      title: '교토 전통 문화 체험',
      destination: '교토',
      dates: '11.01 - 11.05',
      status: 'completed',
      unreadMessages: 0,
      lastMessage: '즐거웠어요! 다음에 또 만나요 😊',
      lastMessageTime: '11.05'
    }
  ]

  const filteredMatches = matches.filter(m =>
    activeTab === 'active' ? m.status === 'active' : m.status === 'completed'
  )

  return (
    <div className="match-list-screen">
      <header className="screen-header">
        <h1>매칭</h1>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          진행중
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          완료됨
        </button>
      </div>

      <div className="match-content">
        {filteredMatches.length === 0 ? (
          <div className="empty-state">
            <i className="ri-heart-line"></i>
            <p>매칭이 없습니다</p>
            <button onClick={() => navigate('/apply')}>
              동행 신청하러 가기
            </button>
          </div>
        ) : (
          <div className="match-list">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="match-card"
                onClick={() => navigate(`/match/${match.id}`)}
              >
                <div className="match-avatar">
                  <img src={match.partner.avatar} alt={match.partner.name} />
                  {match.unreadMessages > 0 && (
                    <span className="unread-badge">{match.unreadMessages}</span>
                  )}
                </div>
                <div className="match-info">
                  <div className="match-header">
                    <h3>
                      {match.partner.name}
                      {match.partner.verified && (
                        <i className="ri-verified-badge-fill"></i>
                      )}
                    </h3>
                    <span className="message-time">{match.lastMessageTime}</span>
                  </div>
                  <p className="match-title">{match.title}</p>
                  <p className="last-message">{match.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default MatchListScreen
