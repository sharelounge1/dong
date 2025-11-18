import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TermsScreen.css'

function TermsScreen() {
  const navigate = useNavigate()
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false
  })

  const handleAllChange = (e) => {
    const checked = e.target.checked
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      marketing: checked
    })
  }

  const handleSingleChange = (key) => (e) => {
    const newAgreements = {
      ...agreements,
      [key]: e.target.checked
    }
    newAgreements.all = newAgreements.terms && newAgreements.privacy && newAgreements.marketing
    setAgreements(newAgreements)
  }

  const isValid = agreements.terms && agreements.privacy

  const handleNext = () => {
    if (isValid) {
      navigate('/signup')
    }
  }

  return (
    <div className="terms-screen">
      <header className="terms-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>약관 동의</h1>
      </header>

      <div className="terms-content">
        <div className="terms-intro">
          <h2>또리 서비스 이용을 위한<br />약관에 동의해주세요</h2>
        </div>

        <div className="agreement-list">
          <label className="agreement-item all">
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={handleAllChange}
            />
            <span className="checkmark">
              <i className="ri-check-line"></i>
            </span>
            <span className="agreement-text">전체 동의하기</span>
          </label>

          <div className="divider"></div>

          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={handleSingleChange('terms')}
            />
            <span className="checkmark">
              <i className="ri-check-line"></i>
            </span>
            <span className="agreement-text">
              <span className="required">[필수]</span> 서비스 이용약관 동의
            </span>
            <button className="view-btn">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </label>

          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={handleSingleChange('privacy')}
            />
            <span className="checkmark">
              <i className="ri-check-line"></i>
            </span>
            <span className="agreement-text">
              <span className="required">[필수]</span> 개인정보 처리방침 동의
            </span>
            <button className="view-btn">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </label>

          <label className="agreement-item">
            <input
              type="checkbox"
              checked={agreements.marketing}
              onChange={handleSingleChange('marketing')}
            />
            <span className="checkmark">
              <i className="ri-check-line"></i>
            </span>
            <span className="agreement-text">
              <span className="optional">[선택]</span> 마케팅 정보 수신 동의
            </span>
            <button className="view-btn">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </label>
        </div>
      </div>

      <div className="terms-footer">
        <button
          className={`next-btn ${isValid ? 'active' : ''}`}
          onClick={handleNext}
          disabled={!isValid}
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  )
}

export default TermsScreen
