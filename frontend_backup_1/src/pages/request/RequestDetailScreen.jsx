import { useNavigate, useParams } from 'react-router-dom'
import './RequestDetailScreen.css'

function RequestDetailScreen() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock data
  const request = {
    id: id,
    title: '도쿄 로컬 맛집 탐방',
    destination: '도쿄',
    dates: '2024.12.20 - 12.24',
    status: 'active',
    groupSize: 2,
    description: '도쿄 여행 예정인데 현지인만 아는 숨은 맛집을 찾아다니고 싶어요. 특히 이자카야랑 라멘 맛집 위주로 탐방하고 싶고, 시간이 되면 시부야나 신주쿠 주변도 구경하고 싶습니다. 일본어는 기초 수준이라 한국어 가능하신 분이면 더 좋을 것 같아요!',
    interests: ['맛집 탐방', '이자카야', '관광'],
    preferredGender: '무관',
    preferredAge: '20-30대',
    budget: '50,000원',
    createdAt: '2024.11.15'
  }

  const applicants = [
    {
      id: 1,
      name: 'Yuki',
      age: 26,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      rating: 4.9,
      reviews: 24,
      languages: ['일본어', '한국어'],
      message: '안녕하세요! 도쿄 토박이 Yuki입니다. 로컬 맛집 탐방 좋아해요!',
      appliedAt: '2024.11.16'
    },
    {
      id: 2,
      name: 'Ken',
      age: 28,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 4.8,
      reviews: 18,
      languages: ['일본어', '영어'],
      message: '도쿄 이자카야 전문가입니다. 숨은 명소 많이 알고 있어요!',
      appliedAt: '2024.11.16'
    },
    {
      id: 3,
      name: 'Mei',
      age: 25,
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
      rating: 5.0,
      reviews: 12,
      languages: ['일본어', '한국어', '영어'],
      message: '맛집 투어 가이드 경험 있어요. 함께해요!',
      appliedAt: '2024.11.17'
    }
  ]

  return (
    <div className="request-detail-screen">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>요청 상세</h1>
        <button className="more-btn">
          <i className="ri-more-2-fill"></i>
        </button>
      </header>

      <div className="detail-content">
        <section className="request-info">
          <div className="info-header">
            <span className={`status ${request.status}`}>
              {request.status === 'active' ? '모집중' : '완료'}
            </span>
            <span className="created-at">{request.createdAt}</span>
          </div>

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

        <section className="applicants-section">
          <div className="section-header">
            <h3>신청자 ({applicants.length}명)</h3>
          </div>

          <div className="applicants-list">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="applicant-card">
                <div className="applicant-header">
                  <img src={applicant.image} alt={applicant.name} className="applicant-avatar" />
                  <div className="applicant-info">
                    <h4>{applicant.name}, {applicant.age}</h4>
                    <div className="rating">
                      <i className="ri-star-fill"></i>
                      <span>{applicant.rating}</span>
                      <span className="reviews">({applicant.reviews})</span>
                    </div>
                    <div className="languages">
                      {applicant.languages.map((lang, idx) => (
                        <span key={idx}>{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="applicant-message">{applicant.message}</p>
                <div className="applicant-actions">
                  <button className="btn-profile" onClick={() => navigate(`/profile/${applicant.id}`)}>
                    프로필 보기
                  </button>
                  <button className="btn-accept">
                    수락하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default RequestDetailScreen
