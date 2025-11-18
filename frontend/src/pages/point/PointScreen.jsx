import { useNavigate } from 'react-router-dom'
import './PointScreen.css'

function PointScreen() {
  const navigate = useNavigate()

  const pointData = {
    balance: 15000,
    expiring: 2000,
    expiringDate: '2024.12.31'
  }

  const recentHistory = [
    {
      id: 1,
      type: 'charge',
      title: '포인트 충전',
      amount: 10000,
      date: '2024.11.15',
      method: '네이버페이'
    },
    {
      id: 2,
      type: 'use',
      title: '동행 신청 수수료',
      amount: -1000,
      date: '2024.11.14',
      target: 'Yuki'
    },
    {
      id: 3,
      type: 'earn',
      title: '매칭 완료 보너스',
      amount: 500,
      date: '2024.11.10',
      target: '도쿄 여행'
    },
    {
      id: 4,
      type: 'charge',
      title: '포인트 충전',
      amount: 5000,
      date: '2024.11.05',
      method: '카카오페이'
    }
  ]

  return (
    <div className="point-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>포인트</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="point-content">
        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-info">
            <span className="balance-label">보유 포인트</span>
            <h2 className="balance-amount">
              {pointData.balance.toLocaleString()}
              <span>P</span>
            </h2>
          </div>
          <button className="charge-btn" onClick={() => navigate('/point/charge')}>
            충전하기
          </button>
        </div>

        {/* Expiring Notice */}
        {pointData.expiring > 0 && (
          <div className="expiring-notice">
            <i className="ri-error-warning-line"></i>
            <span>
              {pointData.expiringDate}까지 <strong>{pointData.expiring.toLocaleString()}P</strong> 소멸 예정
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <button onClick={() => navigate('/point/history')}>
            <i className="ri-history-line"></i>
            <span>전체 내역</span>
          </button>
          <button onClick={() => navigate('/point/withdraw')}>
            <i className="ri-money-dollar-box-line"></i>
            <span>출금하기</span>
          </button>
          <button onClick={() => navigate('/point/guide')}>
            <i className="ri-question-line"></i>
            <span>이용 안내</span>
          </button>
        </div>

        {/* Recent History */}
        <section className="history-section">
          <div className="section-header">
            <h3>최근 내역</h3>
            <button onClick={() => navigate('/point/history')}>전체보기</button>
          </div>

          <div className="history-list">
            {recentHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className={`history-icon ${item.type}`}>
                  <i className={
                    item.type === 'charge' ? 'ri-add-line' :
                    item.type === 'use' ? 'ri-subtract-line' :
                    'ri-gift-line'
                  }></i>
                </div>
                <div className="history-info">
                  <h4>{item.title}</h4>
                  <p>{item.date}</p>
                </div>
                <span className={`history-amount ${item.amount > 0 ? 'positive' : 'negative'}`}>
                  {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}P
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PointScreen
