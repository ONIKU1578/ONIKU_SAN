import { nanoid } from 'nanoid';
import { db } from './db';
import { User } from './types';

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// 簡易認証（v1用）
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const user = db.getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'ユーザーが見つかりません' };
  }

  const storedPassword = db.passwords.get(email);
  if (storedPassword !== password) {
    return { success: false, error: 'パスワードが正しくありません' };
  }

  // セッション作成
  const token = nanoid();
  db.sessions.set(token, {
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日間
  });

  // 監査ログ
  db.createAuditLog({
    userId: user.id,
    companyId: user.companyId,
    action: 'login',
    resource: 'auth',
    resourceId: user.id,
    details: { email },
  });

  return { success: true, user, token };
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  companyName: string
): Promise<AuthResult> {
  // 既存ユーザーチェック
  if (db.getUserByEmail(email)) {
    return { success: false, error: 'このメールアドレスは既に登録されています' };
  }

  // 会社作成
  const company = db.createCompany({ name: companyName });

  // ユーザー作成
  const user = db.createUser({
    email,
    name,
    role: 'client_owner',
    companyId: company.id,
  });

  // パスワード保存
  db.passwords.set(email, password);

  // セッション作成
  const token = nanoid();
  db.sessions.set(token, {
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // 行動ログ
  db.createActivityLog({
    userId: user.id,
    sessionId: token,
    eventType: 'signup',
    details: { email, companyId: company.id },
  });

  // 監査ログ
  db.createAuditLog({
    userId: user.id,
    companyId: company.id,
    action: 'signup',
    resource: 'user',
    resourceId: user.id,
    details: { email },
  });

  return { success: true, user, token };
}

export async function verifySession(token: string): Promise<User | null> {
  const session = db.sessions.get(token);
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    db.sessions.delete(token);
    return null;
  }

  return db.getUserById(session.userId) || null;
}

export async function signOut(token: string): Promise<void> {
  db.sessions.delete(token);
}

// マジックリンク送信（簡易版・ログ記録のみ）
export async function sendMagicLink(email: string): Promise<{ success: boolean; error?: string }> {
  const user = db.getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'ユーザーが見つかりません' };
  }

  // 本番環境ではメール送信
  console.log(`Magic link sent to ${email}`);

  return { success: true };
}

// Google OAuth（簡易版・スタブ）
export async function handleGoogleOAuth(googleToken: string): Promise<AuthResult> {
  // 本番環境ではGoogle APIで検証
  return { success: false, error: 'Google OAuth is not implemented in v1' };
}
