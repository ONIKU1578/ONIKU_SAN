import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container py-12">
      <section className="flex flex-col items-center justify-center gap-8 text-center py-20">
        <h1 className="text-5xl font-bold tracking-tight">B_Hall</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          バックオフィス業務を「設計・運用・改善」する外部管理部サービス
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl">
          属人化を防ぎ、業務が人に依存せず回る構造を作ります。
          <br />
          単なる事務代行・コンサル・紹介業ではありません。
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/auth/signup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            無料で始める
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            ログイン
          </Link>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-center mb-12">B_Hallの特徴</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">業務の可視化</h3>
            <p className="text-sm text-muted-foreground">
              日次・月次・年次の業務を体系化し、誰でも実行できる形に落とし込みます。
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">責任分界の明確化</h3>
            <p className="text-sm text-muted-foreground">
              運営側は実行支援のみ。税務・労務・法務の最終判断は顧客または士業が行います。
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">定型業務の実行支援</h3>
            <p className="text-sm text-muted-foreground">
              期限管理・進捗確認・不備検知を自動化し、業務の漏れを防ぎます。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
