import { nanoid } from 'nanoid';
import {
  User,
  Company,
  Ticket,
  Thread,
  Checklist,
  ChecklistItem,
  Column,
  Template,
  Purchase,
  Notification,
  AuditLog,
  ActivityLog,
  Timeline,
} from './types';

// メモリストレージ（v1用、本番ではPostgreSQL等に差し替え）
class MemoryDB {
  users: Map<string, User> = new Map();
  companies: Map<string, Company> = new Map();
  tickets: Map<string, Ticket> = new Map();
  threads: Map<string, Thread> = new Map();
  checklists: Map<string, Checklist> = new Map();
  checklistItems: Map<string, ChecklistItem> = new Map();
  columns: Map<string, Column> = new Map();
  templates: Map<string, Template> = new Map();
  purchases: Map<string, Purchase> = new Map();
  notifications: Map<string, Notification> = new Map();
  auditLogs: Map<string, AuditLog> = new Map();
  activityLogs: Map<string, ActivityLog> = new Map();
  timelines: Map<string, Timeline> = new Map();
  sessions: Map<string, { userId: string; expiresAt: Date }> = new Map();

  // メール→パスワードハッシュ（簡易版）
  passwords: Map<string, string> = new Map();

  constructor() {
    this.seedData();
  }

  // ダミーデータ生成
  private seedData() {
    // 会社
    const company1: Company = {
      id: 'company-1',
      name: 'サンプル株式会社',
      industry: 'IT',
      employeeCount: 50,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };
    this.companies.set(company1.id, company1);

    // ユーザー
    const user1: User = {
      id: 'user-1',
      email: 'owner@example.com',
      name: '山田太郎',
      role: 'client_owner',
      companyId: 'company-1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };
    this.users.set(user1.id, user1);
    this.passwords.set(user1.email, 'password123');

    const user2: User = {
      id: 'user-2',
      email: 'operator@backlly.com',
      name: 'Backlly運営',
      role: 'backlly_operator',
      companyId: null,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };
    this.users.set(user2.id, user2);
    this.passwords.set(user2.email, 'password123');

    const user3: User = {
      id: 'user-3',
      email: 'professional@example.com',
      name: '税理士　花子',
      role: 'professional',
      companyId: null,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };
    this.users.set(user3.id, user3);
    this.passwords.set(user3.email, 'password123');

    // チケット
    const ticket1: Ticket = {
      id: 'ticket-1',
      companyId: 'company-1',
      title: '月次決算書類の確認依頼',
      description: '2024年1月分の決算書類を確認してください。',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'user-2',
      createdBy: 'user-1',
      dueDate: new Date('2024-02-15'),
      attachments: [],
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    };
    this.tickets.set(ticket1.id, ticket1);

    // チェックリスト
    const checklist1: Checklist = {
      id: 'checklist-1',
      ticketId: 'ticket-1',
      title: '月次決算チェックリスト',
      frequency: 'monthly',
      createdAt: new Date('2024-02-01'),
    };
    this.checklists.set(checklist1.id, checklist1);

    // チェックリストアイテム（責任分界テスト用）
    const item1: ChecklistItem = {
      id: 'item-1',
      checklistId: 'checklist-1',
      title: '仕訳データの入力',
      description: '会計ソフトへの仕訳入力を完了する',
      requiresJudgement: false,
      completed: true,
      completedBy: 'user-2',
      completedAt: new Date('2024-02-05'),
      order: 1,
    };
    this.checklistItems.set(item1.id, item1);

    const item2: ChecklistItem = {
      id: 'item-2',
      checklistId: 'checklist-1',
      title: '決算書の最終確認',
      description: '税理士による数値の最終確認',
      requiresJudgement: true,
      completed: false,
      completedBy: null,
      completedAt: null,
      order: 2,
    };
    this.checklistItems.set(item2.id, item2);

    // コラム
    const column1: Column = {
      id: 'column-1',
      title: 'バックオフィス業務の効率化方法',
      content: 'バックオフィス業務を効率化するための具体的な方法を解説します...',
      excerpt: '業務効率化の基本から実践まで',
      accessLevel: 'public',
      author: 'B_Hall編集部',
      publishedAt: new Date('2024-01-15'),
      createdAt: new Date('2024-01-15'),
    };
    this.columns.set(column1.id, column1);

    // テンプレート
    const template1: Template = {
      id: 'template-1',
      title: '月次決算チェックリスト テンプレート',
      description: '月次決算に必要な項目を網羅したチェックリスト',
      content: '/templates/monthly-checklist.xlsx',
      category: '決算・会計',
      accessLevel: 'member',
      price: 0,
      version: '1.0.0',
      downloadCount: 125,
      createdAt: new Date('2024-01-10'),
    };
    this.templates.set(template1.id, template1);
  }

  generateId(): string {
    return nanoid();
  }

  // User
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.email === email);
  }

  // Company
  createCompany(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Company {
    const newCompany: Company = {
      ...company,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.companies.set(newCompany.id, newCompany);
    return newCompany;
  }

  getCompanyById(id: string): Company | undefined {
    return this.companies.get(id);
  }

  // Ticket
  createTicket(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket {
    const newTicket: Ticket = {
      ...ticket,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tickets.set(newTicket.id, newTicket);
    return newTicket;
  }

  getTicketById(id: string): Ticket | undefined {
    return this.tickets.get(id);
  }

  getTicketsByCompanyId(companyId: string): Ticket[] {
    return Array.from(this.tickets.values()).filter((t) => t.companyId === companyId);
  }

  getAllTickets(): Ticket[] {
    return Array.from(this.tickets.values());
  }

  updateTicket(id: string, updates: Partial<Ticket>): Ticket | undefined {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    const updated = { ...ticket, ...updates, updatedAt: new Date() };
    this.tickets.set(id, updated);
    return updated;
  }

  // Thread
  createThread(thread: Omit<Thread, 'id' | 'createdAt'>): Thread {
    const newThread: Thread = {
      ...thread,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.threads.set(newThread.id, newThread);
    return newThread;
  }

  getThreadsByTicketId(ticketId: string): Thread[] {
    return Array.from(this.threads.values())
      .filter((t) => t.ticketId === ticketId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Checklist
  createChecklist(checklist: Omit<Checklist, 'id' | 'createdAt'>): Checklist {
    const newChecklist: Checklist = {
      ...checklist,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.checklists.set(newChecklist.id, newChecklist);
    return newChecklist;
  }

  getChecklistsByTicketId(ticketId: string): Checklist[] {
    return Array.from(this.checklists.values()).filter((c) => c.ticketId === ticketId);
  }

  // ChecklistItem
  createChecklistItem(item: Omit<ChecklistItem, 'id'>): ChecklistItem {
    const newItem: ChecklistItem = {
      ...item,
      id: this.generateId(),
    };
    this.checklistItems.set(newItem.id, newItem);
    return newItem;
  }

  getChecklistItemsByChecklistId(checklistId: string): ChecklistItem[] {
    return Array.from(this.checklistItems.values())
      .filter((item) => item.checklistId === checklistId)
      .sort((a, b) => a.order - b.order);
  }

  updateChecklistItem(id: string, updates: Partial<ChecklistItem>): ChecklistItem | undefined {
    const item = this.checklistItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, ...updates };
    this.checklistItems.set(id, updated);
    return updated;
  }

  getJudgementRequiredItems(companyId: string): ChecklistItem[] {
    const tickets = this.getTicketsByCompanyId(companyId);
    const items: ChecklistItem[] = [];
    for (const ticket of tickets) {
      const checklists = this.getChecklistsByTicketId(ticket.id);
      for (const checklist of checklists) {
        const checklistItems = this.getChecklistItemsByChecklistId(checklist.id);
        items.push(...checklistItems.filter((item) => item.requiresJudgement && !item.completed));
      }
    }
    return items;
  }

  // Column
  getAllColumns(): Column[] {
    return Array.from(this.columns.values());
  }

  getColumnById(id: string): Column | undefined {
    return this.columns.get(id);
  }

  // Template
  getAllTemplates(): Template[] {
    return Array.from(this.templates.values());
  }

  getTemplateById(id: string): Template | undefined {
    return this.templates.get(id);
  }

  // Purchase
  createPurchase(purchase: Omit<Purchase, 'id' | 'createdAt'>): Purchase {
    const newPurchase: Purchase = {
      ...purchase,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.purchases.set(newPurchase.id, newPurchase);
    return newPurchase;
  }

  getPurchasesByUserId(userId: string): Purchase[] {
    return Array.from(this.purchases.values()).filter((p) => p.userId === userId);
  }

  hasPurchased(userId: string, itemType: string, itemId: string): boolean {
    return Array.from(this.purchases.values()).some(
      (p) => p.userId === userId && p.itemType === itemType && p.itemId === itemId && p.status === 'completed'
    );
  }

  // Notification
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.notifications.set(newNotification.id, newNotification);
    return newNotification;
  }

  getNotificationsByUserId(userId: string): Notification[] {
    return Array.from(this.notifications.values())
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  markNotificationAsRead(id: string): void {
    const notification = this.notifications.get(id);
    if (notification) {
      this.notifications.set(id, { ...notification, read: true });
    }
  }

  // AuditLog
  createAuditLog(log: Omit<AuditLog, 'id' | 'createdAt'>): AuditLog {
    const newLog: AuditLog = {
      ...log,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.auditLogs.set(newLog.id, newLog);
    return newLog;
  }

  getAuditLogs(companyId?: string): AuditLog[] {
    const logs = Array.from(this.auditLogs.values());
    if (companyId) {
      return logs.filter((log) => log.companyId === companyId);
    }
    return logs;
  }

  // ActivityLog
  createActivityLog(log: Omit<ActivityLog, 'id' | 'createdAt'>): ActivityLog {
    const newLog: ActivityLog = {
      ...log,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.activityLogs.set(newLog.id, newLog);
    return newLog;
  }

  // Timeline
  createTimeline(timeline: Omit<Timeline, 'id' | 'createdAt'>): Timeline {
    const newTimeline: Timeline = {
      ...timeline,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.timelines.set(newTimeline.id, newTimeline);
    return newTimeline;
  }

  getTimelinesByCompanyId(companyId: string): Timeline[] {
    return Array.from(this.timelines.values())
      .filter((t) => t.companyId === companyId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// シングルトン
export const db = new MemoryDB();
