// ロール定義（固定・変更禁止）
export type Role =
  | 'public'
  | 'client_owner'
  | 'client_member'
  | 'backlly_operator'
  | 'backlly_leader'
  | 'admin'
  | 'partner'
  | 'professional';

// ユーザー
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  companyId: string | null; // テナント
  createdAt: Date;
  updatedAt: Date;
}

// 会社（テナント）
export interface Company {
  id: string;
  name: string;
  industry?: string;
  employeeCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// チケットステータス
export type TicketStatus =
  | 'draft'
  | 'submitted'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'archived';

// チケット（依頼）
export interface Ticket {
  id: string;
  companyId: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string | null; // User ID
  createdBy: string; // User ID
  dueDate: Date | null;
  attachments: string[]; // URLs
  createdAt: Date;
  updatedAt: Date;
}

// スレッド（コメント）
export interface Thread {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean; // 内部メモかどうか
  createdAt: Date;
}

// チェックリスト
export interface Checklist {
  id: string;
  ticketId: string;
  title: string;
  frequency: 'daily' | 'monthly' | 'yearly' | 'once';
  createdAt: Date;
}

// チェックリストアイテム（最重要：責任分界）
export interface ChecklistItem {
  id: string;
  checklistId: string;
  title: string;
  description?: string;
  requiresJudgement: boolean; // 判断要否フラグ（運営側は完了不可）
  completed: boolean;
  completedBy: string | null; // User ID
  completedAt: Date | null;
  order: number;
}

// アクセスレベル
export type AccessLevel = 'public' | 'member' | 'purchaser';

// コラム
export interface Column {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  accessLevel: AccessLevel;
  author: string;
  publishedAt: Date;
  createdAt: Date;
}

// テンプレート
export interface Template {
  id: string;
  title: string;
  description: string;
  content: string; // テンプレートファイルURL
  category: string;
  accessLevel: AccessLevel;
  price: number; // 0 = 無料
  version: string;
  downloadCount: number;
  createdAt: Date;
}

// 購入
export interface Purchase {
  id: string;
  userId: string;
  companyId: string;
  itemType: 'template' | 'column';
  itemId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  stripePaymentIntentId?: string;
  receiptUrl?: string;
  createdAt: Date;
}

// 通知
export interface Notification {
  id: string;
  userId: string;
  type: 'ticket_assigned' | 'ticket_updated' | 'thread_reply' | 'approval_required';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

// 監査ログ
export interface AuditLog {
  id: string;
  userId: string;
  companyId: string | null;
  action: string; // 'login', 'role_change', 'status_change', 'purchase', etc.
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// 行動ログ（KPI計測）
export interface ActivityLog {
  id: string;
  userId: string | null; // 未ログインもあり得る
  sessionId: string;
  eventType: 'page_view' | 'signup' | 'ticket_create' | 'purchase' | 'download';
  page?: string;
  details: Record<string, any>;
  createdAt: Date;
}

// CRMタイムライン
export interface Timeline {
  id: string;
  companyId: string;
  userId: string;
  type: 'note' | 'email' | 'call' | 'meeting';
  title: string;
  content: string;
  createdAt: Date;
}

// APIレスポンス型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// セッション
export interface Session {
  user: User;
  company: Company | null;
  expiresAt: Date;
}
