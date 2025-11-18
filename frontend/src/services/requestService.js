import { supabase } from '../lib/supabase'

// 동행 요청 목록 조회
export const getRequests = async (filters = {}) => {
  let query = supabase
    .from('travel_requests')
    .select(`
      *,
      user:profiles!user_id(id, name, avatar_url, is_verified, rating),
      images:request_images(id, image_url, order_index)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (filters.destination) {
    query = query.ilike('destination', `%${filters.destination}%`)
  }

  if (filters.interests && filters.interests.length > 0) {
    query = query.overlaps('interests', filters.interests)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  return { data, error }
}

// 특정 요청 조회
export const getRequest = async (requestId) => {
  const { data, error } = await supabase
    .from('travel_requests')
    .select(`
      *,
      user:profiles!user_id(id, name, avatar_url, is_verified, rating, bio, languages, interests),
      images:request_images(id, image_url, order_index)
    `)
    .eq('id', requestId)
    .single()

  return { data, error }
}

// 내 요청 목록 조회
export const getMyRequests = async (userId) => {
  const { data, error } = await supabase
    .from('travel_requests')
    .select(`
      *,
      images:request_images(id, image_url, order_index),
      applications:applications(count)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

// 동행 요청 생성
export const createRequest = async (requestData) => {
  const { data, error } = await supabase
    .from('travel_requests')
    .insert(requestData)
    .select()
    .single()

  return { data, error }
}

// 동행 요청 수정
export const updateRequest = async (requestId, updates) => {
  const { data, error } = await supabase
    .from('travel_requests')
    .update(updates)
    .eq('id', requestId)
    .select()
    .single()

  return { data, error }
}

// 동행 요청 삭제
export const deleteRequest = async (requestId) => {
  const { error } = await supabase
    .from('travel_requests')
    .delete()
    .eq('id', requestId)

  return { error }
}

// 요청 이미지 추가
export const addRequestImage = async (requestId, imageUrl, orderIndex = 0) => {
  const { data, error } = await supabase
    .from('request_images')
    .insert({
      request_id: requestId,
      image_url: imageUrl,
      order_index: orderIndex
    })
    .select()
    .single()

  return { data, error }
}

// 요청 이미지 삭제
export const deleteRequestImage = async (imageId) => {
  const { error } = await supabase
    .from('request_images')
    .delete()
    .eq('id', imageId)

  return { error }
}

// 요청에 대한 신청 목록 조회
export const getApplicationsForRequest = async (requestId) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      applicant:profiles!applicant_id(id, name, avatar_url, is_verified, rating, bio, languages, interests)
    `)
    .eq('request_id', requestId)
    .order('created_at', { ascending: false })

  return { data, error }
}
