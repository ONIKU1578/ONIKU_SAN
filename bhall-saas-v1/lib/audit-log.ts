import { db } from './db';
import { AuditLog } from './types';

export function logAudit(params: Omit<AuditLog, 'id' | 'createdAt'>): void {
  db.createAuditLog(params);
}

export function logActivity(params: {
  userId: string | null;
  sessionId: string;
  eventType: 'page_view' | 'signup' | 'ticket_create' | 'purchase' | 'download';
  page?: string;
  details?: Record<string, any>;
}): void {
  db.createActivityLog(params);
}
