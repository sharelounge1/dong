import { supabase } from '../lib/supabase'

// 프로필 조회
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

// 프로필 업데이트
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

// 프로필 사진 추가
export const addProfilePhoto = async (userId, photoUrl) => {
  const { data: profile, error: fetchError } = await getProfile(userId)
  if (fetchError) return { error: fetchError }

  const photos = [...(profile.photos || []), photoUrl]

  const { data, error } = await supabase
    .from('profiles')
    .update({ photos })
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

// 프로필 사진 삭제
export const removeProfilePhoto = async (userId, photoUrl) => {
  const { data: profile, error: fetchError } = await getProfile(userId)
  if (fetchError) return { error: fetchError }

  const photos = (profile.photos || []).filter(p => p !== photoUrl)

  const { data, error } = await supabase
    .from('profiles')
    .update({ photos })
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

// 포인트 조회
export const getPoints = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('points')
    .eq('id', userId)
    .single()

  return { data: data?.points || 0, error }
}

// 포인트 충전
export const chargePoints = async (userId, amount, description = '포인트 충전') => {
  // 트랜잭션 기록
  const { error: txError } = await supabase
    .from('point_transactions')
    .insert({
      user_id: userId,
      amount,
      type: 'charge',
      description
    })

  if (txError) return { error: txError }

  // 포인트 업데이트
  const { data: profile } = await getProfile(userId)
  const newPoints = (profile?.points || 0) + amount

  const { data, error } = await supabase
    .from('profiles')
    .update({ points: newPoints })
    .eq('id', userId)
    .select('points')
    .single()

  return { data: data?.points, error }
}

// 포인트 사용
export const usePoints = async (userId, amount, description = '포인트 사용', referenceId = null) => {
  const { data: profile } = await getProfile(userId)

  if ((profile?.points || 0) < amount) {
    return { error: { message: '포인트가 부족합니다.' } }
  }

  // 트랜잭션 기록
  const { error: txError } = await supabase
    .from('point_transactions')
    .insert({
      user_id: userId,
      amount: -amount,
      type: 'use',
      description,
      reference_id: referenceId
    })

  if (txError) return { error: txError }

  // 포인트 업데이트
  const newPoints = profile.points - amount

  const { data, error } = await supabase
    .from('profiles')
    .update({ points: newPoints })
    .eq('id', userId)
    .select('points')
    .single()

  return { data: data?.points, error }
}

// 포인트 거래 내역 조회
export const getPointTransactions = async (userId, limit = 20) => {
  const { data, error } = await supabase
    .from('point_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}
