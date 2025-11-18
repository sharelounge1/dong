import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .single()

      if (!profile?.is_admin) {
        await supabase.auth.signOut()
        throw new Error('관리자 권한이 없습니다.')
      }

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 인라인 스타일 정의
  const styles = {
    screen: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    },
    container: {
      width: '100%',
      maxWidth: '400px',
      background: '#1E293B',
      borderRadius: '16px',
      padding: '40px 32px',
      boxSizing: 'border-box'
    },
    logo: {
      width: '72px',
      height: '72px',
      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px'
    },
    logoIcon: {
      fontSize: '36px',
      color: 'white'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#F8FAFC',
      textAlign: 'center',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '14px',
      color: '#94A3B8',
      textAlign: 'center',
      margin: '0 0 32px 0'
    },
    errorBox: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#EF4444',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '20px',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#F8FAFC',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      background: '#0F172A',
      border: '1px solid #334155',
      borderRadius: '8px',
      fontSize: '15px',
      color: '#F8FAFC',
      boxSizing: 'border-box',
      outline: 'none'
    },
    loginBtn: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      cursor: 'pointer',
      marginBottom: '20px',
      opacity: loading ? 0.6 : 1
    },
    backBtn: {
      width: '100%',
      background: 'none',
      border: 'none',
      color: '#94A3B8',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      padding: '8px'
    }
  }

  return (
    <div style={styles.screen}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <i className="ri-shield-keyhole-fill" style={styles.logoIcon}></i>
        </div>
        <h1 style={styles.title}>관리자 로그인</h1>
        <p style={styles.subtitle}>또리 관리자 페이지</p>

        <form onSubmit={handleLogin}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.formGroup}>
            <label style={styles.label}>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@admin.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.loginBtn} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <button style={styles.backBtn} onClick={() => navigate('/')}>
          <i className="ri-arrow-left-line"></i>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}

export default AdminLogin
