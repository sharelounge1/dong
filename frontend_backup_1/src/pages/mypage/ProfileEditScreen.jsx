import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfileEditScreen.css'

function ProfileEditScreen() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nickname: '김지현',
    bio: '여행을 사랑하는 20대 직장인입니다. 새로운 문화와 음식 탐방을 좋아해요!',
    gender: 'female',
    birthYear: '1998',
    languages: ['한국어', '영어']
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // TODO: Save profile
    alert('프로필이 저장되었습니다.')
    navigate(-1)
  }

  return (
    <div className="profile-edit-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>프로필 편집</h1>
        <button className="save-btn" onClick={handleSave}>저장</button>
      </header>

      <div className="edit-content">
        {/* Profile Image */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
              alt="Profile"
            />
            <button className="camera-btn">
              <i className="ri-camera-line"></i>
            </button>
          </div>
          <button className="change-photo-btn">사진 변경</button>
        </div>

        {/* Form */}
        <div className="edit-form">
          <div className="input-group">
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>자기소개</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              maxLength={200}
            />
            <span className="char-count">{formData.bio.length}/200</span>
          </div>

          <div className="input-group">
            <label>성별</label>
            <div className="radio-group">
              {[
                { value: 'male', label: '남성' },
                { value: 'female', label: '여성' },
                { value: 'other', label: '기타' }
              ].map((option) => (
                <label key={option.value} className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={formData.gender === option.value}
                    onChange={handleChange}
                  />
                  <span className="radio-mark"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>출생연도</label>
            <select
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
            >
              {Array.from({ length: 50 }, (_, i) => 2005 - i).map((year) => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>사용 언어</label>
            <div className="language-tags">
              {formData.languages.map((lang, idx) => (
                <span key={idx} className="language-tag">
                  {lang}
                  <button type="button">
                    <i className="ri-close-line"></i>
                  </button>
                </span>
              ))}
              <button type="button" className="add-language-btn">
                <i className="ri-add-line"></i>
                추가
              </button>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="verification-section">
          <h3>인증 정보</h3>
          <div className="verification-list">
            <div className="verification-item">
              <div className="verification-info">
                <i className="ri-mail-line"></i>
                <span>이메일 인증</span>
              </div>
              <span className="verified-badge">완료</span>
            </div>
            <div className="verification-item">
              <div className="verification-info">
                <i className="ri-phone-line"></i>
                <span>휴대폰 인증</span>
              </div>
              <span className="verified-badge">완료</span>
            </div>
            <div className="verification-item">
              <div className="verification-info">
                <i className="ri-id-card-line"></i>
                <span>신분증 인증</span>
              </div>
              <button className="verify-btn">인증하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditScreen
