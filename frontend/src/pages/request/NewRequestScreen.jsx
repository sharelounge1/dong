import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewRequestScreen.css'

function NewRequestScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    title: '',
    description: '',
    groupSize: '1',
    preferredGender: 'any',
    preferredAge: 'any',
    interests: [],
    budget: ''
  })

  const interestOptions = [
    '맛집 탐방', '이자카야', '쇼핑', '관광', '사진',
    '문화체험', '액티비티', '나이트라이프', '카페'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleInterest = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    setFormData({ ...formData, interests: newInterests })
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit request
      navigate('/request/my')
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="step-intro">
              <h2>여행 정보를<br />입력해주세요</h2>
            </div>
            <div className="input-group">
              <label>여행지</label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              >
                <option value="">선택해주세요</option>
                <option value="tokyo">도쿄</option>
                <option value="osaka">오사카</option>
                <option value="kyoto">교토</option>
                <option value="fukuoka">후쿠오카</option>
                <option value="other">기타</option>
              </select>
            </div>
            <div className="input-group">
              <label>여행 기간</label>
              <div className="date-inputs">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <span>~</span>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-group">
              <label>인원</label>
              <select
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
              >
                <option value="1">1명 (혼자)</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명 이상</option>
              </select>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="step-intro">
              <h2>동행 요청 내용을<br />작성해주세요</h2>
            </div>
            <div className="input-group">
              <label>제목</label>
              <input
                type="text"
                name="title"
                placeholder="예: 도쿄 로컬 맛집 탐방"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>상세 내용</label>
              <textarea
                name="description"
                placeholder="원하는 여행 스타일, 가고 싶은 곳, 특별히 경험하고 싶은 것 등을 자유롭게 작성해주세요"
                value={formData.description}
                onChange={handleChange}
                rows={5}
              />
            </div>
            <div className="input-group">
              <label>관심사 (복수 선택)</label>
              <div className="interests-grid">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className={`interest-tag ${formData.interests.includes(interest) ? 'selected' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="step-intro">
              <h2>선호 조건을<br />선택해주세요</h2>
            </div>
            <div className="input-group">
              <label>선호 성별</label>
              <div className="radio-group">
                {[
                  { value: 'any', label: '무관' },
                  { value: 'male', label: '남성' },
                  { value: 'female', label: '여성' }
                ].map((option) => (
                  <label key={option.value} className="radio-option">
                    <input
                      type="radio"
                      name="preferredGender"
                      value={option.value}
                      checked={formData.preferredGender === option.value}
                      onChange={handleChange}
                    />
                    <span className="radio-mark"></span>
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>선호 연령대</label>
              <select
                name="preferredAge"
                value={formData.preferredAge}
                onChange={handleChange}
              >
                <option value="any">무관</option>
                <option value="20s">20대</option>
                <option value="30s">30대</option>
                <option value="40s">40대 이상</option>
              </select>
            </div>
            <div className="input-group">
              <label>예상 예산 (1인)</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  name="budget"
                  placeholder="50000"
                  value={formData.budget}
                  onChange={handleChange}
                />
                <span>원</span>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="new-request-screen">
      <header className="new-request-header">
        <button className="back-btn" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>동행 요청하기</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      <div className="new-request-content">
        <form className="request-form">
          {renderStep()}
        </form>
      </div>

      <div className="new-request-footer">
        <button className="next-btn" onClick={handleNext}>
          {step === 3 ? '요청 등록하기' : '다음'}
        </button>
      </div>
    </div>
  )
}

export default NewRequestScreen
