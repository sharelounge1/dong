import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

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

      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      setUsers(usersData || [])

      const { data: requestsData } = await supabase
        .from('travel_requests')
        .select('*, user:profiles!user_id(name, email)')
        .order('created_at', { ascending: false })
        .limit(10)
      setRequests(requestsData || [])

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

  // 스타일 정의
  const styles = {
    dashboard: {
      display: 'flex',
      minHeight: '100vh',
      background: '#0F172A'
    },
    loading: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0F172A',
      color: '#F8FAFC'
    },
    loadingIcon: {
      fontSize: '48px',
      color: '#3B82F6',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      marginTop: '16px',
      color: '#94A3B8',
      fontSize: '16px'
    },
    sidebar: {
      width: '240px',
      minWidth: '240px',
      background: '#1E293B',
      borderRight: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 100
    },
    sidebarHeader: {
      padding: '20px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      borderBottom: '1px solid #334155'
    },
    sidebarHeaderIcon: {
      fontSize: '22px',
      color: '#3B82F6'
    },
    sidebarHeaderText: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#F8FAFC'
    },
    sidebarNav: {
      flex: 1,
      padding: '12px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    navBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 12px',
      background: 'none',
      border: 'none',
      borderRadius: '6px',
      color: '#94A3B8',
      fontSize: '13px',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%'
    },
    navBtnActive: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 12px',
      background: 'rgba(59, 130, 246, 0.15)',
      border: 'none',
      borderRadius: '6px',
      color: '#3B82F6',
      fontSize: '13px',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%'
    },
    navIcon: {
      fontSize: '16px',
      width: '18px',
      textAlign: 'center'
    },
    logoutBtn: {
      margin: '12px 8px',
      padding: '10px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: 'none',
      borderRadius: '6px',
      color: '#EF4444',
      fontSize: '13px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    },
    main: {
      flex: 1,
      marginLeft: '240px',
      padding: '20px',
      minHeight: '100vh',
      boxSizing: 'border-box'
    },
    pageTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#F8FAFC',
      margin: '0 0 20px 0'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginBottom: '20px'
    },
    statCard: {
      background: '#1E293B',
      borderRadius: '10px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    statIcon: {
      width: '40px',
      height: '40px',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: '#3B82F6',
      flexShrink: 0
    },
    statIconWarning: {
      width: '40px',
      height: '40px',
      background: 'rgba(239, 68, 68, 0.1)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: '#EF4444',
      flexShrink: 0
    },
    statInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    },
    statValue: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#F8FAFC'
    },
    statLabel: {
      fontSize: '12px',
      color: '#94A3B8'
    },
    section: {
      background: '#1E293B',
      borderRadius: '10px',
      padding: '16px'
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#F8FAFC',
      margin: '0 0 12px 0'
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '10px 12px',
      textAlign: 'left',
      borderBottom: '1px solid #334155',
      fontSize: '11px',
      fontWeight: '600',
      color: '#94A3B8',
      textTransform: 'uppercase'
    },
    td: {
      padding: '10px 12px',
      textAlign: 'left',
      borderBottom: '1px solid #334155',
      fontSize: '12px',
      color: '#F8FAFC'
    },
    badge: {
      display: 'inline-block',
      padding: '3px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '500'
    },
    badgeVerified: {
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#22C55E'
    },
    badgePending: {
      background: 'rgba(234, 179, 8, 0.15)',
      color: '#EAB308'
    },
    badgeActive: {
      background: 'rgba(59, 130, 246, 0.15)',
      color: '#3B82F6'
    },
    badgeMatched: {
      background: 'rgba(168, 85, 247, 0.15)',
      color: '#A855F7'
    },
    badgeCompleted: {
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#22C55E'
    },
    badgeCancelled: {
      background: 'rgba(107, 114, 128, 0.15)',
      color: '#6B7280'
    },
    badgeResolved: {
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#22C55E'
    },
    actionBtn: {
      padding: '4px 8px',
      background: 'rgba(59, 130, 246, 0.15)',
      border: 'none',
      borderRadius: '4px',
      color: '#3B82F6',
      fontSize: '11px',
      fontWeight: '500',
      cursor: 'pointer'
    }
  }

  if (loading) {
    return (
      <div style={styles.loading}>
        <i className="ri-loader-4-line" style={styles.loadingIcon}></i>
        <p style={styles.loadingText}>로딩 중...</p>
      </div>
    )
  }

  return (
    <div style={styles.dashboard}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <i className="ri-shield-keyhole-fill" style={styles.sidebarHeaderIcon}></i>
          <span style={styles.sidebarHeaderText}>또리 관리자</span>
        </div>

        <nav style={styles.sidebarNav}>
          <button
            style={activeTab === 'overview' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setActiveTab('overview')}
          >
            <i className="ri-dashboard-line" style={styles.navIcon}></i>
            대시보드
          </button>
          <button
            style={activeTab === 'users' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setActiveTab('users')}
          >
            <i className="ri-user-line" style={styles.navIcon}></i>
            사용자 관리
          </button>
          <button
            style={activeTab === 'requests' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setActiveTab('requests')}
          >
            <i className="ri-file-list-line" style={styles.navIcon}></i>
            요청 관리
          </button>
          <button
            style={activeTab === 'reports' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setActiveTab('reports')}
          >
            <i className="ri-alarm-warning-line" style={styles.navIcon}></i>
            신고 관리
          </button>
        </nav>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          <i className="ri-logout-box-line"></i>
          로그아웃
        </button>
      </aside>

      <main style={styles.main}>
        {activeTab === 'overview' && (
          <div>
            <h1 style={styles.pageTitle}>대시보드</h1>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  <i className="ri-user-line"></i>
                </div>
                <div style={styles.statInfo}>
                  <span style={styles.statValue}>{stats.totalUsers}</span>
                  <span style={styles.statLabel}>전체 사용자</span>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  <i className="ri-file-list-line"></i>
                </div>
                <div style={styles.statInfo}>
                  <span style={styles.statValue}>{stats.totalRequests}</span>
                  <span style={styles.statLabel}>동행 요청</span>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  <i className="ri-heart-line"></i>
                </div>
                <div style={styles.statInfo}>
                  <span style={styles.statValue}>{stats.totalMatches}</span>
                  <span style={styles.statLabel}>매칭 완료</span>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconWarning}>
                  <i className="ri-alarm-warning-line"></i>
                </div>
                <div style={styles.statInfo}>
                  <span style={styles.statValue}>{stats.totalReports}</span>
                  <span style={styles.statLabel}>신고 접수</span>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>최근 가입 사용자</h2>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>이름</th>
                      <th style={styles.th}>이메일</th>
                      <th style={styles.th}>가입일</th>
                      <th style={styles.th}>인증</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map(user => (
                      <tr key={user.id}>
                        <td style={styles.td}>{user.name}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td style={styles.td}>
                          <span style={{...styles.badge, ...(user.is_verified ? styles.badgeVerified : styles.badgePending)}}>
                            {user.is_verified ? '인증됨' : '대기중'}
                          </span>
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
          <div>
            <h1 style={styles.pageTitle}>사용자 관리</h1>
            <div style={styles.section}>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>이름</th>
                      <th style={styles.th}>이메일</th>
                      <th style={styles.th}>위치</th>
                      <th style={styles.th}>포인트</th>
                      <th style={styles.th}>가입일</th>
                      <th style={styles.th}>상태</th>
                      <th style={styles.th}>액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td style={styles.td}>{user.name}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>{user.location || '-'}</td>
                        <td style={styles.td}>{user.points?.toLocaleString() || 0}</td>
                        <td style={styles.td}>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td style={styles.td}>
                          <span style={{...styles.badge, ...(user.is_verified ? styles.badgeVerified : styles.badgePending)}}>
                            {user.is_verified ? '인증됨' : '대기중'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {!user.is_verified && (
                            <button
                              style={styles.actionBtn}
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
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <h1 style={styles.pageTitle}>요청 관리</h1>
            <div style={styles.section}>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>제목</th>
                      <th style={styles.th}>작성자</th>
                      <th style={styles.th}>목적지</th>
                      <th style={styles.th}>날짜</th>
                      <th style={styles.th}>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map(request => (
                      <tr key={request.id}>
                        <td style={styles.td}>{request.title}</td>
                        <td style={styles.td}>{request.user?.name}</td>
                        <td style={styles.td}>{request.destination}</td>
                        <td style={styles.td}>{request.start_date} ~ {request.end_date}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            ...(request.status === 'active' ? styles.badgeActive :
                               request.status === 'matched' ? styles.badgeMatched :
                               request.status === 'completed' ? styles.badgeCompleted :
                               styles.badgeCancelled)
                          }}>
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
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h1 style={styles.pageTitle}>신고 관리</h1>
            <div style={styles.section}>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>신고자</th>
                      <th style={styles.th}>피신고자</th>
                      <th style={styles.th}>사유</th>
                      <th style={styles.th}>날짜</th>
                      <th style={styles.th}>상태</th>
                      <th style={styles.th}>액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map(report => (
                      <tr key={report.id}>
                        <td style={styles.td}>{report.reporter?.name}</td>
                        <td style={styles.td}>{report.reported?.name}</td>
                        <td style={styles.td}>{report.reason}</td>
                        <td style={styles.td}>{new Date(report.created_at).toLocaleDateString()}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            ...(report.status === 'resolved' ? styles.badgeResolved : styles.badgePending)
                          }}>
                            {report.status === 'pending' && '대기중'}
                            {report.status === 'reviewed' && '검토중'}
                            {report.status === 'resolved' && '해결됨'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {report.status !== 'resolved' && (
                            <button
                              style={styles.actionBtn}
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
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
