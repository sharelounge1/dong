import { supabase } from '../lib/supabase'

// =============================================
// 신청 관련
// =============================================

// 동행 신청하기
export const applyToRequest = async (requestId, applicantId, message = '') => {
  const { data, error } = await supabase
    .from('applications')
    .insert({
      request_id: requestId,
      applicant_id: applicantId,
      message
    })
    .select()
    .single()

  return { data, error }
}

// 내 신청 목록 조회
export const getMyApplications = async (userId) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      request:travel_requests(
        id, title, destination, start_date, end_date, status,
        user:profiles!user_id(id, name, avatar_url)
      )
    `)
    .eq('applicant_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

// 신청 수락
export const acceptApplication = async (applicationId, requestId, requesterId, partnerId) => {
  // 신청 상태 업데이트
  const { error: appError } = await supabase
    .from('applications')
    .update({ status: 'accepted' })
    .eq('id', applicationId)

  if (appError) return { error: appError }

  // 다른 신청들 거절 처리
  await supabase
    .from('applications')
    .update({ status: 'rejected' })
    .eq('request_id', requestId)
    .neq('id', applicationId)

  // 요청 상태 업데이트
  await supabase
    .from('travel_requests')
    .update({ status: 'matched' })
    .eq('id', requestId)

  // 매칭 생성
  const { data, error } = await supabase
    .from('matches')
    .insert({
      request_id: requestId,
      requester_id: requesterId,
      partner_id: partnerId
    })
    .select()
    .single()

  return { data, error }
}

// 신청 거절
export const rejectApplication = async (applicationId) => {
  const { data, error } = await supabase
    .from('applications')
    .update({ status: 'rejected' })
    .eq('id', applicationId)
    .select()
    .single()

  return { data, error }
}

// =============================================
// 매칭 관련
// =============================================

// 내 매칭 목록 조회
export const getMyMatches = async (userId) => {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      request:travel_requests(id, title, destination, start_date, end_date),
      requester:profiles!requester_id(id, name, avatar_url, is_verified),
      partner:profiles!partner_id(id, name, avatar_url, is_verified)
    `)
    .or(`requester_id.eq.${userId},partner_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  // 읽지 않은 메시지 수 추가
  if (data) {
    for (const match of data) {
      const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('match_id', match.id)
        .eq('is_read', false)
        .neq('sender_id', userId)

      match.unread_count = count || 0
    }
  }

  return { data, error }
}

// 특정 매칭 조회
export const getMatch = async (matchId) => {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      request:travel_requests(id, title, destination, start_date, end_date, budget, interests),
      requester:profiles!requester_id(id, name, avatar_url, is_verified, rating, bio),
      partner:profiles!partner_id(id, name, avatar_url, is_verified, rating, bio)
    `)
    .eq('id', matchId)
    .single()

  return { data, error }
}

// 매칭 상태 업데이트
export const updateMatchStatus = async (matchId, status) => {
  const { data, error } = await supabase
    .from('matches')
    .update({ status })
    .eq('id', matchId)
    .select()
    .single()

  return { data, error }
}

// 만남 완료 처리
export const completeMatch = async (matchId) => {
  const { data, error } = await supabase
    .from('matches')
    .update({ status: 'completed' })
    .eq('id', matchId)
    .select()
    .single()

  return { data, error }
}

// 환불 요청
export const requestRefund = async (matchId) => {
  const { data, error } = await supabase
    .from('matches')
    .update({ status: 'refunded' })
    .eq('id', matchId)
    .select()
    .single()

  return { data, error }
}

// =============================================
// 메시지 관련
// =============================================

// 메시지 목록 조회
export const getMessages = async (matchId, limit = 50) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!sender_id(id, name, avatar_url)
    `)
    .eq('match_id', matchId)
    .order('created_at', { ascending: true })
    .limit(limit)

  return { data, error }
}

// 메시지 전송
export const sendMessage = async (matchId, senderId, content, messageType = 'text') => {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      match_id: matchId,
      sender_id: senderId,
      content,
      message_type: messageType
    })
    .select()
    .single()

  return { data, error }
}

// 메시지 읽음 처리
export const markMessagesAsRead = async (matchId, userId) => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('match_id', matchId)
    .neq('sender_id', userId)
    .eq('is_read', false)

  return { error }
}

// 실시간 메시지 구독
export const subscribeToMessages = (matchId, callback) => {
  return supabase
    .channel(`messages:${matchId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `match_id=eq.${matchId}`
      },
      callback
    )
    .subscribe()
}

// =============================================
// 리뷰 관련
// =============================================

// 리뷰 작성
export const createReview = async (matchId, reviewerId, revieweeId, rating, content) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      match_id: matchId,
      reviewer_id: reviewerId,
      reviewee_id: revieweeId,
      rating,
      content
    })
    .select()
    .single()

  return { data, error }
}

// 사용자 리뷰 조회
export const getUserReviews = async (userId, limit = 10) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewer:profiles!reviewer_id(id, name, avatar_url)
    `)
    .eq('reviewee_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}
