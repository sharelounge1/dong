import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignupScreen.css'

function SignupScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phone: '',
    verificationCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete signup
      navigate('/home')
    }
  }

  const handleSendCode = () => {
    // TODO: Send verification code
    alert('인증번호가 발송되었습니다.')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="step-intro">
              <h2>이메일과 비밀번호를<br />입력해주세요</h2>
            </div>
            <div className="input-group">
              <label>이메일</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-group">
              <label>비밀번호</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="8자 이상 입력해주세요"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>비밀번호 확인</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="step-intro">
              <h2>휴대폰 번호를<br />인증해주세요</h2>
            </div>
            <div className="input-group">
              <label>휴대폰 번호</label>
              <div className="input-with-btn">
                <input
                  type="tel"
                  name="phone"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <button type="button" className="send-code-btn" onClick={handleSendCode}>
                  인증번호 발송
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>인증번호</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="인증번호 6자리"
                  value={formData.verificationCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="step-intro">
              <h2>프로필을<br />설정해주세요</h2>
            </div>
            <div className="profile-upload">
              <div className="avatar-placeholder">
                <i className="ri-camera-line"></i>
              </div>
              <button type="button" className="upload-btn">사진 업로드</button>
            </div>
            <div className="input-group">
              <label>닉네임</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="nickname"
                  placeholder="다른 사용자에게 보여질 이름"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="signup-screen">
      <header className="signup-header">
        <button className="back-btn" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="step-indicator">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
            />
          ))}
        </div>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="signup-content">
        <form className="signup-form">
          {renderStep()}
        </form>
      </div>

      <div className="signup-footer">
        <button className="next-btn" onClick={handleNext}>
          {step === 3 ? '가입 완료' : '다음'}
        </button>
      </div>
    </div>
  )
}

export default SignupScreen
