import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ChatScreen.css'

function ChatScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  const partner = {
    name: 'Yuki',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    isOnline: true
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'partner',
      text: '안녕하세요! 도쿄 여행 동행 신청해주셔서 감사해요 😊',
      time: '오후 2:30'
    },
    {
      id: 2,
      sender: 'me',
      text: '안녕하세요! 네 맛집 탐방 같이 하고 싶어서요!',
      time: '오후 2:32'
    },
    {
      id: 3,
      sender: 'partner',
      text: '좋아요! 제가 자주 가는 이자카야가 있는데, 관광객은 잘 모르는 곳이에요',
      time: '오후 2:35'
    },
    {
      id: 4,
      sender: 'me',
      text: '오 완전 기대돼요! 혹시 어디쪽인가요?',
      time: '오후 2:36'
    },
    {
      id: 5,
      sender: 'partner',
      text: '시부야역 근처인데, 골목 안쪽에 숨어있어요. 내일 시부야역에서 만나요!',
      time: '오후 3:42'
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: message,
        time: new Date().toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="partner-info">
          <img src={partner.avatar} alt={partner.name} />
          <div>
            <h3>{partner.name}</h3>
            {partner.isOnline && <span className="online-status">온라인</span>}
          </div>
        </div>
        <button className="menu-btn">
          <i className="ri-more-2-fill"></i>
        </button>
      </header>

      <div className="messages-container">
        <div className="date-divider">
          <span>오늘</span>
        </div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
          >
            {msg.sender === 'partner' && (
              <img src={partner.avatar} alt={partner.name} className="message-avatar" />
            )}
            <div className="message-content">
              <div className="message-bubble">
                <p>{msg.text}</p>
              </div>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <button className="attach-btn">
          <i className="ri-add-line"></i>
        </button>
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className={`send-btn ${message.trim() ? 'active' : ''}`}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <i className="ri-send-plane-2-fill"></i>
        </button>
      </div>
    </div>
  )
}

export default ChatScreen
