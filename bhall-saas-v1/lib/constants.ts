import { Role } from './types';

// プロダクト名
export const PRODUCT_NAME = 'B_Hall';
export const COMPANY_NAME = '株式会社Backlly';

// ロール表示名（UI用）
export const ROLE_DISPLAY_NAMES: Record<Role, string> = {
  public: '一般ユーザー',
  client_owner: '顧客（オーナー）',
  client_member: '顧客（メンバー）',
  backlly_operator: 'Backlly Operator（運営）',
  backlly_leader: 'Backlly Leader（運営リーダー）',
  admin: '管理者',
  partner: 'パートナー',
  professional: '士業（プロフェッショナル）',
};

// 権限グループ
export const ROLE_GROUPS = {
  CLIENT: ['client_owner', 'client_member'] as Role[],
  BACKLLY: ['backlly_operator', 'backlly_leader'] as Role[],
  JUDGEMENT_ALLOWED: ['client_owner', 'professional', 'admin'] as Role[], // 判断可能ロール
  ADMIN: ['admin'] as Role[],
};

// チケットステータス表示名
export const TICKET_STATUS_LABELS = {
  draft: '下書き',
  submitted: '提出済み',
  in_progress: '対応中',
  pending_review: '確認待ち',
  completed: '完了',
  archived: 'アーカイブ',
};

// 優先度ラベル
export const PRIORITY_LABELS = {
  low: '低',
  medium: '中',
  high: '高',
  urgent: '緊急',
};

// アクセスレベル表示名
export const ACCESS_LEVEL_LABELS = {
  public: '誰でも閲覧可能',
  member: '会員限定',
  purchaser: '購入者限定',
};
