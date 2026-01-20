'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, companyName }),
      });

      const result = await res.json();

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || '登録に失敗しました');
      }
    } catch (err) {
      setError('エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <h2 className="text-3xl font-bold">B_Hall</h2>
          </Link>
          <h1 className="text-3xl font-bold mb-3">アカウント作成</h1>
          <p className="text-muted-foreground">無料でB_Hallを始めましょう</p>
        </div>

        <div className="card-premium p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-sm font-semibold block mb-3">
                  お名前
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-premium"
                  placeholder="山田 太郎"
                  required
                />
              </div>

              <div>
                <label htmlFor="companyName" className="text-sm font-semibold block mb-3">
                  会社名
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="input-premium"
                  placeholder="株式会社〇〇"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold block mb-3">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-semibold block mb-3">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium"
                placeholder="8文字以上"
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground mt-2">8文字以上で設定してください</p>
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full btn-primary">
              {isLoading ? '登録中...' : '無料で始める'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              すでにアカウントをお持ちの方は
              <Link
                href="/auth/signin"
                className="text-accent font-semibold hover:underline ml-1 transition-smooth"
              >
                ログイン
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            登録することで、利用規約とプライバシーポリシーに同意したものとみなされます
          </p>
        </div>
      </div>
    </div>
  );
}
