import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SettingsScreen.css'

function SettingsScreen() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    pushNotification: true,
    emailNotification: false,
    marketingNotification: false
  })

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    })
  }

  return (
    <div className="settings-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>설정</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="settings-content">
        {/* Notification Settings */}
        <section className="settings-section">
          <h3>알림</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <span>푸시 알림</span>
                <p>매칭, 채팅 등의 알림을 받습니다</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.pushNotification}
                  onChange={() => toggleSetting('pushNotification')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span>이메일 알림</span>
                <p>중요 알림을 이메일로 받습니다</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.emailNotification}
                  onChange={() => toggleSetting('emailNotification')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span>마케팅 알림</span>
                <p>이벤트, 프로모션 정보를 받습니다</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.marketingNotification}
                  onChange={() => toggleSetting('marketingNotification')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section className="settings-section">
          <h3>계정</h3>
          <div className="settings-list">
            <button className="setting-link" onClick={() => navigate('/settings/password')}>
              <span>비밀번호 변경</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <button className="setting-link" onClick={() => navigate('/settings/phone')}>
              <span>연락처 변경</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <button className="setting-link" onClick={() => navigate('/settings/language')}>
              <span>언어 설정</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </section>

        {/* Support */}
        <section className="settings-section">
          <h3>지원</h3>
          <div className="settings-list">
            <button className="setting-link" onClick={() => navigate('/support/faq')}>
              <span>자주 묻는 질문</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <button className="setting-link" onClick={() => navigate('/support/contact')}>
              <span>문의하기</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <button className="setting-link" onClick={() => navigate('/terms')}>
              <span>이용약관</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <button className="setting-link" onClick={() => navigate('/privacy')}>
              <span>개인정보 처리방침</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </section>

        {/* App Info */}
        <section className="settings-section">
          <h3>앱 정보</h3>
          <div className="settings-list">
            <div className="setting-item static">
              <span>버전</span>
              <span className="version">1.0.0</span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger">
          <div className="settings-list">
            <button className="setting-link danger">
              <span>로그아웃</span>
            </button>
            <button className="setting-link danger">
              <span>회원 탈퇴</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsScreen
