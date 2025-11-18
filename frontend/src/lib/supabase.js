import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtukezryezntbulrafbj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dWtlenJ5ZXpudGJ1bHJhZmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NjIyNDUsImV4cCI6MjA3OTAzODI0NX0.8_B9XqDfw7VXXO1FmLgsNc3n4kINLhzlW9SOC9LlEoM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Storage helpers
export const uploadAvatar = async (userId, file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file)

  if (error) return { error }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName)

  return { publicUrl, error: null }
}

export const uploadRequestImage = async (requestId, file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${requestId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('request-images')
    .upload(fileName, file)

  if (error) return { error }

  const { data: { publicUrl } } = supabase.storage
    .from('request-images')
    .getPublicUrl(fileName)

  return { publicUrl, error: null }
}

export const uploadProfilePhoto = async (userId, file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('profile-photos')
    .upload(fileName, file)

  if (error) return { error }

  const { data: { publicUrl } } = supabase.storage
    .from('profile-photos')
    .getPublicUrl(fileName)

  return { publicUrl, error: null }
}
