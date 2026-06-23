import { Role, User } from './types';
import { ROLE_GROUPS } from './constants';

// 権限チェック
export function hasRole(user: User | null, allowedRoles: Role[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

export function isClient(user: User | null): boolean {
  if (!user) return false;
  return ROLE_GROUPS.CLIENT.includes(user.role);
}

export function isBacklly(user: User | null): boolean {
  if (!user) return false;
  return ROLE_GROUPS.BACKLLY.includes(user.role);
}

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  return ROLE_GROUPS.ADMIN.includes(user.role);
}

// 判断可能ロール（責任分界の最重要機能）
export function canApproveJudgement(user: User | null): boolean {
  if (!user) return false;
  return ROLE_GROUPS.JUDGEMENT_ALLOWED.includes(user.role);
}

// テナントアクセス権限
export function canAccessCompany(user: User | null, companyId: string): boolean {
  if (!user) return false;

  // 管理者は全テナント閲覧可能
  if (isAdmin(user)) return true;

  // 運営側は権限に応じて（ここでは簡易実装）
  if (isBacklly(user)) return true;

  // 顧客は自テナントのみ
  if (isClient(user)) {
    return user.companyId === companyId;
  }

  // 士業・パートナーは割り当て案件のみ（TODO: 実装）
  return false;
}

// リソースへのアクセス権限
export function canEditTicket(user: User | null, ticket: { companyId: string; createdBy: string }): boolean {
  if (!user) return false;

  // 管理者は全て編集可能
  if (isAdmin(user)) return true;

  // 運営側は編集可能
  if (isBacklly(user)) return true;

  // 顧客は自社チケットのみ
  if (isClient(user) && user.companyId === ticket.companyId) return true;

  return false;
}

// チェックリストアイテムの完了権限（責任分界）
export function canCompleteChecklistItem(user: User | null, item: { requiresJudgement: boolean }): boolean {
  if (!user) return false;

  // 判断不要の項目は運営でも完了可能
  if (!item.requiresJudgement) {
    return isBacklly(user) || isClient(user) || isAdmin(user);
  }

  // 判断要の項目は判断可能ロールのみ
  return canApproveJudgement(user);
}
