import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './LoginScreen.css'

function LoginScreen() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) throw error

      navigate('/home')
    } catch (err) {
      setError(err.message === 'Invalid login credentials'
        ? '이메일 또는 비밀번호가 올바르지 않습니다.'
        : err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    // Social login implementation
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/home`
      }
    })
    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="login-screen">
      <header className="login-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
      </header>

      <div className="login-content">
        <div className="login-intro">
          <h1>다시 만나서 반가워요!</h1>
          <p>또리와 함께 특별한 여행을 시작하세요</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label>이메일</label>
            <div className="input-wrapper">
              <i className="ri-mail-line"></i>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <div className="input-wrapper">
              <i className="ri-lock-line"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                required
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

          <button type="button" className="forgot-password">
            비밀번호를 잊으셨나요?
          </button>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="divider">
          <span>또는</span>
        </div>

        <div className="social-login">
          <button
            className="social-btn kakao"
            onClick={() => handleSocialLogin('kakao')}
          >
            <i className="ri-kakao-talk-fill"></i>
            카카오로 계속하기
          </button>
          <button
            className="social-btn google"
            onClick={() => handleSocialLogin('google')}
          >
            <i className="ri-google-fill"></i>
            Google로 계속하기
          </button>
          <button
            className="social-btn apple"
            onClick={() => handleSocialLogin('apple')}
          >
            <i className="ri-apple-fill"></i>
            Apple로 계속하기
          </button>
        </div>

        <div className="signup-link">
          계정이 없으신가요?
          <button onClick={() => navigate('/terms')}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
