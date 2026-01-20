'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // セッション確認（簡易版）
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();

        if (data.success && data.data) {
          setUser(data.data);
        } else {
          router.push('/auth/signin');
        }
      } catch (err) {
        router.push('/auth/signin');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-8"></div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container py-8">
      <h1 className="mb-8">ダッシュボード</h1>

      <div className="rounded-lg border bg-card p-6 shadow-sm mb-6">
        <h2 className="mb-4">ようこそ、{user.name}さん</h2>
        <p className="text-muted-foreground">
          B_Hallへようこそ。バックオフィス業務を効率化しましょう。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4">進行中のチケット</h3>
          <p className="text-sm text-muted-foreground mb-4">
            まだチケットがありません
          </p>
          <Link
            href="/tickets/new"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            新しいチケットを作成
          </Link>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4">確認事項</h3>
          <p className="text-sm text-muted-foreground">
            確認が必要な項目はありません
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/tickets"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          すべてのチケットを表示
        </Link>
      </div>
    </div>
  );
}
