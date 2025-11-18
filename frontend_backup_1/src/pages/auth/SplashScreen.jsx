import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SplashScreen.css'

function SplashScreen() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
      title: '진짜 로컬 여행을\n경험해보세요',
      description: '현지인 친구와 함께하는\n특별한 일본 여행'
    },
    {
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
      title: '현지인과 함께\n이자카야에서',
      description: '관광객은 모르는 진짜 맛집에서\n즐거운 시간을 보내세요'
    },
    {
      image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800',
      title: '새로운 친구를\n만들어보세요',
      description: '언어와 문화를 넘어\n진정한 우정을 쌓아가세요'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const handleStart = () => {
    navigate('/onboarding')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="splash-screen">
      <div className="splash-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`splash-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
          </div>
        ))}
      </div>

      <div className="splash-content">
        <div className="logo-section">
          <div className="logo">
            <i className="ri-map-pin-heart-fill"></i>
          </div>
          <h1 className="app-name">또리</h1>
          <p className="app-tagline">TORI - Travel with Local Friends</p>
        </div>

        <div className="slide-content">
          <h2 className="slide-title">{slides[currentSlide].title}</h2>
          <p className="slide-description">{slides[currentSlide].description}</p>
        </div>

        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className="splash-actions">
          <button className="btn-start" onClick={handleStart}>
            시작하기
          </button>
          <button className="btn-login" onClick={handleLogin}>
            이미 계정이 있으신가요? <span>로그인</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
