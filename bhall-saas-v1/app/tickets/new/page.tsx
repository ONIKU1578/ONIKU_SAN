'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTicketPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority }),
      });

      const result = await res.json();

      if (result.success) {
        router.push('/tickets');
      } else {
        setError(result.error || '作成に失敗しました');
      }
    } catch (err) {
      setError('エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/tickets" className="text-accent hover:underline text-sm font-semibold mb-4 inline-block">
              ← チケット一覧に戻る
            </Link>
            <h1 className="mb-2">新しいチケットを作成</h1>
            <p className="text-muted-foreground">
              依頼内容を入力してチケットを作成しましょう
            </p>
          </div>

          <div className="card-premium p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="title" className="text-sm font-semibold block mb-3">
                  タイトル
                  <span className="text-destructive ml-1">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-premium"
                  placeholder="例: 年末調整資料の準備"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="text-sm font-semibold block mb-3">
                  詳細
                  <span className="text-destructive ml-1">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="input-premium resize-none"
                  placeholder="依頼内容を詳しく記入してください..."
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  できるだけ具体的に記入することで、スムーズな対応が可能になります
                </p>
              </div>

              <div>
                <label htmlFor="priority" className="text-sm font-semibold block mb-3">
                  優先度
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="input-premium"
                >
                  <option value="low">低 - 急ぎではない</option>
                  <option value="medium">中 - 通常の優先度</option>
                  <option value="high">高 - 早めの対応が必要</option>
                  <option value="urgent">緊急 - 至急対応が必要</option>
                </select>
              </div>

              {error && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="submit" disabled={isLoading} className="btn-primary">
                  {isLoading ? '作成中...' : 'チケットを作成'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn-secondary"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
