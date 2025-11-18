import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    totalMatches: 0,
    totalReports: 0
  })
  const [users, setUsers] = useState([])
  const [requests, setRequests] = useState([])
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
    fetchData()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate('/admin')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      navigate('/admin')
    }
  }

  const fetchData = async () => {
    try {
      // Fetch stats
      const [usersRes, requestsRes, matchesRes, reportsRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('travel_requests').select('*', { count: 'exact', head: true }),
        supabase.from('matches').select('*', { count: 'exact', head: true }),
        supabase.from('reports').select('*', { count: 'exact', head: true })
      ])

      setStats({
        totalUsers: usersRes.count || 0,
        totalRequests: requestsRes.count || 0,
        totalMatches: matchesRes.count || 0,
        totalReports: reportsRes.count || 0
      })

      // Fetch recent users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      setUsers(usersData || [])

      // Fetch recent requests
      const { data: requestsData } = await supabase
        .from('travel_requests')
        .select('*, user:profiles!user_id(name, email)')
        .order('created_at', { ascending: false })
        .limit(10)
      setRequests(requestsData || [])

      // Fetch reports
      const { data: reportsData } = await supabase
        .from('reports')
        .select('*, reporter:profiles!reporter_id(name), reported:profiles!reported_id(name)')
        .order('created_at', { ascending: false })
        .limit(10)
      setReports(reportsData || [])

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  const handleVerifyUser = async (userId) => {
    await supabase
      .from('profiles')
      .update({ is_verified: true })
      .eq('id', userId)
    fetchData()
  }

  const handleResolveReport = async (reportId) => {
    await supabase
      .from('reports')
      .update({ status: 'resolved' })
      .eq('id', reportId)
    fetchData()
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="ri-loader-4-line"></i>
        <p>로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <i className="ri-shield-keyhole-fill"></i>
          <span>또리 관리자</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            <i className="ri-dashboard-line"></i>
            대시보드
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <i className="ri-user-line"></i>
            사용자 관리
          </button>
          <button
            className={activeTab === 'requests' ? 'active' : ''}
            onClick={() => setActiveTab('requests')}
          >
            <i className="ri-file-list-line"></i>
            요청 관리
          </button>
          <button
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            <i className="ri-alarm-warning-line"></i>
            신고 관리
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="ri-logout-box-line"></i>
          로그아웃
        </button>
      </aside>

      <main className="admin-main">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <h1>대시보드</h1>

            <div className="stats-grid">
              <div className="stat-card">
                <i className="ri-user-line"></i>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalUsers}</span>
                  <span className="stat-label">전체 사용자</span>
                </div>
              </div>
              <div className="stat-card">
                <i className="ri-file-list-line"></i>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalRequests}</span>
                  <span className="stat-label">동행 요청</span>
                </div>
              </div>
              <div className="stat-card">
                <i className="ri-heart-line"></i>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalMatches}</span>
                  <span className="stat-label">매칭 완료</span>
                </div>
              </div>
              <div className="stat-card warning">
                <i className="ri-alarm-warning-line"></i>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalReports}</span>
                  <span className="stat-label">신고 접수</span>
                </div>
              </div>
            </div>

            <div className="recent-section">
              <h2>최근 가입 사용자</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>가입일</th>
                      <th>인증</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td>
                          {user.is_verified ? (
                            <span className="badge verified">인증됨</span>
                          ) : (
                            <span className="badge pending">대기중</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-tab">
            <h1>사용자 관리</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>위치</th>
                    <th>포인트</th>
                    <th>가입일</th>
                    <th>상태</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.location || '-'}</td>
                      <td>{user.points?.toLocaleString() || 0}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        {user.is_verified ? (
                          <span className="badge verified">인증됨</span>
                        ) : (
                          <span className="badge pending">대기중</span>
                        )}
                      </td>
                      <td>
                        {!user.is_verified && (
                          <button
                            className="action-btn"
                            onClick={() => handleVerifyUser(user.id)}
                          >
                            인증
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-tab">
            <h1>요청 관리</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>목적지</th>
                    <th>날짜</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request.id}>
                      <td>{request.title}</td>
                      <td>{request.user?.name}</td>
                      <td>{request.destination}</td>
                      <td>{request.start_date} ~ {request.end_date}</td>
                      <td>
                        <span className={`badge ${request.status}`}>
                          {request.status === 'active' && '활성'}
                          {request.status === 'matched' && '매칭됨'}
                          {request.status === 'completed' && '완료'}
                          {request.status === 'cancelled' && '취소'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-tab">
            <h1>신고 관리</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>신고자</th>
                    <th>피신고자</th>
                    <th>사유</th>
                    <th>날짜</th>
                    <th>상태</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.reporter?.name}</td>
                      <td>{report.reported?.name}</td>
                      <td>{report.reason}</td>
                      <td>{new Date(report.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${report.status}`}>
                          {report.status === 'pending' && '대기중'}
                          {report.status === 'reviewed' && '검토중'}
                          {report.status === 'resolved' && '해결됨'}
                        </span>
                      </td>
                      <td>
                        {report.status !== 'resolved' && (
                          <button
                            className="action-btn"
                            onClick={() => handleResolveReport(report.id)}
                          >
                            해결
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
