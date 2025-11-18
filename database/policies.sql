-- =============================================
-- 또리(TORI) Row Level Security (RLS) 정책
-- schema.sql 실행 후 이 파일을 실행하세요
-- =============================================

-- =============================================
-- RLS 활성화
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROFILES 정책
-- =============================================
-- 모든 프로필 조회 가능
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 본인 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =============================================
-- TRAVEL_REQUESTS 정책
-- =============================================
-- 활성 요청은 모두 조회 가능
CREATE POLICY "Active requests are viewable by everyone"
  ON travel_requests FOR SELECT
  USING (status = 'active' OR user_id = auth.uid());

-- 인증된 사용자만 요청 생성 가능
CREATE POLICY "Authenticated users can create requests"
  ON travel_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 본인 요청만 수정 가능
CREATE POLICY "Users can update own requests"
  ON travel_requests FOR UPDATE
  USING (auth.uid() = user_id);

-- 본인 요청만 삭제 가능
CREATE POLICY "Users can delete own requests"
  ON travel_requests FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- REQUEST_IMAGES 정책
-- =============================================
-- 요청 이미지 조회 가능
CREATE POLICY "Request images are viewable by everyone"
  ON request_images FOR SELECT
  USING (true);

-- 요청 소유자만 이미지 추가 가능
CREATE POLICY "Request owners can add images"
  ON request_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM travel_requests
      WHERE id = request_id AND user_id = auth.uid()
    )
  );

-- 요청 소유자만 이미지 삭제 가능
CREATE POLICY "Request owners can delete images"
  ON request_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM travel_requests
      WHERE id = request_id AND user_id = auth.uid()
    )
  );

-- =============================================
-- APPLICATIONS 정책
-- =============================================
-- 요청자와 신청자만 신청 조회 가능
CREATE POLICY "Request owners and applicants can view applications"
  ON applications FOR SELECT
  USING (
    applicant_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM travel_requests
      WHERE id = request_id AND user_id = auth.uid()
    )
  );

-- 인증된 사용자만 신청 가능 (본인 요청 제외)
CREATE POLICY "Authenticated users can apply to requests"
  ON applications FOR INSERT
  WITH CHECK (
    auth.uid() = applicant_id AND
    NOT EXISTS (
      SELECT 1 FROM travel_requests
      WHERE id = request_id AND user_id = auth.uid()
    )
  );

-- 요청자만 신청 상태 업데이트 가능
CREATE POLICY "Request owners can update application status"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM travel_requests
      WHERE id = request_id AND user_id = auth.uid()
    )
  );

-- =============================================
-- MATCHES 정책
-- =============================================
-- 매칭 당사자만 조회 가능
CREATE POLICY "Match participants can view matches"
  ON matches FOR SELECT
  USING (requester_id = auth.uid() OR partner_id = auth.uid());

-- 시스템에서만 매칭 생성 (서비스 역할)
CREATE POLICY "Service role can create matches"
  ON matches FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- 매칭 당사자만 상태 업데이트 가능
CREATE POLICY "Match participants can update matches"
  ON matches FOR UPDATE
  USING (requester_id = auth.uid() OR partner_id = auth.uid());

-- =============================================
-- MESSAGES 정책
-- =============================================
-- 매칭 당사자만 메시지 조회 가능
CREATE POLICY "Match participants can view messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id AND (requester_id = auth.uid() OR partner_id = auth.uid())
    )
  );

-- 매칭 당사자만 메시지 전송 가능
CREATE POLICY "Match participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id AND (requester_id = auth.uid() OR partner_id = auth.uid())
    )
  );

-- 수신자만 읽음 상태 업데이트 가능
CREATE POLICY "Recipients can mark messages as read"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id AND (requester_id = auth.uid() OR partner_id = auth.uid())
    ) AND sender_id != auth.uid()
  );

-- =============================================
-- REVIEWS 정책
-- =============================================
-- 모든 리뷰 조회 가능
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- 매칭 완료 후 당사자만 리뷰 작성 가능
CREATE POLICY "Match participants can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id
        AND status = 'completed'
        AND (requester_id = auth.uid() OR partner_id = auth.uid())
    )
  );

-- =============================================
-- NOTIFICATIONS 정책
-- =============================================
-- 본인 알림만 조회 가능
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- 시스템에서 알림 생성 (서비스 역할)
CREATE POLICY "Service role can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 본인 알림만 읽음 처리 가능
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- POINT_TRANSACTIONS 정책
-- =============================================
-- 본인 거래 내역만 조회 가능
CREATE POLICY "Users can view own transactions"
  ON point_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- 본인 거래만 생성 가능
CREATE POLICY "Users can create own transactions"
  ON point_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- REPORTS 정책
-- =============================================
-- 본인이 신고한 내역만 조회 가능
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  USING (auth.uid() = reporter_id);

-- 인증된 사용자만 신고 가능
CREATE POLICY "Authenticated users can create reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id AND auth.uid() != reported_id);

-- =============================================
-- STORAGE 버킷 정책
-- =============================================

-- AVATARS 버킷 정책
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- REQUEST-IMAGES 버킷 정책
CREATE POLICY "Request images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'request-images');

CREATE POLICY "Users can upload request images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'request-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete own request images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'request-images' AND
    auth.role() = 'authenticated'
  );

-- PROFILE-PHOTOS 버킷 정책
CREATE POLICY "Profile photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can upload their own photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
