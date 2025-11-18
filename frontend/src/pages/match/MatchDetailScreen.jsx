import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MatchDetailScreen.css'

function MatchDetailScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showMeetModal, setShowMeetModal] = useState(false)

  // Mock data
  const match = {
    id: id,
    status: 'confirmed', // confirmed, completed, cancelled
    partner: {
      id: 'partner123',
      name: 'Yuki',
      age: 26,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      verified: true,
      location: '도쿄',
      rating: 4.9,
      reviews: 24
    },
    request: {
      title: '도쿄 로컬 맛집 탐방',
      destination: '도쿄',
      dates: ['2024.12.20', '2024.12.21', '2024.12.22'],
      budget: '50,000원'
    },
    unreadMessages: 3,
    lastMessage: '내일 시부야역에서 만나요!',
    lastMessageTime: '오후 3:42',
    createdAt: '2024.11.16'
  }

  const handleRefund = () => {
    alert('환불 요청이 완료되었습니다.')
    setShowRefundModal(false)
  }

  const handleMeetComplete = () => {
    alert('만남이 완료되었습니다. 리뷰를 작성해주세요!')
    setShowMeetModal(false)
    navigate(`/match/${id}/review`)
  }

  return (
    <div className="match-detail-screen">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>매칭 상세</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="detail-content">
        {/* Match Status */}
        <div className="status-badge-container">
          <span className={`status-badge ${match.status}`}>
            {match.status === 'confirmed' && '매칭 확정'}
            {match.status === 'completed' && '만남 완료'}
            {match.status === 'cancelled' && '취소됨'}
          </span>
        </div>

        {/* Partner Profile Card */}
        <div className="partner-card" onClick={() => navigate(`/profile/${match.partner.id}`)}>
          <img src={match.partner.avatar} alt={match.partner.name} className="partner-avatar" />
          <div className="partner-info">
            <h3>
              {match.partner.name}, {match.partner.age}
              {match.partner.verified && <i className="ri-verified-badge-fill"></i>}
            </h3>
            <p className="partner-location">
              <i className="ri-map-pin-line"></i>
              {match.partner.location}
            </p>
            <div className="partner-rating">
              <i className="ri-star-fill"></i>
              <span>{match.partner.rating}</span>
              <span className="review-count">({match.partner.reviews})</span>
            </div>
          </div>
          <i className="ri-arrow-right-s-line"></i>
        </div>

        {/* Request Info */}
        <section className="info-section">
          <h3>동행 정보</h3>
          <div className="info-card">
            <h4>{match.request.title}</h4>
            <div className="info-row">
              <span><i className="ri-map-pin-line"></i>{match.request.destination}</span>
              <span><i className="ri-money-dollar-circle-line"></i>{match.request.budget}</span>
            </div>
          </div>
        </section>

        {/* Scheduled Dates */}
        <section className="info-section">
          <h3>일정</h3>
          <div className="dates-list">
            {match.request.dates.map((date, idx) => (
              <div key={idx} className="date-item">
                <i className="ri-calendar-check-line"></i>
                <span>{date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Button */}
        <button className="chat-section" onClick={() => navigate(`/match/${id}/chat`)}>
          <div className="chat-info">
            <i className="ri-chat-3-line"></i>
            <div className="chat-preview">
              <span className="chat-label">채팅</span>
              <p className="last-message">{match.lastMessage}</p>
            </div>
          </div>
          <div className="chat-meta">
            {match.unreadMessages > 0 && (
              <span className="unread-badge">{match.unreadMessages}</span>
            )}
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </button>

        {/* Action Buttons */}
        {match.status === 'confirmed' && (
          <div className="action-buttons">
            <button className="refund-btn" onClick={() => setShowRefundModal(true)}>
              <i className="ri-refund-line"></i>
              환불 요청
            </button>
            <button className="meet-btn" onClick={() => setShowMeetModal(true)}>
              <i className="ri-check-double-line"></i>
              만남 완료
            </button>
          </div>
        )}
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="modal-overlay" onClick={() => setShowRefundModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>환불 요청</h3>
            <p>정말 환불을 요청하시겠습니까?</p>
            <p className="modal-note">환불 규정에 따라 처리됩니다.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowRefundModal(false)}>
                취소
              </button>
              <button className="confirm-btn" onClick={handleRefund}>
                환불 요청
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meet Complete Modal */}
      {showMeetModal && (
        <div className="modal-overlay" onClick={() => setShowMeetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>만남 완료</h3>
            <p>{match.partner.name}님과의 만남이 완료되었나요?</p>
            <p className="modal-note">만남 완료 후 리뷰를 작성해주세요.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowMeetModal(false)}>
                취소
              </button>
              <button className="confirm-btn" onClick={handleMeetComplete}>
                완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchDetailScreen
