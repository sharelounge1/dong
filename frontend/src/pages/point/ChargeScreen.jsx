import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChargeScreen.css'

function ChargeScreen() {
  const navigate = useNavigate()
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')

  const amounts = [
    { value: 5000, label: '5,000P' },
    { value: 10000, label: '10,000P' },
    { value: 30000, label: '30,000P' },
    { value: 50000, label: '50,000P' }
  ]

  const paymentMethods = [
    { id: 'naverpay', name: '네이버페이', icon: 'ri-n-box-fill', color: '#03C75A' },
    { id: 'kakaopay', name: '카카오페이', icon: 'ri-kakao-talk-fill', color: '#FEE500' },
    { id: 'card', name: '신용/체크카드', icon: 'ri-bank-card-line', color: '#3B82F6' }
  ]

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e) => {
    setSelectedAmount(null)
    setCustomAmount(e.target.value)
  }

  const finalAmount = selectedAmount || Number(customAmount) || 0

  const handleCharge = () => {
    if (finalAmount > 0 && selectedMethod) {
      // TODO: Process payment
      alert(`${finalAmount.toLocaleString()}P 충전이 완료되었습니다!`)
      navigate('/point')
    }
  }

  return (
    <div className="charge-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1>포인트 충전</h1>
        <div style={{ width: 40 }}></div>
      </header>

      <div className="charge-content">
        {/* Amount Selection */}
        <section className="section">
          <h3>충전 금액</h3>
          <div className="amount-grid">
            {amounts.map((amount) => (
              <button
                key={amount.value}
                className={`amount-btn ${selectedAmount === amount.value ? 'selected' : ''}`}
                onClick={() => handleAmountSelect(amount.value)}
              >
                {amount.label}
              </button>
            ))}
          </div>
          <div className="custom-amount">
            <input
              type="number"
              placeholder="직접 입력"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
            <span>P</span>
          </div>
        </section>

        {/* Payment Method */}
        <section className="section">
          <h3>결제 수단</h3>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`method-btn ${selectedMethod === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <i className={method.icon} style={{ color: method.color }}></i>
                <span>{method.name}</span>
                {selectedMethod === method.id && (
                  <i className="ri-check-line check-icon"></i>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Summary */}
        {finalAmount > 0 && (
          <section className="summary-section">
            <div className="summary-row">
              <span>충전 포인트</span>
              <span>{finalAmount.toLocaleString()}P</span>
            </div>
            <div className="summary-row">
              <span>결제 금액</span>
              <span className="total">{finalAmount.toLocaleString()}원</span>
            </div>
          </section>
        )}
      </div>

      <div className="charge-footer">
        <button
          className={`charge-btn ${finalAmount > 0 && selectedMethod ? 'active' : ''}`}
          onClick={handleCharge}
          disabled={!finalAmount || !selectedMethod}
        >
          {finalAmount > 0 ? `${finalAmount.toLocaleString()}원 결제하기` : '충전할 금액을 선택하세요'}
        </button>
      </div>
    </div>
  )
}

export default ChargeScreen
