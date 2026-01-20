'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="container py-8 max-w-2xl">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <h1 className="mb-6">新しいチケットを作成</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium block mb-2">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium block mb-2">
              詳細
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="text-sm font-medium block mb-2">
              優先度
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="urgent">緊急</option>
            </select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? '作成中...' : '作成する'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
