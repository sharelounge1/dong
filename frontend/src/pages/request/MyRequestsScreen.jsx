import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import './MyRequestsScreen.css'

function MyRequestsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('active')

  const requests = [
    {
      id: 1,
      destination: '도쿄',
      dates: '2024.12.20 - 12.24',
      status: 'active',
      applicants: 3,
      title: '도쿄 로컬 맛집 탐방',
      createdAt: '2024.11.15'
    },
    {
      id: 2,
      destination: '오사카',
      dates: '2024.12.28 - 12.31',
      status: 'active',
      applicants: 5,
      title: '오사카 이자카야 투어',
      createdAt: '2024.11.14'
    },
    {
      id: 3,
      destination: '교토',
      dates: '2024.11.01 - 11.05',
      status: 'completed',
      applicants: 2,
      title: '교토 전통 문화 체험',
      createdAt: '2024.10.20'
    }
  ]

  const filteredRequests = requests.filter(r =>
    activeTab === 'active' ? r.status === 'active' : r.status === 'completed'
  )

  return (
    <div className="my-requests-screen">
      <header className="screen-header">
        <h1>내 동행 요청</h1>
        <button className="add-btn" onClick={() => navigate('/request/new')}>
          <i className="ri-add-line"></i>
        </button>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          진행중
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          완료됨
        </button>
      </div>

      <div className="requests-content">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <i className="ri-file-list-3-line"></i>
            <p>요청이 없습니다</p>
            <button onClick={() => navigate('/request/new')}>
              새 요청 만들기
            </button>
          </div>
        ) : (
          <div className="requests-list">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="request-card"
                onClick={() => navigate(`/request/${request.id}`)}
              >
                <div className="request-header">
                  <span className="destination">
                    <i className="ri-map-pin-line"></i>
                    {request.destination}
                  </span>
                  <span className={`status ${request.status}`}>
                    {request.status === 'active' ? '모집중' : '완료'}
                  </span>
                </div>
                <h3 className="request-title">{request.title}</h3>
                <p className="request-dates">
                  <i className="ri-calendar-line"></i>
                  {request.dates}
                </p>
                <div className="request-footer">
                  <span className="applicants">
                    <i className="ri-user-line"></i>
                    {request.applicants}명 신청
                  </span>
                  <span className="created-at">{request.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default MyRequestsScreen
