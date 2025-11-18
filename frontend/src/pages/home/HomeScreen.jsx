import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import './HomeScreen.css'

function HomeScreen() {
  const navigate = useNavigate()

  // 광고형 현지인 친구 이미지 카드
  const localFriendAds = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
      name: 'Yuki',
      age: 26,
      location: '오사카',
      tags: ['맛집탐방', '이자카야'],
      message: '같이 숨겨진 로컬 이자카야 소개해드릴게요! 같이 여행해요!'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
      name: 'Sakura',
      age: 24,
      location: '도쿄',
      tags: ['쇼핑', '카페투어'],
      message: '도쿄의 숨은 카페와 빈티지샵 같이 돌아봐요!'
    }
  ]

  const reviews = [
    {
      id: 1,
      user: '김지현',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      rating: 5,
      text: '현지인 친구 Yuki와 함께 도쿄 로컬 이자카야에서 정말 즐거운 시간을 보냈어요! 관광객은 절대 못 찾는 숨은 맛집이었는데 최고였습니다 👍',
      image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400',
      date: '2024.11.15'
    },
    {
      id: 2,
      user: '이수민',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5,
      text: '오사카에서 Sakura와 함께 현지인만 아는 야키토리 골목을 탐방했어요. 언어 걱정 없이 편하게 여행할 수 있어서 너무 좋았습니다!',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      date: '2024.11.12'
    },
    {
      id: 3,
      user: '박준영',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      text: '혼자 여행 왔는데 현지인 친구 덕분에 외롭지 않게 즐겼어요. 같이 술 마시면서 일본 문화도 배우고 정말 특별한 경험이었습니다!',
      image: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=400',
      date: '2024.11.08'
    }
  ]

  const popularDestinations = [
    { name: '도쿄', count: 124, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
    { name: '오사카', count: 98, image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400' },
    { name: '교토', count: 76, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400' },
    { name: '후쿠오카', count: 45, image: 'https://images.unsplash.com/photo-1577086664693-894d8c895f93?w=400' }
  ]

  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="header-left">
          <div className="logo-small">
            <i className="ri-map-pin-heart-fill"></i>
          </div>
          <span className="logo-text">또리</span>
        </div>
        <div className="header-right">
          <button className="icon-btn" onClick={() => navigate('/notifications')}>
            <i className="ri-notification-3-line"></i>
            <span className="badge"></span>
          </button>
        </div>
      </header>

      <div className="home-content">
        {/* Hero Section with Image */}
        <section className="hero-section">
          <div className="hero-banner">
            <img
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800"
              alt="로컬 여행"
              className="hero-image"
            />
            <div className="hero-overlay">
              <h1>현지인 친구와 함께하는<br />진짜 로컬 여행</h1>
              <p>현지인 친구를 만나보세요!</p>
            </div>
          </div>
          <button className="cta-btn" onClick={() => navigate('/request/new')}>
            <i className="ri-add-line"></i>
            동행 요청하기
          </button>
        </section>

        {/* Local Friends Ad Section */}
        <section className="section">
          <div className="section-header">
            <h2>현지인 친구들</h2>
          </div>
          <div className="local-friends-ads">
            {localFriendAds.map((ad) => (
              <div key={ad.id} className="friend-ad-card">
                <div className="ad-image-container">
                  <img src={ad.image} alt={ad.name} className="ad-image" />
                  <div className="ad-gradient"></div>
                </div>
                <div className="ad-content">
                  <div className="ad-profile">
                    <h3>{ad.name}, {ad.age}</h3>
                    <p className="ad-location">
                      <i className="ri-map-pin-line"></i>
                      {ad.location}
                    </p>
                  </div>
                  <div className="ad-tags">
                    {ad.tags.map((tag, idx) => (
                      <span key={idx} className="ad-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="ad-message">{ad.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="section">
          <div className="section-header">
            <h2>인기 여행지</h2>
          </div>
          <div className="destinations-grid">
            {popularDestinations.map((dest, idx) => (
              <div key={idx} className="destination-card">
                <img src={dest.image} alt={dest.name} />
                <div className="destination-overlay">
                  <h3>{dest.name}</h3>
                  <p>{dest.count}명 활동 중</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="section reviews-section">
          <div className="section-header">
            <h2>생생한 여행 후기</h2>
            <button className="see-all">더보기</button>
          </div>
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img src={review.avatar} alt={review.user} className="review-avatar" />
                  <div className="review-user-info">
                    <h4>{review.user}</h4>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="ri-star-fill"></i>
                      ))}
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-text">{review.text}</p>
                {review.image && (
                  <img src={review.image} alt="review" className="review-image" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="section how-it-works">
          <h2>또리 이용 방법</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">
                <i className="ri-edit-line"></i>
              </div>
              <h3>1. 동행 요청</h3>
              <p>여행 일정과 원하는 스타일을 입력하세요</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="ri-user-search-line"></i>
              </div>
              <h3>2. 매칭</h3>
              <p>현지인 친구의 신청을 확인하고 선택하세요</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="ri-map-pin-heart-line"></i>
              </div>
              <h3>3. 여행</h3>
              <p>현지인과 함께 특별한 여행을 즐기세요</p>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}

export default HomeScreen
