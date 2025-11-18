import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ApplyDetailScreen.css'

function ApplyDetailScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const [showApplyForm, setShowApplyForm] = useState(false)

  // Mock data
  const request = {
    id: id,
    user: {
      name: '김지현',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      verified: true,
      trips: 5
    },
    title: '도쿄 로컬 맛집 탐방',
    destination: '도쿄',
    dates: '2024.12.20 - 12.24',
    groupSize: 2,
    description: '도쿄 여행 예정인데 현지인만 아는 숨은 맛집을 찾아다니고 싶어요. 특히 이자카야랑 라멘 맛집 위주로 탐방하고 싶고, 시간이 되면 시부야나 신주쿠 주변도 구경하고 싶습니다.',
    interests: ['맛집 탐방', '이자카야', '관광'],
    preferredGender: '무관',
    preferredAge: '20-30대',
    budget: '50,000원',
    createdAt: '2024.11.15'
  }

  const handleApply = () => {
    // TODO: Submit application
    alert('신청이 완료되었습니다!')
    navigate('/apply')
  }

  return (
    <div className="apply-detail-screen">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>요청 상세</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="detail-content">
        {/* User Info */}
        <div className="user-card">
          <img src={request.user.avatar} alt={request.user.name} className="user-avatar" />
          <div className="user-details">
            <div className="user-name">
              <span>{request.user.name}</span>
              {request.user.verified && (
                <i className="ri-verified-badge-fill"></i>
              )}
            </div>
            <p>{request.user.trips}회 여행 완료</p>
          </div>
        </div>

        {/* Request Info */}
        <section className="request-section">
          <h2 className="request-title">{request.title}</h2>

          <div className="info-grid">
            <div className="info-item">
              <i className="ri-map-pin-line"></i>
              <span>{request.destination}</span>
            </div>
            <div className="info-item">
              <i className="ri-calendar-line"></i>
              <span>{request.dates}</span>
            </div>
            <div className="info-item">
              <i className="ri-group-line"></i>
              <span>{request.groupSize}명</span>
            </div>
            <div className="info-item">
              <i className="ri-money-dollar-circle-line"></i>
              <span>{request.budget}</span>
            </div>
          </div>

          <div className="description">
            <h3>상세 내용</h3>
            <p>{request.description}</p>
          </div>

          <div className="interests">
            <h3>관심사</h3>
            <div className="interest-tags">
              {request.interests.map((interest, idx) => (
                <span key={idx} className="tag">{interest}</span>
              ))}
            </div>
          </div>

          <div className="preferences">
            <h3>선호 조건</h3>
            <div className="pref-items">
              <span>성별: {request.preferredGender}</span>
              <span>연령대: {request.preferredAge}</span>
            </div>
          </div>
        </section>

        {/* Apply Form */}
        {showApplyForm && (
          <div className="apply-form-overlay" onClick={() => setShowApplyForm(false)}>
            <div className="apply-form" onClick={(e) => e.stopPropagation()}>
              <div className="form-header">
                <h3>동행 신청하기</h3>
                <button className="close-btn" onClick={() => setShowApplyForm(false)}>
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="form-content">
                <div className="input-group">
                  <label>신청 메시지</label>
                  <textarea
                    placeholder="자기소개와 함께 동행하고 싶은 이유를 작성해주세요"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                  />
                </div>
                <div className="fee-info">
                  <span>신청 수수료</span>
                  <span className="fee-amount">1,000 포인트</span>
                </div>
                <button className="submit-btn" onClick={handleApply}>
                  신청하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="detail-footer">
        <button className="chat-btn">
          <i className="ri-chat-3-line"></i>
        </button>
        <button className="apply-btn" onClick={() => setShowApplyForm(true)}>
          동행 신청하기
        </button>
      </div>
    </div>
  )
}

export default ApplyDetailScreen
