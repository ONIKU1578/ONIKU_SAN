import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-12 text-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                外部管理部サービス
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                B_Hall
              </h1>
              <p className="text-2xl md:text-3xl text-foreground/80 font-light max-w-3xl mx-auto leading-relaxed">
                バックオフィス業務を<br />
                <span className="font-semibold text-foreground">設計・運用・改善</span>する
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              属人化を防ぎ、業務が人に依存せず回る構造を作ります。
              単なる事務代行・コンサル・紹介業ではありません。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/auth/signup" className="btn-primary">
                無料で始める
              </Link>
              <Link href="/auth/signin" className="btn-secondary">
                ログイン
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="mb-6">B_Hallの特徴</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              バックオフィス業務を「仕組み化」し、持続可能な運用を実現します
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="card-premium p-10 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl">業務の可視化</h3>
              <p className="text-muted-foreground leading-relaxed">
                日次・月次・年次の業務を体系化し、誰でも実行できる形に落とし込みます。
              </p>
            </div>

            <div className="card-premium p-10 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl">責任分界の明確化</h3>
              <p className="text-muted-foreground leading-relaxed">
                運営側は実行支援のみ。税務・労務・法務の最終判断は顧客または士業が行います。
              </p>
            </div>

            <div className="card-premium p-10 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl">定型業務の実行支援</h3>
              <p className="text-muted-foreground leading-relaxed">
                期限管理・進捗確認・不備検知を自動化し、業務の漏れを防ぎます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="card-premium p-16 text-center max-w-4xl mx-auto">
            <h2 className="mb-6">今すぐ始めませんか？</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              B_Hallで、バックオフィス業務の属人化から解放され、<br />
              本来注力すべき業務に集中できます。
            </p>
            <Link href="/auth/signup" className="btn-primary">
              無料で始める
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
