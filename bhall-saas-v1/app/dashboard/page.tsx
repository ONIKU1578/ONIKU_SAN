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
      <div className="min-h-screen bg-muted/20">
        <div className="container py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-80 bg-muted rounded-xl"></div>
            <div className="card-premium h-48"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-premium h-64"></div>
              <div className="card-premium h-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold hover:text-accent transition-smooth">
                B_Hall
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button
                onClick={async () => {
                  await fetch('/api/auth/signout', { method: 'POST' });
                  router.push('/');
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="mb-4">ようこそ、{user.name}さん</h1>
          <p className="text-lg text-muted-foreground">
            バックオフィス業務を効率化し、本来の業務に集中しましょう。
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-accent">0</span>
            </div>
            <h4 className="text-sm font-semibold text-muted-foreground">進行中のチケット</h4>
          </div>

          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-primary">0</span>
            </div>
            <h4 className="text-sm font-semibold text-muted-foreground">完了したチケット</h4>
          </div>

          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-destructive">0</span>
            </div>
            <h4 className="text-sm font-semibold text-muted-foreground">期限間近</h4>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tickets Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-premium p-8">
              <div className="flex items-center justify-between mb-6">
                <h3>進行中のチケット</h3>
                <Link href="/tickets/new" className="btn-primary">
                  新規作成
                </Link>
              </div>

              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-6">まだチケットがありません</p>
                <Link href="/tickets/new" className="btn-secondary">
                  最初のチケットを作成
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-premium p-8">
              <h3 className="mb-6">確認事項</h3>
              <p className="text-sm text-muted-foreground text-center py-8">
                確認が必要な項目はありません
              </p>
            </div>

            <div className="card-premium p-8">
              <h4 className="mb-4">クイックアクション</h4>
              <div className="space-y-3">
                <Link
                  href="/tickets"
                  className="block p-4 rounded-xl border-2 border-border hover:border-accent/30 hover:bg-muted transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-semibold">すべてのチケット</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
