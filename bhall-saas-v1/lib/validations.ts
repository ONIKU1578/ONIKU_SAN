import { z } from 'zod';

// 認証
export const signInSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
});

export const signUpSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  name: z.string().min(1, '名前を入力してください'),
  companyName: z.string().min(1, '会社名を入力してください'),
});

export const magicLinkSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});

// チケット
export const ticketSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください').max(200, 'タイトルは200文字以内で入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueDate: z.string().optional(),
});

// スレッド
export const threadSchema = z.object({
  content: z.string().min(1, 'メッセージを入力してください'),
  isInternal: z.boolean().optional(),
});

// チェックリスト
export const checklistSchema = z.object({
  title: z.string().min(1, 'チェックリスト名を入力してください'),
  frequency: z.enum(['daily', 'monthly', 'yearly', 'once']),
});

export const checklistItemSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().optional(),
  requiresJudgement: z.boolean(),
});

// CRM
export const timelineSchema = z.object({
  type: z.enum(['note', 'email', 'call', 'meeting']),
  title: z.string().min(1, 'タイトルを入力してください'),
  content: z.string().min(1, '内容を入力してください'),
});

// コラム
export const columnSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  content: z.string().min(1, '本文を入力してください'),
  excerpt: z.string().max(200, '要約は200文字以内で入力してください'),
  accessLevel: z.enum(['public', 'member', 'purchaser']),
});

// テンプレート
export const templateSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '説明を入力してください'),
  category: z.string().min(1, 'カテゴリを選択してください'),
  accessLevel: z.enum(['public', 'member', 'purchaser']),
  price: z.number().min(0, '価格は0以上で入力してください'),
  version: z.string().min(1, 'バージョンを入力してください'),
});
