import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = async () => {
    setError('')

    // Validation for step 1
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('모든 필드를 입력해주세요.')
        return
      }
      if (formData.password.length < 8) {
        setError('비밀번호는 8자 이상이어야 합니다.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.')
        return
      }
    }

    // Validation for step 3 - Complete signup
    if (step === 3) {
      if (!formData.nickname) {
        setError('닉네임을 입력해주세요.')
        return
      }

      setLoading(true)
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.nickname,
              nickname: formData.nickname,
              phone: formData.phone
            }
          }
        })

        if (error) throw error

        // Update profile with additional info
        if (data.user) {
          await supabase
            .from('profiles')
            .update({
              nickname: formData.nickname,
              phone: formData.phone
            })
            .eq('id', data.user.id)
        }

        alert('회원가입이 완료되었습니다!')
        navigate('/home')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
      return
    }

    setStep(step + 1)
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
          {error && <div className="error-message">{error}</div>}
          {renderStep()}
        </form>
      </div>

      <div className="signup-footer">
        <button className="next-btn" onClick={handleNext} disabled={loading}>
          {loading ? '처리 중...' : step === 3 ? '가입 완료' : '다음'}
        </button>
      </div>
    </div>
  )
}

export default SignupScreen
