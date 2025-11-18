import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './OnboardingScreen.css'

function OnboardingScreen() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: 'ri-search-line',
      title: '동행 요청하기',
      description: '여행 일정과 원하는 동행 스타일을 입력하고\n현지인 친구를 찾아보세요',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
    },
    {
      icon: 'ri-user-heart-line',
      title: '매칭 & 대화',
      description: '신청한 현지인의 프로필을 확인하고\n채팅으로 여행 계획을 세워보세요',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
    },
    {
      icon: 'ri-map-pin-line',
      title: '함께 여행하기',
      description: '현지인만 아는 숨은 명소에서\n특별한 추억을 만들어보세요',
      image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/terms')
    }
  }

  const handleSkip = () => {
    navigate('/terms')
  }

  return (
    <div className="onboarding-screen">
      <div
        className="onboarding-image"
        style={{ backgroundImage: `url(${steps[currentStep].image})` }}
      >
        <div className="image-overlay"></div>
      </div>

      <div className="onboarding-content">
        <button className="skip-btn" onClick={handleSkip}>
          건너뛰기
        </button>

        <div className="step-icon">
          <i className={steps[currentStep].icon}></i>
        </div>

        <h2 className="step-title">{steps[currentStep].title}</h2>
        <p className="step-description">{steps[currentStep].description}</p>

        <div className="step-indicators">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>

        <button className="next-btn" onClick={handleNext}>
          {currentStep === steps.length - 1 ? '시작하기' : '다음'}
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  )
}

export default OnboardingScreen
