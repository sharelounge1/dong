import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import './ApplyListScreen.css'

function ApplyListScreen() {
  const navigate = useNavigate()
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const requests = [
    {
      id: 1,
      user: {
        name: '김지현',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        verified: true
      },
      title: '도쿄 로컬 맛집 탐방',
      destination: '도쿄',
      dates: '12.20 - 12.24',
      groupSize: 2,
      interests: ['맛집 탐방', '이자카야'],
      budget: '50,000원',
      createdAt: '방금 전'
    },
    {
      id: 2,
      user: {
        name: '이수민',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        verified: true
      },
      title: '오사카 이자카야 투어',
      destination: '오사카',
      dates: '12.28 - 12.31',
      groupSize: 3,
      interests: ['이자카야', '나이트라이프'],
      budget: '70,000원',
      createdAt: '10분 전'
    },
    {
      id: 3,
      user: {
        name: '박준영',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        verified: false
      },
      title: '교토 전통 문화 체험',
      destination: '교토',
      dates: '1.05 - 1.08',
      groupSize: 1,
      interests: ['문화체험', '관광', '사진'],
      budget: '60,000원',
      createdAt: '1시간 전'
    },
    {
      id: 4,
      user: {
        name: '최민서',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        verified: true
      },
      title: '후쿠오카 먹방 여행',
      destination: '후쿠오카',
      dates: '1.10 - 1.13',
      groupSize: 2,
      interests: ['맛집 탐방', '라멘', '카페'],
      budget: '45,000원',
      createdAt: '3시간 전'
    }
  ]

  const locations = [
    { value: 'all', label: '전체' },
    { value: 'tokyo', label: '도쿄' },
    { value: 'osaka', label: '오사카' },
    { value: 'kyoto', label: '교토' },
    { value: 'fukuoka', label: '후쿠오카' }
  ]

  // Filter by location and search query
  const filteredRequests = requests.filter(r => {
    const matchesLocation = selectedLocation === 'all' ||
      r.destination.toLowerCase().includes(selectedLocation)
    const matchesSearch = searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.destination.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLocation && matchesSearch
  })

  return (
    <div className="apply-list-screen">
      <header className="screen-header">
        <h1>동행 신청</h1>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder="지역, 관심사로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
      </div>

      {/* Location Filter Tabs */}
      <div className="location-tabs">
        {locations.map((loc) => (
          <button
            key={loc.value}
            className={`location-tab ${selectedLocation === loc.value ? 'active' : ''}`}
            onClick={() => setSelectedLocation(loc.value)}
          >
            {loc.label}
          </button>
        ))}
      </div>

      <div className="apply-content">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <i className="ri-search-line"></i>
            <p>검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="requests-list">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="request-card"
                onClick={() => navigate(`/apply/${request.id}`)}
              >
                <div className="card-header">
                  <div className="user-info">
                    <img src={request.user.avatar} alt={request.user.name} />
                    <span>{request.user.name}</span>
                    {request.user.verified && (
                      <i className="ri-verified-badge-fill verified"></i>
                    )}
                  </div>
                  <span className="created-at">{request.createdAt}</span>
                </div>

                <h3 className="card-title">{request.title}</h3>

                <div className="card-info">
                  <span>
                    <i className="ri-map-pin-line"></i>
                    {request.destination}
                  </span>
                  <span>
                    <i className="ri-calendar-line"></i>
                    {request.dates}
                  </span>
                  <span>
                    <i className="ri-group-line"></i>
                    {request.groupSize}명
                  </span>
                </div>

                <div className="card-tags">
                  {request.interests.map((interest, idx) => (
                    <span key={idx} className="tag">{interest}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <span className="budget">{request.budget}</span>
                  <button className="apply-btn-small">신청</button>
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

export default ApplyListScreen
