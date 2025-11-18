import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ProfileViewScreen.css'

function ProfileViewScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Mock data - in real app, fetch based on id
  const user = {
    id: id,
    name: '김지현',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    verified: true,
    location: '서울',
    bio: '여행을 사랑하는 20대 직장인입니다. 새로운 문화와 음식 탐방을 좋아해요! 일본 여행은 5번째인데 항상 새로운 경험을 찾고 있어요.',
    languages: ['한국어', '영어', '일본어(기초)'],
    interests: ['맛집 탐방', '이자카야', '카페', '사진', '쇼핑'],
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'
    ],
    stats: {
      trips: 5,
      reviews: 12,
      rating: 4.8
    },
    recentReviews: [
      {
        id: 1,
        reviewer: 'Yuki',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        rating: 5,
        text: '정말 즐거운 시간이었어요! 한국어를 잘 하셔서 소통이 편했습니다.',
        date: '2024.11.10'
      },
      {
        id: 2,
        reviewer: 'Ken',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 5,
        text: '친절하고 재미있는 분이에요. 다음에 또 만나고 싶습니다!',
        date: '2024.10.25'
      }
    ]
  }

  const handlePhotoClick = (index) => {
    setCurrentPhotoIndex(index)
    setShowPhotoModal(true)
  }

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? user.photos.length - 1 : prev - 1
    )
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === user.photos.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="profile-view-screen">
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>프로필</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="profile-main-info">
            <h2>
              {user.name}, {user.age}
              {user.verified && <i className="ri-verified-badge-fill"></i>}
            </h2>
            <p className="location">
              <i className="ri-map-pin-line"></i>
              {user.location}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-value">{user.stats.trips}</span>
            <span className="stat-label">여행</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{user.stats.reviews}</span>
            <span className="stat-label">리뷰</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">
              <i className="ri-star-fill"></i>
              {user.stats.rating}
            </span>
            <span className="stat-label">평점</span>
          </div>
        </div>

        {/* Photos */}
        <section className="profile-section">
          <h3>사진</h3>
          <div className="photo-gallery">
            {user.photos.map((photo, index) => (
              <div
                key={index}
                className="photo-item"
                onClick={() => handlePhotoClick(index)}
              >
                <img src={photo} alt={`사진 ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Bio */}
        <section className="profile-section">
          <h3>소개</h3>
          <p className="bio-text">{user.bio}</p>
        </section>

        {/* Languages */}
        <section className="profile-section">
          <h3>사용 언어</h3>
          <div className="language-list">
            {user.languages.map((lang, idx) => (
              <span key={idx} className="language-tag">{lang}</span>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="profile-section">
          <h3>관심사</h3>
          <div className="interest-list">
            {user.interests.map((interest, idx) => (
              <span key={idx} className="interest-tag">{interest}</span>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="profile-section">
          <h3>받은 리뷰</h3>
          <div className="reviews-list">
            {user.recentReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <img src={review.avatar} alt={review.reviewer} />
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.reviewer}</span>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="ri-star-fill"></i>
                      ))}
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="photo-modal-overlay" onClick={() => setShowPhotoModal(false)}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowPhotoModal(false)}>
              <i className="ri-close-line"></i>
            </button>
            <div className="photo-modal-content">
              <button className="photo-nav-btn prev" onClick={handlePrevPhoto}>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <img
                src={user.photos[currentPhotoIndex]}
                alt={`사진 ${currentPhotoIndex + 1}`}
                className="modal-photo"
              />
              <button className="photo-nav-btn next" onClick={handleNextPhoto}>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
            <div className="photo-indicators">
              {user.photos.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === currentPhotoIndex ? 'active' : ''}`}
                  onClick={() => setCurrentPhotoIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileViewScreen
